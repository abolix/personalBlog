import { z } from 'zod'

const userSchema = z.object({
	// email: z.string().email(),
	// password: z.string().min(1),
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
})
.refine(data => data.password === data.confirmPassword, {
	message: 'Passwords do not match',
	path: ['confirmPassword'],
});

export default defineEventHandler(async (event) => {
	const result = await readValidatedBody(event, body => userSchema.safeParse(body)) // or `.parse` to directly throw an error

	if (!result.success) {
		// throw result.error.issues
		return {
			status: 400,
			body: result.error.issues,
		}
	}

	// check database to see if user exists
	const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, result.data.email)).get()
	if (!user) {
		return {
			status: 401,
			body: 'User not found',
		}
	}

	const userRegister = await useDrizzle().insert(tables.users).values({
		name:'Abolfazl',
		email,
		password: await hashPassword(password),
		createdAt: new Date(),
	}).returning().get()

	await setUserSession(event, {
		user: {
			id: user.id,
		},
		loggedInAt: new Date(),
	})


	// User object is validated and typed!
	return result.data
})