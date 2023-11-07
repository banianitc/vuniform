<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, updateModelValue }'
  >
    <slot v-bind='{ uid, value, hasValue, hasError, errors, onInput: onInputCb(updateModelValue) }'>
      <textarea
          v-bind='$attrs'
          :id='uid'
          class='vnf-input'
          :value='value'
          :placeholder='placeholder'
          ref='inputRef'
          @input='onInputCb(updateModelValue)($event)'
      />
    </slot>
  </Field>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import Field from './Field.vue';

const fieldRef = ref(null);
const inputRef = ref(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
interface Props {
  inputId: string;
  placeholder?: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
  hideEmptyInput?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errors: () => [],
  placeholder: ' ',
});

const onInputCb = (updateModelValue?: (v: any) => void) => (event: any, updateCb?: (v: any) => void) => {
  const value = event.target.value
  emit('update:modelValue', value);
  updateModelValue?.(value)
  updateCb?.(value);
}

defineExpose({
  inputRef,
});
</script>
