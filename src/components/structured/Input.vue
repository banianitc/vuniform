<template>
  <Input v-bind='{...$attrs, ...props}'>
    <template #default='{ uid, value, hasValue, hasError, errors, onInput }'>
      <div class='vnf-input-wrapper' :class='{"has-error": hasError}'>
        <div class='vnf-input-box' :class='inputBoxClasses'>
          <div class='vnf-input-box-wrapper'>
            <div v-if='!hideLabel' class='vnf-label-box'>
              <label :for='uid' class='vnf-label'>{{ label }}</label>
            </div>

            <input
                v-bind='$attrs'
                :type='type'
                :id='uid'
                class='vnf-input'
                :value='value'
                :placeholder='placeholder'
                ref='inputRef'
                @input='onInput'
                @focus='onFocus'
                @blur='onBlur'
            >

            <slot name='inputBoxSuffix' />
          </div>

          <div v-if='$slots.inputRight'>
            <slot name='inputRight' />
          </div>

          <slot name='inputBoxEnd' />
        </div>

        <slot name='inputErrors' v-if='hasError' :errors='errors'>
          <div class='vnf-input-errors' >
            {{ errors.join(', ') }}
          </div>
        </slot>
      </div>
    </template>
  </Input>
</template>

<script setup lang='ts'>
import Input from '../Input.vue';
import { computed, ref } from 'vue';

interface Props {
  label: string;
  inputId: string;
  placeholder?: string;
  type?: string;
  errors?: string[];
  forceError?: boolean;
  overrideValue?: string;
  hideEmptyInput?: boolean;
  hideLabel?: boolean;
}
const props = defineProps<Props>();

const hasFocus = ref(false)
const onFocus = () => hasFocus.value = true;
const onBlur = () => hasFocus.value = false;

const inputBoxClasses = computed(() => ({
  'has-focus': hasFocus.value,
}));
</script>
