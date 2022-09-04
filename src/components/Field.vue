<template>
  <slot
    :value='internalValue'
    :errors='allErrors'
    :updateModelValue='updateModelValue'
    :uid='uid'
    :hasError='hasError'
    :hasValue='hasValue'
  />
</template>

<script setup lang='ts'>
import { computed, inject, onBeforeMount, getCurrentInstance, watch } from 'vue';
import { useFormsStore } from '@/stores/forms';

const formsStore = useFormsStore()

const formId = inject('formId', '')
const uid = `vnf-field-id-${getCurrentInstance()?.uid}`

interface Props {
  inputId: string;
  modelValue: any;
  overrideValue?: string;
  errors?: string[];
  forceError?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
});

onBeforeMount(() => {
  formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {} })
})

const internalValue = computed(() => props.overrideValue || formsStore.fieldGetValue(formId, props.inputId))
const hasValue = computed(() => !!internalValue.value )

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))
const hasError = computed(() => props.forceError || allErrors.value.length)

const updateModelValue = (value: any) => {
  formsStore.STAGE_FIELD_CHANGE({value, query: {formId, field: props.inputId}})
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
