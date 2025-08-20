<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
	<div>
		<UButton size="xl" to="/admin/posts/">پست ها</UButton>
	</div>
</template>
