<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasError, errors }'
  >
    <input type='hidden' v-bind='$attrs' :value='value' />
  </Field>
</template>

<script lang='ts' setup>
import { inject, ref } from 'vue';
import Field from './Field.vue';

const formId = inject('formId', '')
const fieldRef = ref(null);

interface Props {
  label: string;
  inputId: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
  hideEmptyInput?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
});
</script>
