import { Client, ID, Databases, Query, Storage } from "appwrite";
import Conf from "../conf/Conf";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(Conf.appwriteurl)
            .setProject(Conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug + "-" + ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service:: create Post:: error", error);
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service:: update Post:: error", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service:: delete Post:: error", error);
        }
    }
    async getDocument(slug) {
        try {
            return await this.databases.getDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service:: delete Post:: error", error);
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                queries,

            )
        } catch (error) {
            console.log("Appwrite service::  Posts:: error", error);
        }
    }
    // file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                Conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service:: upload file:: error", error);
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                Conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service:: delete file:: error", error);
        }
    }
   getFilePreview(fileId) {
    if (!fileId) return "";

    try {
        // In latest Appwrite SDK, this already returns a URL string
        return this.bucket.getFileView(
            Conf.appwriteBucketId,
            fileId
        );
    } catch (error) {
        console.error("Error fetching file preview:", error);
        return "";
    }
}



}
const appwriteService = new Service();
export default appwriteService;