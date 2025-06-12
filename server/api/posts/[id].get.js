export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id')

	if (!id) {
		setResponseStatus(event, 404)
		return {
			status: 400,
			body: 'Missing id',
		}
	}

	const post = await useDrizzle()
		.select()
		.from(tables.posts)
		.where(eq(tables.posts.id, id))
		.all()


	if (post.length === 0) {
		setResponseStatus(event, 404)
		return {
			status: 404,
			body: 'Post not found',
		}
	}
	return post[0]

});