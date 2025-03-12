<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - MyShop` : 'MyShop';
  }
})

</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage/>

    </NuxtLayout>
  </UApp>
</template>
