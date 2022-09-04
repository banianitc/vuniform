<template>
  <TransitionRoot appear as='template' v-bind='$attrs'>
    <Dialog as='div' @close='onClose'>
      <div class='vnf-fixed vnf-inset-0 vnf-z-40 vnf-overflow-y-auto vnf-pp-modal'>
        <div class='vnf-min-h-screen vnf-px-4 vnf-text-center'>
          <TransitionChild
              as='template'
              enter='vnf-duration-300 vnf-ease-out'
              enter-from='vnf-opacity-0'
              enter-to='vnf-opacity-100'
              leave='vnf-duration-200 vnf-ease-in'
              leave-from='vnf-opacity-100'
              leave-to='vnf-opacity-0'
          >
            <DialogOverlay class='vnf-fixed vnf-inset-0 vnf-bg-gray-400 vnf-opacity-80' />
          </TransitionChild>

          <span class='vnf-inline-block vnf-h-screen vnf-align-middle' aria-hidden='true'>
                &#8203;
              </span>

          <TransitionChild
              as='template'
              enter='vnf-duration-300 ease-out'
              enter-from='vnf-opacity-0 scale-50'
              enter-to='vnf-opacity-100 scale-100'
              leave='vnf-duration-200 ease-in'
              leave-from='vnf-opacity-100 scale-100'
              leave-to='vnf-opacity-0 scale-50'
          >
            <div
                class="vnf-inline-block vnf-w-full vnf-max-w-xl vnf-p-6 vnf-my-8 vnf-overflow-hidden vnf-text-left vnf-align-middle vnf-transition-all vnf-transform vnf-bg-white vnf-shadow-xl vnf-rounded-2xl"
            >
              <DialogTitle
                  as='h3'
                  class='vnf-text-lg vnf-font-medium vnf-leading-6 vnf-text-gray-900 vnf-flex vnf-flex-row vnf-justify-between vnf-items-baseline'
              >
                <span>{{ title }}</span>
                <button v-if='showCloseBtn' @click='onClose' type='button'>
                  <Close />
                </button>
              </DialogTitle>

              <div v-if='subtitle' class='vnf-mt-1'>
                <p class='vnf-text-medium vnf-text-gray-500'>
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
