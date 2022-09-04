<template>
  <Checkbox v-bind='{...$attrs, ...props}' v-slot='{checked, toggle, hasError, errors}'>
    <div class='vnf-checkbox vnf-input-wrapper' :class='{"has-error": hasError}'>
      <div class='vnf-input-box' @click='toggle'>
        <div class='vnf-checkbox-icon'>
          <CheckboxMarked v-if='checked' />
          <CheckboxBlankOutline v-else />
        </div>
        <label class='vnf-label'>{{ label }}</label>
      </div>

      <slot name='inputErrors' v-if='hasError' :errors='errors'>
        <div class='vnf-input-errors' >
          {{ errors.join(', ') }}
        </div>
      </slot>
    </div>
  </Checkbox>
</template>

<script lang='ts' setup>
import { CheckboxBlankOutline, CheckboxMarked } from 'mdue';
import Checkbox from '../Checkbox.vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()
interface Props {
  label: string;
  inputId: string;
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
</script>
