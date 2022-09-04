<template>
  <Input
      :type='type'
      v-bind='$attrs'
  >
    <template v-if='showable' #inputBoxSuffix>
      <button
          class='input-action-btn'
          type='button'
          @click.prevent.stop='togglePassword'
      >
        <ToggleButton class='text-xl' />
      </button>
    </template>
  </Input>
</template>

<script setup lang='ts'>
import Input from './Input.vue';
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
