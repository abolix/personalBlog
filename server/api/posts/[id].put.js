export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id')

	if (!id) {
		setResponseStatus(event, 404)
		return {
			status: 400,
			body: 'Missing id',
		}
	}
	const { user } = await requireUserSession(event)
	const { title, content } = await readBody(event)
	if (!title || !content) {
		setResponseStatus(event, 400)
		return {
			status: 400,
			body: 'Missing title or content',
		}
	}
	const post = await useDrizzle()
		.update(tables.posts)
		.set({
			title,
			content,
			updatedAt: new Date(),
		})
		.where(eq(tables.posts.id, id))
		.returning()
		.get()
	
	if (!post) {
		setResponseStatus(event, 404)
		return {
			status: 404,
			body: 'Post not found',
		}
	}
	return post
})