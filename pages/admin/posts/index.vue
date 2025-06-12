<script setup>
const toast = useToast()

const {data:posts,refresh} = await useFetch('/api/posts')
const q = ref('')

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

const searchPost = async () => {
	const { data } = await useFetch(`/api/posts?q=${q.value}`)
	if (data.value) {
		posts.value = data.value
	}
}

const deletePost = async (id) => {
	const { data, error } = await useFetch(`/api/posts/${id}`, {
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
			<div class="flex gap-4 items-center">
				<div>
					<UButton size="xl" to="/admin/posts/new">پست جدید</UButton>
				</div>
				
				<div>
					<UButtonGroup>

						<UInput v-model="q" icon="i-lucide-search" size="md" variant="outline" placeholder="جستجو پست"/>
							
							
						<UButton>جستجو</UButton>
					</UButtonGroup>
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