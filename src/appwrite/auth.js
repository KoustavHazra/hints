import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    };

    // signup code
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call anohther method - login -- so if user has successfully signed up,
                // login will also be done
                return this.login({email, password});

            } else {
                return userAccount;
            }
        } catch (error) {
            console.log(`Error creating account: ${error.message}`);
            throw error;
        }
    }

    // login code
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(`Error logging in: ${error.message}`);
            throw error;
        }
    }

    // get user details code
    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            console.log(`Error getting current user: ${error.message}`);
            throw error;
        }

        // return null;
    };

    // logout code
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(`Error logging out: ${error.message}`);
            throw error;
        }
    };
};

const authService = new AuthService();

export default authService;


/*

AUTH SERVICE CODE:

we wrote this in this manner, because later on if we want to remove appwrite 
backend features and use another service instead, then we just have to modify 
only one file, and our entire backend system will work properly.

Otherwise, if we would be using appwrite code everywhere, and we want to
change it later, we have to change the services code in every single file, 
which takes a lot of time.

-----------------------------
Also we created the new Object, authService.. so that when we are using it,
we do not need to create a new object everytime while using this service class.
We can directly call this authService object and becuase it is creating the
new Class AuthService in it.. so we can directly use all the properties and
methods of AuthService through it.

-----------------------------
We defined the constructor because, we don't want to use it in the class.
We want to use it when the Object authService is created, then only it should
run this part... 
this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

Otherwise it will be a waste of resource as it is created by default, even though
there isn't any user created.

And as constructor onmy runs when a new object is created, it will run at that time
of creating an object.. the values like conf.appwriteUrl and conf.appwriteProjectId
will be fetched at that time and based on those values, a new Client will be created.

And based on the new Client, a new Account will be created.

-----------------------------
For the createAccount code, we again used our own code.. basically we wrapped the
appwrite codes within our code.. so that if we move out from appwrite, we can easily
change this appwrite methods.

Now to create a new user in appwrite, the first param has to be a unique Id, so it is 
passed as the first param.. and email and passwrod ( as they has to be the second and
    third param). Also after creating account, we are directly calling login(),
so that the user's login get done automatically.

Similary for login, logout, getCurrentUser.. we wrapped the appwrite code within
our code -- so that it becomes easy to switch.

-----------------------------

*/