<template>
  <button
      class="menu-item"
      type='button'
      :class="{ 'is-active': isActive ? isActive(): null }"
      @click="action"
      :title="title"
  >
    <Component :is="icon" />
  </button>
</template>

<script setup lang='ts'>

interface Props {
  icon: unknown;
  title: string;
  action: Function;
  isActive?: Function | null;
}
const props = withDefaults(defineProps<Props>(), {
  isActive: null,
})

</script>
