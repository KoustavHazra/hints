Hints is a blog app.

Current version: 0.1

Last updated on: 3rd April, 2024


CURRENT ISSUES TO FIX ::

// featuredImage --- src={service.getFilePreview(post.featuredImage)} ? why sending post.featuredImage .. in getFilePreview we need id..

// Select for showing status is not working  -- select is not working

edit post issue
// edit post not working also automatically deleting the existing post.
// Appwrite service :: getPost error :: AppwriteException: Invalid `documentId` param: UID must contain at most 36 chars. Valid chars are a-z, A-Z, 0-9, and underscore. Can't start with a leading underscore

log while uploading post image
// show log that without uploading any image, blog cannot be submitted.

uploading post issue ----
// POST https://cloud.appwrite.io/v1/databases/660508d44cbf48e52cdd/collections/660508fd50d6fbf71477/documents 400 (Bad Request)
// Appwrite service :: createPost error :: AppwriteException: Invalid document structure: Attribute "content" has invalid type. Value must be a valid string and no longer than 255 chars
// Uncaught TypeError: Right-hand side of 'instanceof' is not an object
// blogs are getting stored in appwrite, but while page switching blog is automatically getting deleted.

Home page issue
// even though there are posts available in all posts page, it is now showing in home page.
