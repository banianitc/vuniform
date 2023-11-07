<template>
  <Field
      v-bind='{ inputId, overrideValue, errors, forceError }'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, updateModelValue }'
  >
    <slot v-bind='{checked, toggle: toggleCb(updateModelValue), hasError, errors}'>
      <input type='checkbox' @change='toggleCb(updateModelValue)()' :checked='checked'>
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
  overrideValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  trueValue: () => '1',
  falseValue: () => '0',
})

const value = computed(() => fieldRef.value?.value);
const checked = computed(() => value.value === props.trueValue)

const toggleCb = (updateModelValue: (v: any) => void) => (updateCb?: (v: any) => void) => {
  const value =  checked.value ? props.falseValue : props.trueValue;
  emit('update:modelValue', value)
  updateModelValue?.(value);
  updateCb?.(value);
}
</script>
