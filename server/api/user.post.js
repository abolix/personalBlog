export default defineEventHandler(async (event) => {
	const { email, password } = event.body;
	const user = await User.create({ email, password });
	return { user };
});