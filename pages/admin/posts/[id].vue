<script setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const route = useRoute()
const { id } = route.params
const toast = useToast()
const colorMode = useColorMode()


definePageMeta({
    middleware: 'auth',
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

async function onSubmit(_event) {

	const method = id === 'new' ? 'POST' : 'PUT'
	const url = id === 'new' ? '/api/posts' : `/api/posts/${id}`
	const { error } = await useFetch(url, {
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
	await navigateTo('/admin/posts/')
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
			<div class="flex gap-4">
				<UFormGroup label="محتوا" name="content" class="w-full">
					<MdEditor v-model="state.content" :theme="colorMode.value" language="en-US"/>
				</UFormGroup>

			</div>



			<UButton type="submit" size="xl" block>
				{{ submitText }}
			</UButton>
			</UForm>
		</UCard>
	</div>
</template>
