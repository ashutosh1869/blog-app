import { Client, Account, ID } from "appwrite";
import Conf from "../conf/Conf";
export class AuthService {

    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(Conf.appwriteurl) 
                    .setProject(Conf.appwriteProjectId)
        this.account= new Account(this.client);
    }

    async createAccount(data){
        const {email,password,name} = data;
        console.log(email,password);
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            console.log(userAccount);
            if(userAccount)
                // a method 
            
                return true;
            else 
                 return userAccount;

        } catch (error) {
            throw error;
        }
    }
    async login({email,password}){
        console.log(email,password);
        
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
        
    }
    async getCurrentUser(){
        try {
            const currentUser = await this.account.get();

        if (!currentUser) {
            console.log("No authenticated user found.");
            return null;  // Return null if no user is logged in
        }

        return currentUser;
        } catch (error) {
            console.log("AuthService::getCurrentUser::error", error);
        }
    }
    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}

const authservice = new AuthService();

export default authservice