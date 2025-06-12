import { z } from 'zod'

const userSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
})

export default defineEventHandler(async (event) => {
	const result = await readValidatedBody(event, body => userSchema.safeParse(body)) // or `.parse` to directly throw an error

	if (!result.success) {
		setResponseStatus(event, 400)
		return {
			status: 400,
			body: result.error.issues,
		}
	}

	// check database to see if user exists
	const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, result.data.email)).get()
	if (!user) {
		throw createError({
			statusCode: 400,
			statusMessage: 'کاربر یافت نشد.',
		})
	}

	if (!(await verifyPassword(user.password, result.data.password))) {
		throw createError({
			statusCode: 400,
			statusMessage: 'نام کاربری یا پسورد صحیح نیست',
		})
	}

	await setUserSession(event, {
		user: {
			id: user.id,
		},
		loggedInAt: new Date(),
	})


	// User object is validated and typed!
	return result.data
})