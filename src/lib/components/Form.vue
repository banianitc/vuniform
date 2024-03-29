<template>
  <form class='vnf-form' @submit.prevent='onSubmit'>
    <template v-if='mounted'>
      <slot />
    </template>
  </form>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, provide, ref, watch } from 'vue';
// import LoadingSpinner from 'vue-loading-overlay';
// import themeColors from '@/themeColors.json';
import { useFormsStore } from '../stores/forms';

const formsStore = useFormsStore();

interface Props {
  loading: boolean;
  formId: string;
  initialValues?: unknown;
}
const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const configuration = {
  clearErrorsOnEdit: true,
}

const emit = defineEmits<{
  (e: 'submit', formId: string): void
  (e: 'reset', formId: string): void
}>();

onMounted(() => {
  formsStore.INIT_FORM({ formId: props.formId, config: configuration })

  watch(() => props.initialValues, (current: unknown, old: unknown) => {
    if (old) {
      // We only want to set values if they weren't defined before
      return
    }

    formsStore.SET_INITIAL_VALUES({formId: props.formId, values: current})
    formsStore.RESET_FIELD_VALUES(props.formId)
  }, {immediate: true})
})

onUnmounted(() => {
  formsStore.DEINIT_FORM(props.formId)
})

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

provide('formId', props.formId)

const onSubmit = () => {
  emit('submit', props.formId)
}
</script>
