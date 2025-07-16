<script setup lang="ts">
defineProps<{
  msg: string;
  isSender: boolean;
}>();
</script>

<template>
  <p
    :class="[
      'p-3 rounded-lg text-left w-fit max-w-96',
      isSender ? 'bg-primary' : 'bg-[#302d3f]',
    ]"
  >
    {{ msg }}
  </p>
</template>
