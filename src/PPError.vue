<template>
  <div class='errors' v-if='hasError'>
    {{ allErrors.join(', ') }}
  </div>
</template>

<script setup lang='ts'>
import { computed, inject } from 'vue';
import { useFormsStore } from './stores/forms';

const formId = inject('formId', '')
const formsStore = useFormsStore()

interface Props {
  inputId: string;
  errors?: string[];
  forceError?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
})

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))
const hasError = computed(() => props.forceError || allErrors.value.length)
</script>
