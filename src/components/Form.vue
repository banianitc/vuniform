<template>
  <form class='vld-parent vnf-form'>
    <template v-if='mounted'>
      <!--
      <LoadingSpinner
        :active='loading'
        :is-full-page='false'
        :color='themeColors.primary'
      />
      -->
      <slot />
    </template>
  </form>
</template>

<script setup lang='ts'>
import { onBeforeMount, onMounted, onUnmounted, provide, ref, watch } from 'vue';
// import LoadingSpinner from 'vue-loading-overlay';
// import themeColors from '@/themeColors.json';
import { useFormsStore } from '@/stores/forms';

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

onBeforeMount(() => {
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
</script>
