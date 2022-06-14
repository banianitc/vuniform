<template>
  <div class='pp-input-wrapper' :class='{"has-error": hasError}'>
    <div class='pp-input-box'>
      <div
        class='input-box-wrapper pp-token-input'
      >
        <div class='pp-label-box' :class='{ minimize: minimizeLabel }'>
          <label :for='uid' class='pp-label'>{{ label }}</label>
        </div>

        <span
            v-for='(token, idx) in tokens'
            :key='token'
            class='pp-token'
            :class='{selected: idx === selectedTokenIdx }'
            @click.prevent.stop='selectToken(idx)'
        >
          <span>{{ token }}</span>
          <button
              type='button'
              class='close-btn'
              @click.stop='removeToken(idx)'
          >
            <CloseCircle />
          </button>
        </span>

        <input
          ref='valueInput'
          v-model='inputValue'
          v-bind='$attrs'
          type='text'
          :id='uid'
          class='pp-input'
          placeholder=' '
          @keydown.tab.enter.exact.stop='tryAddToken'
          @keydown.shift.tab.exact.stop.prevent='selectLeft'
          @keydown.delete='onDelete'
          @keydown.left.stop.capture='onLeft'
          @keydown.right.stop.capture='onRight'
          @focus='() => selectedTokenIdx = -1'
          @blur='onInputBlur'
        >
      </div>

      <div>
        <slot name='inputRight' />
      </div>

      <div class='pp-input-underline' />
    </div>
    <div class='errors' v-if='hasError'>
      {{ allErrors.join(', ') }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { CloseCircle } from 'mdue';
import { computed, getCurrentInstance, inject, nextTick, ref, watch } from 'vue';
import { useFormsStore } from './stores/forms';

const formId = inject('formId', '')

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()
interface Props {
  label: string;
  inputId: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
  multiple?: boolean;
  separator?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errors: [],
  separator: [],
})

const onChange = (newVal: string[]) => {
  formsStore.STAGE_FIELD_CHANGE({value: newVal, query: {formId, field: props.inputId}})
  emit('update:modelValue', newVal)
}

const inputValue = ref('')
const valueInput = ref(null)
const selectedTokenIdx = ref(-1)

const formsStore = useFormsStore()

if (formId) {
  formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {}})
}

const value = computed((): string[] => <string[]>(formsStore.fieldGetValue(formId, props.inputId) || []))

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))

const hasError = computed(() => props.forceError || allErrors.value.length)

const uid = `pp-input-id-${getCurrentInstance()?.uid}`

const tokens = computed(() => value.value)
const minimizeLabel = computed(() => tokens.value.length > 0)

const tryAddToken = (e?: KeyboardEvent) => {
  if (e && (selectedTokenIdx.value != -1 || inputValue.value.length)) {
    e.preventDefault()
  }

  if (selectedTokenIdx.value != -1) {
    if (e?.key == 'Enter') {
      editSelectedToken()
      return
    }

    selectRight()
    return;
  }

  const v = inputValue.value.trim()
  if (!v || v.length == 0) {
    return
  }
  addToken(v)
}

const addToken = (v: string) => {
  onChange([...value.value, v])
  inputValue.value = ''
}

watch(inputValue, (newVal: string) => {
  if (!props.separator || props.separator.length == 0) {
    return;
  }

  for (let separator of props.separator) {
    if (newVal.includes(separator)) {
      const newTokens = newVal
          .trim()
          .split(separator)
          .map(v => v.trim())
          .filter(v => v)

      onChange([...value.value, ...newTokens])
      inputValue.value = ''
      break;
    }
  }
})

const onInputBlur = () => {
  tryAddToken()
  selectedTokenIdx.value = -1
}

const onDelete = (e: KeyboardEvent) => {
  // 8 == backspace
  if (e.keyCode != 8) {
    return
  }

  if (!inputValue.value) {
    removeToken(tokens.value.length - 1)
  }
}

const removeToken = (idx: number) => {
  if (idx < 0 || idx > tokens.value.length - 1) {
    return
  }

  const newTokens = [...tokens.value]
  newTokens.splice(idx, 1)
  onChange(newTokens)
}

const selectLeft = () => {
  if (tokens.value.length == 0) {
    return
  }

  // If nothing is selected, or the first token is selected, loop and select the last one
  if (selectedTokenIdx.value == -1 || selectedTokenIdx.value == 0) {
    selectedTokenIdx.value = tokens.value.length - 1
    return
  }

  selectedTokenIdx.value--
}

const selectRight = () => {
  if (selectedTokenIdx.value == -1) {
    return
  }

  if (selectedTokenIdx.value == tokens.value.length - 1) {
    selectedTokenIdx.value = -1
    return
  }

  selectedTokenIdx.value++
}

const onLeft = (e: KeyboardEvent) => {
  if (selectedTokenIdx.value != -1) {
    selectLeft()
    e.preventDefault()
    return
  }

  const selectionStart = (<HTMLInputElement>e.target).selectionStart
  const selectionEnd = (<HTMLInputElement>e.target).selectionEnd

  if (selectionStart != 0 || selectionEnd != 0) {
    return
  }
  e.preventDefault()

  selectLeft()
}

const onRight = (e: KeyboardEvent) => {
  if (selectedTokenIdx.value != -1) {
    selectRight()
    e.preventDefault()
    return
  }
}

const selectToken = (idx: number) => {
  if (selectedTokenIdx.value == idx) {
    editSelectedToken()
    return
  }
  selectedTokenIdx.value = idx
}

const editSelectedToken = async () => {
  const v = tokens.value[selectedTokenIdx.value]
  removeToken(selectedTokenIdx.value)
  selectedTokenIdx.value = -1
  tryAddToken()
  inputValue.value = v
  await nextTick()
  valueInput.value!.select()
}
</script>
