<template>
  <slot :value='internalValue' :errors='storeErrors' />
</template>

<script setup lang='ts'>
import { computed, inject, onBeforeMount, watch } from 'vue';
import { useFormsStore } from './stores/forms';

const formId = inject('formId', '')

interface Props {
  inputId: string;
  modelValue: any;
}
const props = defineProps<Props>()

const formsStore = useFormsStore()

onBeforeMount(() => {
  formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {} })
})

const internalValue = computed(() => formsStore.fieldGetValue(formId, props.inputId))
const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])

const updateModelValue = (value: any) => {
  formsStore.STAGE_FIELD_CHANGE({value, query: {formId, field: props.inputId}})
}

watch(() => props.modelValue, (newVal: any) => {
  console.log('props modelvalue changed:', newVal)
  updateModelValue(newVal)
})
</script>
