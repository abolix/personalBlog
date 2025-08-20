<script setup>
const route = useRoute()
const { id } = route.params

definePageMeta({
    validate: async (route) => {
        const { id } = route.params;
        if (isNaN(id)) return false;
		return true;
	},
})

// Fetch the post data
const { data: post, error } = await useFetch(`/api/posts/${id}`)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found'
  })
}

// Set SEO meta tags
useSeoMeta({
  title: post.value?.title,
  description: post.value?.content?.substring(0, 160) + '...',
})

defineOgImageComponent('NuxtSeo', {
  title: post.value?.title,
  description: 'My Personal Blog',
  theme: '#ff0000',
  colorMode: 'dark',
  renderer: 'chromium'
})
</script>

<template>
	<div v-if="post" class="max-w-4xl mx-auto space-y-6 px-4">
		<!-- Header Section -->
		<div class="space-y-4">
			<UButton
				to="/"
				variant="ghost"
				icon="i-lucide-arrow-right"
				class="mb-4"
			>
				بازگشت به صفحه اصلی
			</UButton>

			<h1 class="text-3xl md:text-4xl font-bold leading-tight">{{ post.title }}</h1>

			<div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
				<UBadge variant="soft" size="lg">
					{{ timestampToJalali(post.createdAt) }}
				</UBadge>
			</div>
		</div>

		<USeparator />

		<!-- Content Section -->
		<div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-500 prose-strong:text-gray-900 dark:prose-strong:text-gray-100">
			<MDC :value="post.content" tag="article" />
		</div>

		<!-- Navigation -->
		<div class="pt-8">
			<USeparator class="mb-6" />
			<div class="flex justify-center">
				<UButton
					to="/"
					variant="outline"
					size="lg"
					icon="i-lucide-grid-3x3"
				>
					مشاهده سایر پست‌ها
				</UButton>
			</div>
		</div>
	</div>

	<!-- Loading State -->
	<div v-else class="flex justify-center items-center min-h-96">
		<div class="flex flex-col items-center gap-4">
			<UIcon name="i-lucide-loader-2" class="animate-spin text-3xl text-primary-500" />
			<p class="text-gray-500">در حال بارگذاری...</p>
		</div>
	</div>
</template>
