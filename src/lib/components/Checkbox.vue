<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors }'
  >
    <slot v-bind='{checked, toggle, hasError, errors}'>
      <input type='checkbox' @change='toggle' :checked='checked'>
    </slot>
  </Field>
</template>

<script setup lang='ts'>
import Field from './Field.vue';
import { computed, ref } from 'vue';

const fieldRef = ref(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()
interface Props {
  label: string;
  inputId: string;
  type?: string;
  errors?: string[];
  forceError?: boolean;
  trueValue?: unknown;
  falseValue?: unknown;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  trueValue: () => '1',
  falseValue: () => '0',
})

const value = computed(() => fieldRef.value?.value);
const checked = computed(() => value.value === props.trueValue)

const toggle = () => {
  const value =  checked.value ? props.falseValue : props.trueValue;
  emit('update:modelValue', value)
  if (fieldRef.value?.updateModelValue) {
    fieldRef.value.updateModelValue(value);
  }
}
</script>
