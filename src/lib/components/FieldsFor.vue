<template>
  <slot v-bind='$attrs' />
</template>

<script setup lang='ts'>
import { inject, provide } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();

const oldScope = inject('vuniform-scope', []);
const newScope = [...oldScope, props.name]
provide('vuniform-scope', newScope);
</script>
