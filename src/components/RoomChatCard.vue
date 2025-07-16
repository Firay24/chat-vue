<script setup lang="ts">
defineProps<{
  msg: string;
  active: boolean;
  name: string;
  times: string;
}>();
</script>

<template>
  <div
    :class="[
      'p-4 rounded-xl cursor-pointer',
      active ? 'bg-primary' : 'bg-[#252331]',
    ]"
  >
    <div class="flex justify-between items-start">
      <div class="flex gap-3 items-center">
        <div class="w-16">
          <img
            src="https://doodleipsum.com/700x700?i=fc734d103a7de613156bdd603038c56b"
            alt=" logo"
          />
        </div>
        <div class="flex flex-col items-start">
          <p class="font-semibold text-xl">{{ name }}</p>
          <p
            :class="['text-gray-500', active ? 'text-white' : 'text-gray-500']"
          >
            {{ msg }}
          </p>
        </div>
      </div>
      <div>
        <p :class="['mt-2 text-sm', active ? 'text-white' : 'text-gray-500']">
          {{ times }}
        </p>
      </div>
    </div>
  </div>
</template>
