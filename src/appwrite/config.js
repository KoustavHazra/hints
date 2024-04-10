import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    };

    // create a post
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    userName  // to show who has created the post
                }
            )
        } catch (error) {
            console.log(`Appwrite service :: createPost error :: ${error}`);
        }
    };

    // update a post
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log(`Appwrite service :: updatePost error :: ${error}`);   
        }
    };

    // delete a post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(`Appwrite service :: deletePost error :: ${error}`);
            return false;
        }
    };

    // get a single document
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(`Appwrite service :: getPost error :: ${error}`);
            return false;   
        }
    };

    // get all documents - but only need those posts where status is active
    // so only when the method is called, no arguments were passed. It automatically
    // by itself gets those posts where the status is active.
    // the queries in params, are passed by us and not by any user who calls this method.
    async getPosts() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                []
            );
    
            if (response.documents && response.documents.length > 0) {
                // Filter the documents to include only those with status "active"
                const activePosts = response.documents.filter(post => post.status === "active");
                return activePosts;
                
            } else {
                console.log("No active posts found.");
                return [];
            }

        } catch (error) {
            console.log(`Appwrite service :: getPosts error :: ${error}`);
            return false;
        }
    };

    // upload file
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(`Appwrite service :: uploadFile error :: ${error}`);
            return false;
        }
    };

    // delete file
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log(`Appwrite service :: deleteFile error :: ${error}`);
            return false;
        }
    };

    // get a preview of the file
    getFilePreview(fileId) {
        if (!fileId) {
            throw new Error("Missing required parameter: fileId");
        }
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    };
};


const service = new Service();

export default service;