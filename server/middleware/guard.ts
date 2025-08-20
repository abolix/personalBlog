export default defineEventHandler(async (event) => {
	// get the url being called
	const url = getRequestURL(event);
	// get the pathname from the url
	const { pathname } = new URL(url);
	// create a list of endpoints that we want to protect
	const protectedRoutes = [
		"/api/users",
		"/api/posts", // Protect all POST, PUT, DELETE operations on posts
		"/api/admin"
	];
	
	// Check if this is a modification request (POST, PUT, DELETE) to posts
	const method = getMethod(event);
	const isModificationRequest = ['POST', 'PUT', 'DELETE'].includes(method);
	
	// check if the pathname is in the list of protected routes
	for (let i = 0; i < protectedRoutes.length; i++) {
		const r = protectedRoutes[i];
		// if the pathname starts with protected route and it's a modification request
		if (pathname.startsWith(r) && (r !== "/api/posts" || isModificationRequest)) {
			// ensure user is logged in before getting a response
			await requireUserSession(event);
		}
	}
});