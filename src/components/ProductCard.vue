<script setup lang="ts">
const props = defineProps<{
  id: string;
}>();

import data from "../data/listRooms.json";

const products = data.data.product;
const selectedProduct = products.find((p) => p.id === props.id);
</script>

<template>
  <div class="rounded-lg bg-[#302d3f] w-fit self-end overflow-hidden">
    <img
      class="w-52 h-52 object-cover rounded-t-lg"
      :src="selectedProduct?.image"
      :alt="selectedProduct?.name"
    />
    <div class="px-3 flex flex-col gap-1 py-2 text-white text-left">
      <p class="font-semibold">{{ selectedProduct?.name }}</p>
      <p class="text-xl">{{ selectedProduct?.price }}</p>
    </div>
  </div>
</template>
