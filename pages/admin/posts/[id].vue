<script setup>
const route = useRoute()
const { id } = route.params
const toast = useToast()

definePageMeta({
    validate: async (route) => {
        const { id } = route.params;
		if (id === 'new') return true;
        if (isNaN(id)) return false;
		return true;
	},
})

const showPreview = ref(false)

const state = reactive({
	title: undefined,
	content: undefined,
})

const { data: post } = await useFetch(`/api/posts/${id}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})
if (post.value) {
	state.title = post.value.title
	state.content = post.value.content
}

const validate = (state) => {
	const errors = []
	if (!state.title) errors.push({ name: 'title', message: 'الزامی است.' })
	return errors
}

async function onSubmit(event) {

	const method = id === 'new' ? 'POST' : 'PUT'
	const url = id === 'new' ? '/api/posts' : `/api/posts/${id}`
	const { data, error } = await useFetch(url, {
		method,
		body: state,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (error.value) {
		toast.add({ title: 'خطا', description: 'خطا در ارسال اطلاعات', color: 'error' })
		return
	}
	toast.add({ title: 'انجام شد.', description: 'اطلاعات با موفقیت ارسال شد.', color: 'success' })
	if (id === 'new') {
		state.title = ''
		state.content = ''
	} else {
		await navigateTo(`/admin/posts/${data.value.id}`)
	}


	toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
	console.log(event.data)
}

const submitText = computed(() => {
	if (id === 'new') return 'ایجاد'
	return 'ویرایش'
})


</script>

<template>
	<div>
		<UCard class="w-full">
			<UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
			<UFormField label="عنوان" name="title">
				<UInput v-model="state.title" size="xl" class="w-full"/>
			</UFormField>
			<USwitch v-model="showPreview" label="پیش نمایش" />
			<div class="flex gap-4">
				<UCard v-if="showPreview" class="w-full">
					<MDC :value="state.content" class="w-full prose dark:prose-invert" tag="article" />
				</UCard>
				<UFormField v-else label="محتوا" name="content" class="w-full">
					<UTextarea v-model="state.content" size="lg" :rows="12" class="w-full"/>
				</UFormField>
			</div>

			

			<UButton type="submit" size="xl" block>
				{{ submitText }}
			</UButton>
			</UForm>
		</UCard>
	</div>
</template>