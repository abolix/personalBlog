<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const q = ref('')
const {data:posts, refresh} = await useFetch('/api/posts', {
  query: { q }
})

const handleSearch = async () => {
  await refresh()
}

const handleClearSearch = async () => {
  q.value = ''
  await refresh()
}

defineOgImageComponent('NuxtSeo', {
  title: 'Test',
  description: 'My Personal Blog',
  theme: '#ff0000',
  colorMode: 'dark',
  renderer: 'chromium'
})
</script>

<template>
	<div class="space-y-6">
		<!-- Search Section -->
		<div class="flex justify-center">
			<div class="w-full max-w-md">
				<SearchInput
					v-model="q"
					placeholder="جستجوی پست‌ها..."
					size="lg"
					@search="handleSearch"
					@clear="handleClearSearch"
				/>
			</div>
		</div>

		<!-- Posts Grid -->
		<div v-if="posts?.results?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<ULink v-for="post in posts.results" :key="post.id" :to="`/post/${post.id}`" class="flex flex-col gap-2 group hover:scale-105 transition-transform">
				<div class="w-full h-56 bg-zinc-800 rounded-lg relative">
					<UBadge class="absolute top-2 left-2">{{ timestampToJalali(post.createdAt) }}</UBadge>
				</div>
				<div class="text-xl group-hover:text-primary-500 transition-colors">{{ post.title }}</div>
				<p class="text-gray-600 dark:text-gray-400">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و</p>
				<!-- <MDC :value="post.content" class="w-full prose dark:prose-invert" tag="article" /> -->
				<USeparator />
			</ULink>
		</div>

		<!-- No Results Message -->
		<div v-else-if="q" class="text-center py-8">
			<p class="text-gray-500">هیچ پستی با عبارت "{{ q }}" یافت نشد.</p>
		</div>

		<!-- Empty State -->
		<div v-else-if="!posts?.results?.length" class="text-center py-8">
			<p class="text-gray-500">هنوز پستی منتشر نشده است.</p>
		</div>
	</div>
</template>
