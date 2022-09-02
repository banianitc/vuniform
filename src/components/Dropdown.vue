<template>
  <div class='pp-input-wrapper' :class='{"has-error": hasError}'>
    <Listbox @update:modelValue='onChange'>
      <ListboxLabel class='vnf-label'>{{ label }}</ListboxLabel>
      <ListboxButton
          class='vnf-input w-full text-left flex flex-row items-center'
          v-slot='{ open }'
      >
        <button
            v-if='showClearButton'
            type='button'
            class='px-1 text-lg'
            :title='clearText'
            @click.prevent.stop='onClear'
        >
          <Close />
        </button>

        <div class='flex-1'>
          {{ displayValue }}
        </div>

        <div
            class='px-1 text-2xl transition-transform duration-300'
            :class='{"-rotate-180": open}'
        >
          <ChevronDown />
        </div>
      </ListboxButton>

      <transition
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <ListboxOptions class='bg-white absolute z-50 w-full top-full shadow-lg'>
          <ListboxOption
              v-for='opt in options'
              :key='opt'
              :value='opt.value'
              class='cursor-pointer p-2 hover:bg-gray-100 active:bg-gray-100'
          >
            {{ opt.name }}
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
    <div class='errors' v-if='hasError'>
      {{ allErrors.join(', ') }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, getCurrentInstance, inject, ref } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel } from '@headlessui/vue'
import { ChevronDown, Close } from 'mdue';
import { useFormsStore } from '../stores/forms';

const formId = inject('formId', '')

const emit = defineEmits<{
  (e: 'update:modelValue', value?: unknown | unknown[]): void
}>()
interface Props {
  label: string;
  inputId: string;
  options: {value: string, name: string}[];
  defaultValue?: string;
  clearable?: boolean;
  errors?: string[];
  forceError?: boolean;
  multiple?: boolean;
  placeholder?: string;
  clearText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  clearText: 'Clear',
  options: () => [],
  errors: () => [],
})

const formsStore = useFormsStore()

const onChange = (value?: unknown) => {
  // TODO: Implement multiple for real
  const v = props.multiple ? (value && [value] || []) : value
  formsStore.STAGE_FIELD_CHANGE({value: v, query: {formId, field: props.inputId}})
  emit('update:modelValue', v)
}

formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {default: props.defaultValue}})

const value = computed(() => formsStore.fieldGetValue(formId, props.inputId))
const displayValue = computed(() => value.value && props.options.find(o => o.value == value.value)?.name || props.placeholder)

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))

const hasError = computed(() => props.forceError || allErrors.value.length)

const uid = `pp-dropdown-id-${getCurrentInstance()?.uid}`

const hasValue = computed(() => {
  const v = value.value
  if (!v) {
    return false
  }

  if (!props.multiple) {
    return !!v
  }

  return (<unknown[]>v).length > 0
})
const showClearButton = computed(() => props.clearable && hasValue.value)
const minimizeLabel = computed(() => !!displayValue.value)

const onClear = () => {
  onChange(undefined)
}
</script>

<style>

</style>
