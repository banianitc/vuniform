<template>
  <div class='pp-input-wrapper' :class='{"has-error": hasError}'>
    <div class='pp-input-box flex flex-row items-center cursor-pointer' @click='toggle'>
      <div class='text-2xl'>
        <CheckboxMarked v-if='checked' />
        <CheckboxBlankOutline v-else />
      </div>
      <div class='px-2'>
        <label class='pp-label'>{{ label }}</label>
      </div>
    </div>
    <div class='errors' v-if='hasError'>
      {{ allErrors.join(', ') }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed, getCurrentInstance, inject, onBeforeMount, onMounted, ref } from 'vue';
import { CheckboxBlankOutline, CheckboxMarked } from 'mdue';
import { useFormsStore } from './stores/forms';

const formId = inject('formId', '')

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()
interface Props {
  label: string;
  inputId: string;
  type?: string;
  errors?: string[];
  forceError?: boolean;
  trueValue?: unknown;
  falseValue?: unknown;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errors: [],
  trueValue: '1',
  falseValue: '0',
})

const formsStore = useFormsStore()

const toggle = () => {
  const value =  checked.value ? props.falseValue : props.trueValue;
  formsStore.STAGE_FIELD_CHANGE({value, query: {formId, field: props.inputId}})
  emit('update:modelValue', value)
}

onBeforeMount(() => {
  formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {} })
})

const value = computed(() => formsStore.fieldGetValue(formId, props.inputId))
const checked = computed(() => value.value === props.trueValue)

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))

const hasError = computed(() => props.forceError || allErrors.value.length)

const uid = `pp-input-id-${getCurrentInstance()?.uid}`
</script>
