<template>
  <div
      :id='uid'
      class='pp-input-wrapper'
      :class='{"has-error": hasError}'
      role='button'
      tabindex='0'
  >
    <div class='pp-input-box'>
      <div
          class='input-box-wrapper'
          ref="inputRef"
          @click='onDatepickerClick'
      >
        <div class='pp-label-box' :class='{minimize: !!value, expand: expandLabel}'>
          <label :for='uid' class='pp-label'>{{ label }}</label>
        </div>

        <div class='pp-input' v-if="showInput" >
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
        <slot
          name="emptyValue"
          v-if="!showInput"
        />

      </div>

      <div>
        <slot name='inputRight' />
      </div>
      <div class='pp-input-underline' :class='{expand: dpOpen}' />
    </div>
    <div class='errors' v-if='hasError'>
      {{ allErrors.join(', ') }}
    </div>
  </div>
</template>

<script setup lang='ts' >
import { computed, getCurrentInstance, inject, ref, useSlots } from 'vue';
import { DateTime } from 'luxon';
import DTFormat from './components/DTFormat.vue';
import * as DateFormats from './util/date_format';
import { useFormsStore } from './stores/forms';
import DateTimePicker from './components/DateTimePicker.vue';

// TODO: Write custom picker

const formId = computed(() => inject('formId', ''))
const formsStore = useFormsStore()

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

  formsStore.STAGE_FIELD_CHANGE({value: storeValue, query: {formId: formId.value, field: props.inputId}})
  emit('update:modelValue', storeValue);
  closeDateTimePicker();
};

formsStore.INIT_FORM_FIELD({formId: formId.value, name: props.inputId, config: {}})

const value = computed(() => formsStore.fieldGetValue(formId.value, props.inputId) || null)
const expandLabel = computed(() => !value.value)

const storeErrors = computed(() => {
  const startErrors = formsStore.fieldGetErrors(formId.value, props.inputId) || []
  return [...startErrors]
})
const allErrors = computed(() => storeErrors.value.concat(props.errors))

const hasError = computed(() => props.forceError || allErrors.value.length)

const uid = `pp-datetime-input-id-${getCurrentInstance()?.uid}`

const dpOpen = ref(false)

const slots = useSlots();

const showInput = computed(() => value.value || !slots.emptyValue || !props.hideEmptyInput);

const inputRef = ref(null);
defineExpose({
  inputRef,
});
</script>
