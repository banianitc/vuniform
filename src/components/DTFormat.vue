<template>
  <template v-if='skipTimeTag'>
    {{ formattedTime }}
  </template>
  <template v-else>
    <time :datetime='datetime'>{{ formattedTime }}</time>
  </template>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { DateTime } from 'luxon';
import { formatDateTime } from '../util/datetime';

interface Props {
  datetime: string;
  format?: Intl.DateTimeFormatOptions;
  skipTimeTag?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  format: () => DateTime.DATE_SHORT,
  skipTimeTag: false,
});

const formattedTime = computed(() =>formatDateTime(props.datetime, props.format!));

</script>
