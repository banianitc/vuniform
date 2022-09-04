<template>
  <Field
      v-bind='props'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors, inputId }'
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
            @click='onDatepickerClick'
        >
          <div class='vnf-label-box' :class='{minimize: !!value, expand: !hasValue}'>
            <label :for='uid' class='vnf-label'>{{ label }}</label>
          </div>

          <div class='vnf-input'>
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
              &nbsp;
            </template>

            <DateTimePicker
                class='min-h-4'
                :model-value='value'
                :show='showDateTimePicker'
                :disable-time-section='hideTimePicker'
                :el-id='uid'
                :auto-select='autoSelect'
                @update:modelValue='onUpdate'
                @close='closeDateTimePicker'
            />
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
  </Field>
</template>

<script setup lang='ts' >
import { ref } from 'vue';
import { DateTime } from 'luxon';
import DTFormat from './DTFormat.vue';
import * as DateFormats from '../util/date_format';
import DateTimePicker from './DateTimePicker.vue';
import { Field } from '../forms';

// TODO: Write custom picker

const fieldRef = ref(null);

const showDateTimePicker = ref(false)
const closeDateTimePicker = () => showDateTimePicker.value = false
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
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
});

const onUpdate = (val: string) => {
  const value = DateTime.fromISO(val)
  const storeValue = props.hideTimePicker ? value.toISODate() : value.toISO()

  emit('update:modelValue', storeValue);
  closeDateTimePicker();
  if (fieldRef.value?.updateModelValue) {
    fieldRef.value.updateModelValue(value);
  }
};

const inputRef = ref(null);
defineExpose({
  inputRef,
});
</script>
