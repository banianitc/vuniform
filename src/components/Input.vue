<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasError, errors }'
  >
    <input v-if='type === "hidden"' v-bind='$attrs' :type='type' :value='value' />

    <div v-else class='vnf-input-wrapper' :class='{"has-error": hasError}'>
      <div class='vnf-input-box' :class='inputBoxClasses'>
        <div class='vnf-input-box-wrapper'>
          <div class='vnf-label-box'>
            <label :for='uid' class='vnf-label'>{{ label }}</label>
          </div>

          <input
            v-bind='$attrs'
            :type='type'
            :id='uid'
            class='vnf-input'
            :value='value'
            @input='onInput'
            :placeholder='placeholder'
            ref='inputRef'
            @focus='onFocus'
            @blur='onBlur'
          >
        </div>

        <div>
          <slot name='inputRight' />
        </div>

        <slot name='inputBoxEnd' />
      </div>
      <div class='errors' v-if='hasError'>
        {{ errors.join(', ') }}
      </div>
    </div>
  </Field>
</template>

<script lang='ts' setup>
import { computed, inject, ref } from 'vue';
import Field from './Field.vue';


const formId = inject('formId', '')
const fieldRef = ref(null);
const inputRef = ref(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
interface Props {
  label: string;
  inputId: string;
  placeholder?: string;
  type?: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
  hideEmptyInput?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errors: () => [],
  placeholder: ' ',
});

const onInput = (event: any) => {
  const value = event.target.value
  emit('update:modelValue', value);
  if (fieldRef.value?.updateModelValue) {
    fieldRef.value.updateModelValue(value);
  }
}

defineExpose({
  inputRef,
});

const hasFocus = ref(false)
const onFocus = () => hasFocus.value = true;
const onBlur = () => hasFocus.value = false;

const inputBoxClasses = computed(() => ({
  'has-value': !!fieldRef.value?.hasValue,
  'has-focus': hasFocus.value,
}));
</script>
