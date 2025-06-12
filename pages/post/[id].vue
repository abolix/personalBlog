<script setup>
const route = useRoute()
const { id } = route.params
const toast = useToast()

definePageMeta({
    validate: async (route) => {
        const { id } = route.params;
        if (isNaN(id)) return false;
		return true;
	},
})
</script>


<template>
	<div>123</div>
</template>