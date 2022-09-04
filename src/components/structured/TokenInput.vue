<template>
  <TokenInput
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, inputValue, value, hasValue, hasError, errors, tokens, selectedTokenIdx, selectToken, removeToken, tryAddToken, selectPrevious, onInput, onLeft, onRight, onInputBlur, onDelete, onFocus }'
  >
    <div class='vnf-token-input' :class='{"has-error": hasError}'>
      <div class='vnf-input-box'>
        <div
          class='input-box-wrapper'
        >
          <div class='vnf-label-box' :class='{ minimize: minimizeLabel }'>
            <label :for='uid' class='vnf-label'>{{ label }}</label>
          </div>

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
            :value='inputValue'
            @input='onInput'
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

        <div>
          <slot name='inputRight' />
        </div>

        <div class='pp-input-underline' />
      </div>
      <slot name='inputErrors' v-if='hasError' :errors='errors'>
        <div class='vnf-input-errors' >
          {{ errors.join(', ') }}
        </div>
      </slot>
    </div>
  </TokenInput>
</template>

<script lang='ts' setup>
import { CloseCircle } from 'mdue';
import { computed, inject, ref, watch } from 'vue';
import TokenInput from '../TokenInput.vue';

const formId = inject('formId', '')
const fieldRef = ref(null)

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

const inputValue = ref('')
const valueInput = ref(null)

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

      fieldRef.value?.onChange([...fieldRef.value?.value, ...newTokens])
      inputValue.value = ''
      break;
    }
  }
})

const minimizeLabel = computed(() => fieldRef.value?.tokens.length > 0)
</script>
