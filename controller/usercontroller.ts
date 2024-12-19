import { Request, Response } from "express";
import con from "../config/db";
import response from "../common/response";
// interface response{
//   statuscode:number,
//   message:string,
//   result?:any[]
// }
async function login(req: Request, res: Response): Promise<any> {
  const { email, password }: { email: string, password: string } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query: string = 'SELECT * FROM users WHERE user_email = $1 AND user_password = $2';

  try {
    const result = await con.query(query, [email, password]);
    const user = result.rows[0];

    if (!user) {
      return  res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: {
        id: user.user_id,
        email: user.user_email
      }
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
}
async function createUser(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(response(400, "Email and password are required", []));
  }

  const insertQuery = 'INSERT INTO users (user_email, user_password) VALUES ($1, $2)';

  try {
    await con.query(insertQuery, [email, password]);
    return res
      .status(201)
      .json(response(201, "User created successfully", []));
  } catch (err: any) {
       return res.status(500)
      .json(response(500, `${err.Message} error occurred while creating the user`, []));
  }
}
async function deleteUserById(req:Request, res:Response):Promise<any> {
  const userId:number = parseInt(req.params.userId as string);
  const deleteQuery:string = "DELETE FROM users WHERE user_id = $1";
  try {
    const result = await con.query(deleteQuery, [userId, ]);
    if (result.rowCount === 0) {
      return res.status(404).json(response(404, "Task not found for the given bucket ID and Task ID.", []));
    }
    return res.status(200).json(response(200, "Task deleted successfully", []));
  } catch (err:any) {
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Task`, []));
  }
}


export { login,createUser,deleteUserById };
