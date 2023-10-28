<template>
  <FieldsFor
    v-for='(_, idx) in [1,2]'
    :name='`${scopedFieldId}[${idx}]`'
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

onBeforeMount(() => {
  formsStore.INIT_FIELD_LIST({formId, name: scopedFieldId.value, config: {}})
})
</script>
