import { Client, ID, Databases , Storage ,Query} from "appwrite";
import config from "../config/config";

class DatabaseService{
    client;
    databases;
    storage;

    constructor(){ 
        this.client = new Client()
        this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,content,featured_image,status,userId}){
        try {
            await this.databases.createDocument(config.databaseId,config.collectionId,ID.unique(),{
                title,
                content,
                featured_image,
                status,
                userId
            })
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featured_image,status}){
        try {
            await this.databases.updateDocument(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                slug, // to be checked later
                {title,content,featured_image,status}
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(){
        try {
            await this.databases.deleteDocument(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                ID.unique(), // to be checked
            );
            return true
        } catch (error) {
            throw error
        }
    }

    async getPost(slug){
        try {
           return await this.databases.getDocument(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                slug, // to be checked
            );
        } catch (error) {
            throw error
        }
    }

    async getAllPosts(){
        try {
            await this.databases.listDocuments(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                [Query.equal("status", true)] // queries 
            );
        } catch (error) {
            throw error
        }
    }

    async createFile(file){
        try {
            await this.storage.createFile(
                config.bucketId, // bucketId
                ID.unique(),
                file // fileId
            );
        } catch (error) {
            throw error
        }
    }

    async uploadFile(file){
        try {
            this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.bucketId, // bucketId
                fileId // fileId
            );
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileId){
        try {
            this.storage.getFilePreview(
                config.bucketId,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
}

export default new DatabaseService()