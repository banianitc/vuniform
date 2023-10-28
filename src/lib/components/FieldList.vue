<template>
  <FieldsFor
    v-for='idx in indices'
    :name='`${name}[${idx}]`'
  >
    <slot />
  </FieldsFor>
</template>

<script setup lang="ts">
import { scopedName, useFormsStore } from '../stores/forms';
import { computed, inject, onBeforeMount } from 'vue';
import FieldsFor from '@/components/FieldsFor.vue';

type Props = {
  name: string;
}

const props = defineProps<Props>();

const formId = inject('formId', '')
const scope = inject('vuniform-scope', [])

const scopedFieldId = computed(() => scopedName(props.name, scope));

const formsStore = useFormsStore()

const indices = computed(() => {
  const values = Object.keys(formsStore.formGetValues(formId))
      .filter((k) => k.startsWith(`${scopedFieldId.value}[`))
      .map(k => k.replace(new RegExp(`^${scopedFieldId.value}\\[(\\d+)\].*$`), '$1'))

  return Array.from(new Set(values))
})
onBeforeMount(() => {
  formsStore.INIT_FIELD_LIST({formId, name: scopedFieldId.value, config: {}})
})
</script>
