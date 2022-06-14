<template>
  <input v-if='type === "hidden"' v-bind='$attrs' :type='type' :value='value' />

  <div v-else class='pp-input-wrapper' :class='{"has-error": hasError}'>
    <div class='pp-input-box'>
      <div class='input-box-wrapper'>
        <div class='pp-label-box'>
          <label :for='uid' class='pp-label'>{{ label }}</label>
        </div>

        <input
          v-if="showInput"
          v-bind='$attrs'
          :type='type'
          :id='uid'
          class='pp-input'
          :value='value'
          @input='onInput'
          :placeholder='placeholder'
          ref='inputRef'
        >
        <slot
          name="emptyValue"
          v-if="!showInput"
        />
      </div>

      <div>
        <slot name='inputRight' />
      </div>

      <div class='pp-input-underline' />
    </div>
    <div class='errors' v-if='hasError'>
      {{ allErrors.join(', ') }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, getCurrentInstance, inject, ref, useSlots } from 'vue';
import { useFormsStore } from './stores/forms';

const formId = inject('formId', '')

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
interface Props {
  label: string;
  inputId: string;
  placeholder?: string;
  type?: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
  hideEmptyInput?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errors: () => [],
  placeholder: ' ',
});

const slots = useSlots();

const onInput = (event: any) => {
  const value = event.target.value
  formsStore.STAGE_FIELD_CHANGE({value, query: {formId, field: props.inputId}})
  emit('update:modelValue', value)
}

const formsStore = useFormsStore()

if (formId) {
  formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {}})
}

const value = computed(() => props.overrideValue || formsStore.fieldGetValue(formId, props.inputId))

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))

const hasError = computed(() => props.forceError || allErrors.value.length)

const uid = `pp-input-id-${getCurrentInstance()?.uid}`

const showInput = computed(() => !slots.emptyValue || !props.hideEmptyInput);

const inputRef = ref(null);
defineExpose({
  inputRef,
});
</script>
