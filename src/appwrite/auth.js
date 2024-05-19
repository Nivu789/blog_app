import { Client, Account ,ID, Databases ,Query} from "appwrite";
import config from "../config/config";

class AuthService{
    client = new Client();
    account;
    databases;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.projectId)
        this.account = new Account(this.client)
        this.databases = new Databases(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            console.log(userAccount)
            if(userAccount){
                await this.databases.createDocument(config.databaseId,config.usersCollectionId,userAccount.$id,{
                    email,
                    name,
                    followers:[],
                    following:[],
                    likedPosts:[]
                })
                return true
            }else{
                return false
            }
        } catch (error) {
            throw error
        }
    }

    async loginUser({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }

        return null
    }

    async getDocument(){
        try {
            const userAccount = await this.getCurrentUser()
            console.log(userAccount.$id)
            // return await this.databases.getDocument(config.databaseId,config.usersCollectionId,'664a3d7d002d40cc9499')
            return await this.databases.listDocuments(config.databaseId,config.usersCollectionId,[
                Query.equal('$id', userAccount.$id)
            ])
        } catch (error) {
            throw error
        }
    }

    async updateDocument(docId,newLikedPosts){
        try {
            await this.databases.updateDocument(config.databaseId,config.usersCollectionId,docId,{
                likedPosts:newLikedPosts
            })
        } catch (error) {
            throw error
        }
    }

    async logoutUser(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

export default new AuthService()