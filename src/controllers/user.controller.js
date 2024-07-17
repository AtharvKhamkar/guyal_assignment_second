import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../models/user.model.js";

export const getAllUsers = (req, res) => {
    const users = readData();
    if (users.length === 0) {
        return res.status(404).json({error:"No user found"})
    };

    res.status(200).json({ users });
}

export const createUser = (req, res) => {
    const users = readData();
    const { userName, email } = req.body;

    const newUser = {
        id: uuidv4(),
        userName,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }

    users.push(newUser);
    writeData(users);
    res.status(200).json(newUser)
}

export const getSpecificUser = (req, res) => {
    const users = readData();
    const userId = req.params.id;

    const fetchedUser = users.find(user => user.id === userId);
    if (!fetchedUser) {
        return res.status(404).json({ error: "User doesn't exists" });
    }

    res.status(200).json(fetchedUser);
}

export const updateUser = (req, res) => {
    const users = readData();
    const userId = req.params.id;
    const updatedUserName = req?.body?.userName;
    const updatedEmail = req?.body?.email;

    
    let userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User doesn't exists" });
    }

    let updatedUser = users[userIndex];

    updatedUser = {
        ...users[userIndex],
        userName: updatedUserName || users[userIndex].userName,
        email: updatedEmail || users[userIndex].email,
        updated_at:new Date().toISOString()
    }

    users[userIndex] = updatedUser;
    writeData(users);

    res.status(200).json({ updatedUser });

}


export const deleteUser = (req, res) => {
    const users = readData();
    const userId = req.params.id;

    const userIndex = users.findIndex(users => users.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({error:"User doesn't exists"})
    }

    users.splice(userIndex, 1);
    writeData(users);

    res.status(200).json({message:"user deleted successfully"})
}