<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()


</script>

<template>
	<div>
		<!-- {{ loggedIn }}
		<p>Logged in since {{ session.loggedInAt }}</p>

		<button @click="clear">Logout</button> -->

		<div class="flex gap-4">
			<!-- <div class="w-full h-24 bg-primary-500 rounded shadow-lg shadow-primary-600/20">1</div> -->
		</div>


	</div>
</template>