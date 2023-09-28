<template>
  <slot
    :value='internalValue'
    :errors='allErrors'
    :updateModelValue='updateModelValue'
    :uid='uid'
    :hasError='hasError'
    :hasValue='hasValue'
    :inputId='scopedFieldId'
  />
</template>

<script setup lang='ts'>
import { computed, inject, onBeforeMount, getCurrentInstance, watch } from 'vue';
import { scopedName, useFormsStore } from '../stores/forms';

const formsStore = useFormsStore()

const formId = inject('formId', '')
const scope = inject('vuniform-scope', [])
const uid = `vnf-field-id-${getCurrentInstance()?.uid}`

interface Props {
  inputId: string;
  modelValue?: any;
  overrideValue?: string;
  errors?: string[];
  forceError?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
});

const scopedFieldId = computed(() => scopedName(props.inputId, scope));

onBeforeMount(() => {
  formsStore.INIT_FORM_FIELD({formId, name: scopedFieldId.value, config: {} })
})

const internalValue = computed(() => props.overrideValue || formsStore.fieldGetValue(formId, scopedFieldId.value))
const hasValue = computed(() => internalValue.value !== "" && typeof internalValue.value !== "undefined")

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, scopedFieldId.value) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))
const hasError = computed(() => props.forceError || allErrors.value.length)

const updateModelValue = (value: any) => {
  formsStore.STAGE_FIELD_CHANGE({value, query: {formId, field: scopedFieldId.value}})
}

watch(() => props.modelValue, (newVal: any) => {
  updateModelValue(newVal)
})

defineExpose({
  updateModelValue,
  hasValue,
  storeErrors,
  value: internalValue,
})
</script>
