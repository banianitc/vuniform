<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors }'
  >
    <slot v-bind='{ uid, value, hasValue, hasError, errors, onInput }'>
      <textarea
          v-bind='$attrs'
          :id='uid'
          class='vnf-input'
          :value='value'
          :placeholder='placeholder'
          ref='inputRef'
          @input='onInput'
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

const onInput = (event: any) => {
  const value = event.target.value
  emit('update:modelValue', value);
  if (fieldRef.value?.updateModelValue) {
    fieldRef.value.updateModelValue(value);
  }
}

defineExpose({
  inputRef,
});
</script>
