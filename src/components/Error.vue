<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, inputId }'
  >
    <div class='vnf-errors' v-if='hasError'>
      {{ errors.join(', ') }}
    </div>
  </Field>
</template>

<script setup lang='ts'>
import Field from './Field.vue';

interface Props {
  inputId: string;
  errors?: string[];
  forceError?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
})
</script>
