<template>
  <Field
      v-bind='{ inputId, overrideValue, errors, forceError }'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, inputId, updateModelValue }'
  >
    <div
        :id='uid'
        class='vnf-input-wrapper'
        :class='{"has-error": hasError}'
        role='button'
        tabindex='0'
    >
      <div class='vnf-input-box'>
        <div
            class='vnf-input-box-wrapper'
            ref="inputRef"
        >
          <div class='vnf-label-box' :class='{minimize: !!value, expand: !hasValue}' @click='onDatepickerClick'>
            <label :for='uid' class='vnf-label'>{{ label }}</label>
          </div>

          <div class='vnf-input'>
            <span @click='onDatepickerClick'>
              <template v-if='value'>
                <DTFormat
                    :datetime='value'
                    :format='DateFormats.DATE_MED'
                />
                <template v-if='!hideTimePicker'>&nbsp;
                  <DTFormat
                      :datetime='value'
                      :format='DateTime.TIME_24_SIMPLE'
                  />
                </template>
              </template>
              <template v-else>
                &nbsp;&nbsp;
              </template>
            </span>

            <div v-if='$slots.inputSuffix' class='vnf-input-suffix'>
              <slot name='inputSuffix' />
            </div>
          </div>
        </div>

        <div>
          <slot name='inputRight' />
        </div>
      </div>
      <slot name='inputErrors' v-if='hasError' :errors='errors'>
        <div class='vnf-input-errors' >
          {{ errors.join(', ') }}
        </div>
      </slot>
    </div>

    <slot
        name='dateTimePicker'
        v-bind='{ value, showDateTimePicker, hideTimePicker, uid, autoSelect, onClose }'
        :onUpdate='(v: string) => onUpdate(v, updateModelValue)'
    />
  </Field>
</template>

<script setup lang='ts' >
import { ref } from 'vue';
import { DateTime } from 'luxon';
import DTFormat from '../../components/DTFormat.vue';
import * as DateFormats from '../../util/date_format';
import { Field } from '../forms';

// TODO: Write custom picker

const fieldRef = ref(null);

const showDateTimePicker = ref(false)
const onClose = () => showDateTimePicker.value = false
const onDatepickerClick = () => showDateTimePicker.value = true

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | [string, string]): void
}>()
interface Props {
  label: string;
  inputId: string;
  errors?: string[];
  forceError?: boolean;
  placeholder?: string;
  hideTimePicker?: boolean;
  autoSelect?: boolean;
  hideEmptyInput?: boolean;
  overrideValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
});

const onUpdate = (val: string, updateCb: (v: any) => void) => {
  const value = DateTime.fromISO(val)
  const storeValue = props.hideTimePicker ? value.toISODate() : value.toISO()

  emit('update:modelValue', storeValue);
  onClose();
  if (updateCb) {
    updateCb(storeValue);
  }
};

const inputRef = ref(null);
defineExpose({
  inputRef,
});
</script>
