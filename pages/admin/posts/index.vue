<script setup>
definePageMeta({
  middleware: 'auth'
})

const toast = useToast()

const q = ref('')
const {data:posts, refresh} = await useFetch('/api/posts', {
  query: { q },
  key: 'admin-posts'
})

// Watch for changes in search query and refresh automatically
watch(q, async () => {
  await refresh()
})

const columns = [
	{
		accessorKey:'id',
		header:'ID',
		cell:({row}) => row.getValue('id'),
	},
	{
		accessorKey:'title',
		header:'عنوان',
		cell:({row}) => row.getValue('title'),
	},
	{
		accessorKey:'createdAt',
		header:'تاریخ ایجاد',
		cell:({row}) => row.getValue('createdAt'),
	},
	{
    	id: 'action'
  	}
]

const handleSearch = async () => {
	await refresh()
}

const handleClearSearch = async () => {
	q.value = ''
	await refresh()
}

const deletePost = async (id) => {
	const { error } = await useFetch(`/api/posts/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (error.value) {
		toast.add({ title: 'خطا', description: 'خطا در حذف پست', color: 'error' })
		return
	}
	toast.add({ title: 'انجام شد.', description: 'پست با موفقیت حذف شد.', color: 'success' })
	await refresh()
}

</script>

<template>
	<div>
		<UCard>
			<div class="flex gap-4 items-center justify-between">
				<div>
					<UButton size="xl" to="/admin/posts/new">پست جدید</UButton>
				</div>

				<div class="w-full max-w-md">
					<SearchInput
						v-model="q"
						placeholder="جستجوی پست‌ها..."
						:debounce-ms="0"
						@search="handleSearch"
						@clear="handleClearSearch"
					/>
				</div>
			</div>

			<UTable :data="posts.results" :columns="columns" class="flex-1">
				<template #action-cell="{ row }">
					<div class="flex gap-2">
						<UButton :to="`/admin/posts/${row.original.id}`">ویرایش</UButton>
						<UButton color="error" @click="deletePost(row.original.id)">حذف</UButton>
					</div>
				</template>
			</UTable>
		</UCard>
	</div>
</template>
