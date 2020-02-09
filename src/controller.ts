import {
  addDatabaseUser,
  deleteDatabaseUser,
  getDatabaseUsers,
  updateDatabaseUser
} from "./repository";
import { IAPIResponse } from "./types";

export async function getUsers(): Promise<IAPIResponse> {
  try {
    const users = await getDatabaseUsers();
    return { status: 200, message: JSON.stringify(users) };
  } catch (err) {
    console.error(err);
    return { status: 501, message: "Failed to get users." };
  }
}

export async function addUser(
  username: string,
  password: string
): Promise<IAPIResponse> {
  try {
    if (!username || !password) {
      return {
        status: 400,
        message: "You must provide username and password!"
      };
    }

    await addDatabaseUser(username, password);
    return { status: 201, message: "User creation successful." };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "User creation failed." };
  }
}

export async function updateUser(
  username: string,
  password: string,
  newPassword: string
): Promise<IAPIResponse> {
  try {
    if (!username || !password || !newPassword) {
      return {
        status: 400,
        message: "You must provide username, password and newPassword!"
      };
    }

    const users = await getDatabaseUsers();
    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
      return {
        status: 401,
        message: "Invalid username or password!"
      };
    }

    await updateDatabaseUser(username, newPassword);
    return { status: 200, message: "User update successful." };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "User update failed." };
  }
}

export async function deleteUser(
  username: string,
  password: string
): Promise<IAPIResponse> {
  try {
    const users = await getDatabaseUsers();
    const user = users.find(u => u.username === username);

    if (!user || user.password !== password) {
      return {
        status: 401,
        message: "Invalid username or password!"
      };
    }

    await deleteDatabaseUser(username);
    return { status: 200, message: "User deletion successful." };
  } catch (err) {
    console.error(err);
    return { status: 501, message: "User deletion failed." };
  }
}
