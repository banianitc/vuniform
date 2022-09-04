<template>
  <Modal
      :show='show'
      @close='onClose'
  >
    <template #content>
      <div class='vnf-flex vnf-flex-col vnf-items-center'>
        <FlatPickr
            :model-value='modelValue'
            :config='pickerConfig'
            @update:modelValue='onLocalUpdate'
        />

        <div v-if='!autoSelect' class='mt-4'>
          <button
              type='button'
              class='vnf-mx-2 vnf-btn vnf-secondary'
              @click='onClose'
          >
            {{ cancelText }}
          </button>

          <button
              type='button'
              class='vnf-mx-2 vnf-btn vnf-primary'
              @click='onSubmit'
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import Modal from './Modal.vue';
// @ts-ignore-next-line
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

interface Props {
  modelValue?: string;
  elId?: string;
  disableTimeSection?: boolean;
  show?: boolean;
  autoSelect?: boolean;
  confirmText?: string;
  cancelText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'close'): void
}>();

const localValue = ref('')

const onSubmit = () => {
  emit('update:modelValue', localValue.value)
}

const onClose = () => emit('close')

const pickerConfig = computed(() => {
  return {
    inline: true,
    enableTime: !props.disableTimeSection,
    dateFormat: 'Z',
    time_24hr: true,
  }
})

const onLocalUpdate = (val: string) => {
  localValue.value = val
  if (props.autoSelect) {
    onSubmit()
  }
}
</script>

<style scoped>
.flatpickr-input {
  @apply vnf-hidden;
}
</style>
