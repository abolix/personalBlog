<script setup>
const {fetch} = useUserSession()

const toast = useToast()

const state = reactive({
	email: undefined,
	password: undefined
})

const validate = (state) => {
	const errors = []
	if (!state.email) errors.push({ name: 'email', message: 'الزامی است.' })
	if (!state.password) errors.push({ name: 'password', message: 'الزامی است.' })
	return errors
}

async function onSubmit(event) {
const {data,error} = await useFetch('/api/auth/login', {
		method: 'POST',
		body: {
		email: state.email,
		password: state.password
	}
})
	if (data.value) {
		toast.add({ title: 'سلام', description: 'شما با موفقیت وارد شدید.', color: 'success' })
		await fetch()
		await navigateTo('/admin/dashboard')
	}

	if (error.value) {
		toast.add({ title: 'خطا', description: error.value.data.message, color: 'error' })
	}
}
</script>

<template>
  <UCard class="w-full">
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="ایمیل" name="email">
        <UInput v-model="state.email" size="xl" trailing-icon="i-ph-at" />
      </UFormField>

      <UFormField label="پسورد" name="password">
        <UInput v-model="state.password" size="xl" type="password" trailing-icon="i-ph-password" />
      </UFormField>

      <UButton type="submit">
        ورود
      </UButton>
    </UForm>
  </UCard>
</template>
