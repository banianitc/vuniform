<template>
  <Field
      v-bind='{ inputId, overrideValue, errors, forceError }'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, updateModelValue }'
  >
    <slot v-bind='{
      uid,
      options,
      value,
      displayValue,
      hasValue,
      hasError,
      errors,
      showClearButton,
      clearText,
      onChange: onChangeCb(updateModelValue),
      onClear: onClearCb(updateModelValue),
      updateModelValue
    }'>
      <Listbox @update:modelValue='onChangeCb(updateModelValue)($event)'>
        <ListboxButton
            class='vnf-dropdown-button'
            v-slot='{ open }'
        >
          <button
              v-if='showClearButton'
              type='button'
              class='vnf-dropdown-clear-btn'
              :title='clearText'
              @click.prevent.stop='onClearCb(updateModelValue)($event)'
          >
            <Close />
          </button>

          <div class='vnf-dropdown-value'>
            {{ displayValue }}
          </div>

          <ChevronUp v-if='open' />
          <ChevronDown v-else />
        </ListboxButton>

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
      </Listbox>
    </slot>
  </Field>
</template>

<script lang='ts' setup>
import { computed, inject, ref } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronDown, ChevronUp, Close } from 'mdue';
import { Field } from '../forms';

const formId = inject('formId', '')
const fieldRef = ref(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value?: unknown | unknown[]): void
}>()
interface Props {
  inputId: string;
  options?: {value: string, name: string}[];
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

const onChangeCb = (updateModelValueCb: (v: any) => void) => {
  return (value: unknown, updateCb: (v: any) => void) => {
    // TODO: Implement multiple for real
    const v = props.multiple ? (value && [value] || []) : value
    emit('update:modelValue', v)

    updateModelValueCb?.(v)
    updateCb?.(v);
  }
}

const value = computed(() => fieldRef.value?.value)
const displayValue = computed(() => value.value && props.options.find(o => o.value == value.value)?.name || props.placeholder)

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

const onClearCb = (updateModelValue: (v: any) => void) => (updateCb: (v: any) => void) => {
  onChangeCb(updateModelValue)(undefined, updateCb)
}
</script>
