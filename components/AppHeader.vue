<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()




</script>


<template>
	<header class="fixed w-full top-0 z-10 bg-neutral-900 border-b border-neutral-800 py-2">
		<div class="container mx-auto flex justify-between items-center">

			<ULink to="/" class="flex items-center gap-4 text-white">
				<div class="flex bg-primary-500 w-10 h-10 items-center justify-center rounded-full">
					<div class="text-neutral-900 text-7xl font-bold relative top-2">A</div>
				</div>
				<div>
					بلاگ شخصی
				</div>
			</ULink>

			<div v-if="loggedIn" class="flex gap-2">
				<UButton to="/admin/dashboard">پنل مدیریت</UButton>
				<UButton color="error" @click="clear()">خروج</UButton>
			</div>
			<div v-else>
				<UButton to="/admin/auth">ورود</UButton>
			</div>

		</div>
	</header>
</template>

<style scoped>

</style>
