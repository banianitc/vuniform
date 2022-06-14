<template>
  <TransitionRoot appear as='template' v-bind='$attrs'>
    <Dialog as='div' @close='onClose'>
      <div class='fixed inset-0 z-40 overflow-y-auto pp-modal'>
        <div class='min-h-screen px-4 text-center'>
          <TransitionChild
              as='template'
              enter='duration-300 ease-out'
              enter-from='opacity-0'
              enter-to='opacity-100'
              leave='duration-200 ease-in'
              leave-from='opacity-100'
              leave-to='opacity-0'
          >
            <DialogOverlay class='fixed inset-0 bg-gray-400 opacity-80' />
          </TransitionChild>

          <span class='inline-block h-screen align-middle' aria-hidden='true'>
                &#8203;
              </span>

          <TransitionChild
              as='template'
              enter='duration-300 ease-out'
              enter-from='opacity-0 scale-50'
              enter-to='opacity-100 scale-100'
              leave='duration-200 ease-in'
              leave-from='opacity-100 scale-100'
              leave-to='opacity-0 scale-50'
          >
            <div
                class="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                  as='h3'
                  class='text-lg font-medium leading-6 text-gray-900 flex flex-row justify-between items-baseline'
              >
                <span>{{ title }}</span>
                <button v-if='showCloseBtn' @click='onClose' type='button'>
                  <Close />
                </button>
              </DialogTitle>

              <div v-if='subtitle' class='mt-1'>
                <p class='text-medium text-gray-500'>
                  {{ subtitle }}
                </p>
              </div>

              <slot name='content' />
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang='ts'>
import { Close } from 'mdue';
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue';

interface Props {
  title?: string;
  subtitle?: string;
  showCloseBtn?: boolean;
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onClose = () => {
  emit('close')
}
</script>
