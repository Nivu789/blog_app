import { Client, Account ,ID } from "appwrite";
import config from "../config/config";

class DatabaseService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,content,featured_image,status}){
        try {
            await this.databases.createDocument(config.databaseId,config.collectionId,ID.unique(),{
                title,
                content,
                featured_image,
                status
            })
        } catch (error) {
            throw error
        }
    }

    async updatePost({title,content,featured_image,status}){
        try {
            await this.databases.updateDocument(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                ID.unique(), // to be checked later
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

    async getPost(){
        try {
            await this.databases.getDocument(
                config.databaseId, // databaseId
                config.collectionId, // collectionId
                ID.unique(), // to be checked
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
}

export default new DatabaseService()