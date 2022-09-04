<template>
  <TextareaInput
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, onInput }'
  >
    <div class='vnf-textarea-input vnf-input-wrapper'>
      <div class='vnf-input-box'>
        <div v-if='!hideLabel' class='vnf-label-box'>
          <label :for='uid' class='vnf-label'>{{ label }}</label>
        </div>

        <textarea
            v-bind='$attrs'
            :id='uid'
            class='vnf-input'
            :value='value'
            :placeholder='placeholder'
            ref='inputRef'
            @input='onInput'
        />
      </div>

      <slot name='inputErrors' v-if='hasError' :errors='errors'>
        <div class='vnf-input-errors' >
          {{ errors.join(', ') }}
        </div>
      </slot>
    </div>
  </TextareaInput>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import TextareaInput from '../Textarea.vue';

const fieldRef = ref(null);
const inputRef = ref(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
interface Props {
  inputId: string;
  label?: string;
  placeholder?: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
  hideEmptyInput?: boolean;
  hideLabel?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errors: () => [],
  placeholder: ' ',
});

defineExpose({
  inputRef,
});
</script>
