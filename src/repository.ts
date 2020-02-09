import mysql from "mysql";
import config from "./config";
import { IUser } from "./types";
const pool = mysql.createPool(config.mysql);

export function getDatabaseUsers(): Promise<IUser[]> {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

export function addDatabaseUser(
  username: string,
  password: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`,
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
}

export function updateDatabaseUser(
  username: string,
  newPassword: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET password = '${newPassword}' WHERE username = '${username}'`,
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
}

export function deleteDatabaseUser(username: string): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM users WHERE username = '${username}'`,
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      }
    );
  });
}
