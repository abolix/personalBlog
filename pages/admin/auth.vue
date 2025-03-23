<script setup>
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
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
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