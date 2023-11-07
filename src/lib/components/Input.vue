<template>
  <Field
      v-bind='{...props, $attrs}'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, updateModelValue }'
  >
    <slot v-bind='{ uid, value, hasValue, hasError, errors, onInput, updateModelValue }'>
      <input
          v-bind='$attrs'
          :type='type'
          :id='uid'
          class='vnf-input'
          :value='value'
          :placeholder='placeholder'
          ref='inputRef'
          @input='onInput($event, updateModelValue)'
      >
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
  type?: string;
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

const onInput = (event: any, updateCb: (v: any) => void) => {
  const value = event.target.value
  emit('update:modelValue', value);

  if (updateCb) {
    updateCb(value)
  }
}

defineExpose({
  inputRef,
});
</script>
