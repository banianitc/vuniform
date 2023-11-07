<template>
  <Field
      v-bind='{ inputId, overrideValue, errors, forceError }'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, inputId, updateModelValue }'
  >
    <slot v-bind='{ uid, options, value, hasValue, hasError, errors, inputId, onChange: onChangeCb(updateModelValue) }'>
      <RadioGroup :model-value='value' @update:modelValue='onChangeCb(updateModelValue)($event)'>
        <RadioGroupOption
            v-for='opt in options'
            :key='opt'
            :value='opt.value'
        >
          <input type='radio' :name='inputId' :value='opt.value' :checked='value === opt.value' />
          <RadioGroupLabel class='label'>
            {{ opt.name }}
          </RadioGroupLabel>
        </RadioGroupOption>
      </RadioGroup>
    </slot>
  </Field>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import Field from './Field.vue';

const fieldRef = ref(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
interface Props {
  label: string;
  inputId: string;
  options: {value: string, name: string}[];
  defaultValue?: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  errors: () => [],
})

const onChangeCb = (updateModelValue?: (v: any) => void) => (value: string, updateCb?: (v: any) => void) => {
  emit('update:modelValue', value)
  updateModelValue?.(value)
  updateCb?.(value);
}
</script>
