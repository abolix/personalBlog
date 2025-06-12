import { defineSitemapEventHandler } from "#imports";

export default defineSitemapEventHandler(async (event) => {
	const posts = await useDrizzle()
		.select()
		.from(tables.posts)
		.all();

	// Map the posts to the desired format
	const urls = posts.map((post) => ({
		loc: `/posts/${post.id}`,
		lastmod: post.updated_at,
		changefreq: 'daily',
		priority: 0.8,
	}));

	return urls;
})