import { Inngest } from "inngest";
import {User} from '../models/user.js'

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });


//  new inngest function to create user:
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk", 
    triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    const {id,first_name,last_name,email_addresses,image_url} = event.data;
    const userData={
        _id=id,
        name=first_name + ' ' +last_name,
        email=email_addresses[0].email_address,
        image=image_url
    }
    await User.create(userData);
  },
);

//  new inngest function to delete user:
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk", 
    triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    const {id} = event.data;
    
    await User.findByIdAndDelete(id);
  },
);

//  new inngest function to update user data in our DB:
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk", 
    triggers: [{ event: "clerk/user.Updated" }] },
  async ({ event }) => {
    const {id,first_name,last_name,email_addresses,image_url} = event.data;
    const userData={
        _id=id,
        name=first_name + ' ' +last_name,
        email=email_addresses[0].email_address,
        image=image_url
    }
    await User.findByIdAndUpdate(id,userData);
  },
);

// Add the function to the exported array:
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
];
