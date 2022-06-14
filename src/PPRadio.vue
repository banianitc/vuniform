<template>
  <div class='pp-input-radio' :class='{"has-error": hasError}'>
    <RadioGroup :model-value='value' @update:modelValue='onChange'>
      <RadioGroupLabel>
        {{ label }}
      </RadioGroupLabel>
      <div class='divide-y divide-solid'>
        <RadioGroupOption
            v-for='opt in options'
            :key='opt'
            :value='opt.value'
            as='template'
            v-slot='{ active, checked }'
        >
          <div
              class='cursor-pointer p-2 hover:bg-gray-100 active:bg-gray-100 flex flex-row items-center justify-between'
              :class='{active, checked}'
          >
            <RadioGroupLabel class='label'>
              {{ opt.name }}
            </RadioGroupLabel>
            <div
              v-if='checked'
              class='text-2xl text-gray-400'
            >
              <CheckCircle />
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <div class='errors' v-if='hasError'>
      {{ allErrors.join(', ') }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, getCurrentInstance, inject, ref } from 'vue';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { useFormsStore } from './stores/forms';
import { CheckCircle } from 'mdue';

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
  options: [],
  errors: [],
})

const formsStore = useFormsStore()

const onChange = (value: string) => {
  formsStore.STAGE_FIELD_CHANGE({value, query: {formId, field: props.inputId}})
  emit('update:modelValue', value)
}

formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {default: props.defaultValue}})

const value = computed(() => formsStore.fieldGetValue(formId, props.inputId))

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))

const hasError = computed(() => props.forceError || allErrors.value.length)

const uid = `pp-radio-id-${getCurrentInstance()?.uid}`
</script>
