<template>
  <PPInput
      :type='type'
      v-bind='$attrs'
  >
    <template v-if='showable' #inputRight>
      <button
          class='input-action-btn'
          type='button'
          @click.prevent.stop='togglePassword'
      >
        <ToggleButton class='text-xl' />
      </button>
    </template>
  </PPInput>
</template>

<script setup lang='ts'>
import PPInput from './PPInput.vue';
import { computed, ref } from 'vue';
import { Eye, EyeOff } from 'mdue';

const type = ref<'text' | 'password'>('password')

interface Props {
  showable?: boolean;
}
const props = defineProps<Props>()

const togglePassword = () => {
  type.value = type.value == 'text' ? 'password' : 'text'
}

const ToggleButton = computed(() => type.value == 'password' ? Eye : EyeOff)
</script>
