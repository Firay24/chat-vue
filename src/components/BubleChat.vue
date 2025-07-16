<script setup lang="ts">
defineProps<{
  msg: string;
  isSender: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'p-3 relative rounded-lg w-fit max-w-96',
      isSender ? 'bg-primary' : 'bg-[#302d3f]',
    ]"
  >
    <p class="text-left pr-6">
      {{ msg }}
    </p>
    <p
      :class="[
        'text-right text-sm mt-1',
        isSender ? 'text-blue-300' : 'text-gray-500',
      ]"
    >
      12:35
    </p>
  </div>
</template>
