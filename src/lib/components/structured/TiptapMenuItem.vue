<template>
  <button
      class="menu-item"
      type='button'
      :class="{ 'is-active': isActive ? isActive(): null }"
      @click.prevent="onClickHanlder"
      :title="title"
  >
    <Component :is="icon" />
  </button>
</template>

<script setup lang='ts'>
import { RichTextMenuItemEnum } from '../../../util/enums';

interface Props {
  icon: unknown;
  title: string;
  action: Function;
  isActive?: Function | null;
  manual?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isActive: null,
})

const emit = defineEmits<{
  (e: 'mitem:click', payload: { type: RichTextMenuItemEnum, action: Function }): void
}>();

function onClickHanlder() {
  if (props.manual) {
    return emit('mitem:click', { type: props.title, action: props.action })
  }
  props.action(); 
}
</script>
