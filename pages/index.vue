<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const {data:posts} = await useFetch('/api/posts')
defineOgImageComponent('NuxtSeo', {
  title: 'Test',
  description: 'My Personal Blog',
  theme: '#ff0000',
  colorMode: 'dark',
  renderer: 'chromium'

})
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<div v-for="post in posts.results" :key="post.id" class="flex flex-col gap-2">
			<div class="w-full h-56 bg-zinc-800 rounded-lg relative">
				<UBadge class="absolute top-2 left-2">{{ timestampToJalali(post.createdAt) }}</UBadge>
			</div>
			<div class="text-xl">{{ post.title }}</div>
			<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و</p>
			<!-- <MDC :value="post.content" class="w-full prose dark:prose-invert" tag="article" /> -->
			<USeparator />
		</div>
			
		<!-- <p>Logged in since {{ session.loggedInAt }}</p>

		<button @click="clear">Logout</button> -->


	</div>
</template>