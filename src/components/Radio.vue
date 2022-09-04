<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, inputId }'
  >
    <slot v-bind='{ uid, options, value, hasValue, hasError, errors, inputId, onChange }'>
      <RadioGroup :model-value='value' @update:modelValue='onChange'>
        <RadioGroupOption
            v-for='opt in options'
            :key='opt'
            :value='opt.value'
            v-slot='{ active, checked }'
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
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  errors: () => [],
})

const onChange = (value: string) => {
  emit('update:modelValue', value)
  if (fieldRef.value?.updateModelValue) {
    fieldRef.value.updateModelValue(value);
  }
}
</script>
