<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      list
      v-slot='{ uid, value, hasValue, hasError, errors, updateModelValue }'
  >
    <slot v-bind='{ uid,
      value,
      inputValue,
      hasValue,
      hasError,
      errors,
      tokens,
      selectedTokenIdx,
      selectToken,
      removeToken,
      tryAddToken,
      selectPrevious,
      onInput,
      onLeft,
      onRight,
      onInputBlur,
      onDelete,
      onFocus,
      updateModelValue
    }'>
      <div
        class='vnf-token-input input-box-wrapper'
      >
        <span
            v-for='(token, idx) in tokens'
            :key='token'
            class='vnf-token'
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
          class='vnf-input'
          placeholder=' '
          @keydown.tab.enter.exact.stop='tryAddToken'
          @keydown.shift.tab.exact.stop.prevent='selectPrevious'
          @keydown.delete='onDelete'
          @keydown.left.stop.capture='onLeft'
          @keydown.right.stop.capture='onRight'
          @focus='onFocus'
          @blur='onInputBlur'
        >
      </div>
    </slot>
  </Field>
</template>

<script lang='ts' setup>
import { CloseCircle } from 'mdue';
import { computed, nextTick, ref, watch } from 'vue';
import Field from './Field.vue';

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
  errors: () => [],
  separator: () => [],
})

const onChange = (newVal: string[]) => {
  emit('update:modelValue', newVal)
  if (fieldRef.value?.updateModelValue) {
    fieldRef.value.updateModelValue(newVal);
  }
}

const inputValue = ref('')
const valueInput = ref(null)
const fieldRef = ref(null);
const selectedTokenIdx = ref(-1)

const value = computed((): string[] => <string[]>(fieldRef.value?.value || []))

const tokens = computed(() => value.value)

const tryAddToken = (e?: KeyboardEvent) => {
  if (e && (selectedTokenIdx.value != -1 || inputValue.value.length)) {
    e.preventDefault()
  }

  if (selectedTokenIdx.value != -1) {
    if (e?.key == 'Enter') {
      editSelectedToken()
      return
    }

    selectNext()
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

const selectPrevious = () => {
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

const selectNext = () => {
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
    selectPrevious()
    e.preventDefault()
    return
  }

  const selectionStart = (<HTMLInputElement>e.target).selectionStart
  const selectionEnd = (<HTMLInputElement>e.target).selectionEnd

  if (selectionStart != 0 || selectionEnd != 0) {
    return
  }
  e.preventDefault()

  selectPrevious()
}

const onRight = (e: KeyboardEvent) => {
  if (selectedTokenIdx.value != -1) {
    selectNext()
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

const onInput = (input) => {
  inputValue.value = input?.target.value || ''
}

const onFocus = () => {
  selectedTokenIdx.value = -1
}

defineExpose({
  tokens,
  onChange,
})
</script>
