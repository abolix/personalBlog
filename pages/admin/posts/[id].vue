<script setup>
const route = useRoute()
const { id } = route.params

definePageMeta({
    validate: async (route) => {
        const { id } = route.params;
		if (id === 'new') return true;
        if (isNaN(id)) return false;
		return true;
	},
})

const state = reactive({
	title: undefined,
	content: undefined,
	password: undefined
})

const validate = (state) => {
	const errors = []
	if (!state.title) errors.push({ name: 'title', message: 'الزامی است.' })
	if (!state.password) errors.push({ name: 'password', message: 'الزامی است.' })
	return errors
}

async function onSubmit(event) {
	toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
	console.log(event.data)
}


</script>

<template>
	<div>
		<UCard class="w-full">
			<UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="عنوان" name="title">
				<UInput v-model="state.title" size="xl" />
			</UFormField>
			
			<UFormField label="پسورد" name="password">
				<UInput v-model="state.password" size="xl" type="password"/>
			</UFormField>
			
			<TiptapEditor/>

			<UButton type="submit" size="xl" block>
				ثبت
			</UButton>
			</UForm>
		</UCard>
	</div>
</template>