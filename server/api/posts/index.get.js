export default defineEventHandler(async (event) => {
    // show the posts with pagination and search
    const { page = 1, limit = 10, q = '' } = getQuery(event)
    const offset = (page - 1) * limit

    // Build the query with optional search
    let query = useDrizzle()
        .select()
        .from(tables.posts)
        .limit(limit)
        .offset(offset)

    if (q) {
        query = query.where(sql`(title LIKE ${'%' + q + '%'} COLLATE NOCASE) OR (content LIKE ${'%' + q + '%'} COLLATE NOCASE)`)
    }

    const posts = await query.all()

    // get the total number of posts
    let totalQuery = useDrizzle()
        .select({ count: sql`COUNT(*)` })
        .from(tables.posts)

    if (q) {
        totalQuery = totalQuery.where(sql`(title LIKE ${'%' + q + '%'} COLLATE NOCASE) OR (content LIKE ${'%' + q + '%'} COLLATE NOCASE)`)
    }

    const totalPosts = await totalQuery.all()
    const total = totalPosts[0].count

    const postsWithPagination = {
        results: posts,
        total,
    }

    // return the posts with pagination
    return postsWithPagination
});
