import { z } from 'zod'

const postSchema = z.object({
	title: z.string().min(3),
	content: z.string().min(1),
})

export default defineEventHandler(async (event) => {
	const { user } = await requireUserSession(event)

	
	const result = await readValidatedBody(event, body => postSchema.safeParse(body))
	
	if (!result.success) {
		// throw result.error.issues
		return {
			status: 400,
			body: result.error.issues,
		}
	}

	const { title, content } = result.data
	const post = await useDrizzle().insert(tables.posts).values({
		title,
		content,
		userId: 1,
		createdAt: new Date(),
	}).returning().get()

	return post

});