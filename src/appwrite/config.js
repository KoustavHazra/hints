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
    async getPosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", ["active"])
                ]
            )

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
    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`Appwrite service :: getFilePreview error :: ${error}`);
            return false;
        }
    };
};


const service = new Service();

export default service;