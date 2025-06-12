<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - MyBlog` : 'MyBlog';
  }
})

useSeoMeta({
  title: 'Home',
  ogTitle: 'Abolix : Personal Blog',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>
