<template>
  <Dropdown
      v-bind='{ inputId, overrideValue, errors, forceError }'
      v-slot='{ uid, value, displayValue, hasValue, hasError, errors, showClearButton, clearText, onChange, onClear, options }'
  >
    <div class='vnf-dropdown-input-wrapper vnf-input-wrapper' :class='{"has-error": hasError}'>
      <Listbox @update:modelValue='onChange' v-slot='{ open }'>
        <ListboxLabel class='vnf-label'>{{ label }}</ListboxLabel>
        <ListboxButton
            class='vnf-dropdown-button'
        >
          <button
              v-if='showClearButton'
              type='button'
              class='vnf-dropdown-clear-btn'
              :title='clearText'
              @click.prevent.stop='onClear'
          >
            <Close />
          </button>

          <div class='vnf-dropdown-value'>
            {{ displayValue }}
          </div>

          <div
              class='vnf-dropdown-arrow'
              :class='{ open }'
          >
            <ChevronDown />
          </div>
        </ListboxButton>

        <transition name='vnf-fade'>
          <ListboxOptions class='vnf-dropdown-options'>
            <ListboxOption
                v-for='opt in options'
                :key='opt'
                :value='opt.value'
                class='vnf-dropdown-option'
            >
              {{ opt.name }}
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </Listbox>
      <slot name='inputErrors' v-if='hasError' :errors='errors'>
        <div class='vnf-input-errors' >
          {{ errors.join(', ') }}
        </div>
      </slot>
    </div>
  </Dropdown>
</template>

<script lang='ts' setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel } from '@headlessui/vue'
import { ChevronDown, Close } from 'mdue';
import Dropdown from '../Dropdown.vue';

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
  overrideValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  clearText: 'Clear',
  options: () => [],
  errors: () => [],
})
</script>
