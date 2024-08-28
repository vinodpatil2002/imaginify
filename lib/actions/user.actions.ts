"use server"

import { json } from "stream/consumers";
import { User } from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";


// CREATE user
export async function createUser(user: CreateUserParams){
    try{
        await connectToDatabase();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        return handleError(error);
    }
}

// READ user
export async function readUser(userId: string){
    try{
        await connectToDatabase();
        const user = await User.findOne({clerkId: userId});

        if(!user){
            throw new Error("User not found");
        }
    }catch(error){
        return handleError(error);
    }
}

// UPDATE user
export async function updateUser(userId: string, user: UpdateUserParams){
    try{
        await connectToDatabase();
        const updatedUser = await User.findOneAndUpdate({clerk Id: userId}, user, {new: true});
        if (!updatedUser){
            throw new Error("User not found");
        }
        return JSON.parse(JSON.stringify(updatedUser));
    }catch(error){
        return handleError(error);
    }
}

// DELETE user
export async function deleteUser(userId: string){
    try{
        await connectToDatabase();
        const userToDelete = await User.findOne({clerkId: userId});
        if(!userToDelete){
            throw new Error("User not found");
        }

        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch(error){
        return handleError(error);
    }
}

