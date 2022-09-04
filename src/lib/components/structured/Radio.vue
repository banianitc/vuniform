<template>
  <Radio
      v-bind='{...$attrs, ...props}'
      v-slot='{ uid, value, hasValue, hasError, errors, onChange, options }'
  >
    <div class='vnf-input-wrapper vnf-input-radio' :class='{"has-error": hasError}'>
      <RadioGroup :model-value='value' @update:modelValue='onChange'>
        <RadioGroupLabel>
          {{ label }}
        </RadioGroupLabel>
        <div class='divide-y divide-solid'>
          <RadioGroupOption
              v-for='opt in options'
              as='template'
              :key='opt'
              :value='opt.value'
              v-slot='{ active, checked }'
          >
            <div
                class='vnf-input-radio-option'
                :class='{active, checked}'
            >
              <span class='vnf-radio-check'>
                <RadioboxMarked v-if='checked' />
                <RadioboxBlank v-else />
              </span>

              <span class='vnf-radio-label'>
                <RadioGroupLabel class='label'>
                  {{ opt.name }}
                </RadioGroupLabel>
              </span>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>

      <slot name='inputErrors' v-if='hasError' :errors='errors'>
        <div class='vnf-input-errors' >
          {{ errors.join(', ') }}
        </div>
      </slot>
    </div>
  </Radio>
</template>

<script lang='ts' setup>
import { inject } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { RadioboxBlank, RadioboxMarked } from 'mdue';
import Radio from '../Radio.vue';

const formId = inject('formId', '')

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


</script>
