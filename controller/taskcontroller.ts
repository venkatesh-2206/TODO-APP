import con from "../config/db"
import response from "../common/response";
import {Request,Response} from "express";
export interface apiResponse {
  statuscode: number,
  message: string,
  result?: any[]
}

async function getTaskById(req: Request, res: Response): Promise<any> {
  const bucketId: number = parseInt(req.params.bucketId as string);
  const getQuery: string = "SELECT * FROM task WHERE bucket_id=$1";
  
  try {
    const result = await con.query(getQuery, [bucketId]);
    
    if (result.rows.length === 0) {
      const notFoundResponse: apiResponse = {
        statuscode: 404,
        message: "Bucket not found",
        result: []
      };
      return notFoundResponse;
    }

    const successResponse: apiResponse = {
      statuscode: 200,
      message: "task retrieved successfully",
      result: result.rows
    };
    
    return successResponse;
    
  } catch (err: any) {
    const errorResponse: apiResponse = {
      statuscode: 500,
      message: `${err.message} error occurred while retrieving the Tasks`,
      result: []
    };
    return errorResponse;
  }
}

async function getstatusByTaskName(req:Request, res:Response):Promise<any>{
    const taskName:string = (req.query.taskName as string);
    const getQuery = "SELECT status FROM task WHERE task_name=$1";
  
    try {
      const result = await con.query(getQuery, [taskName]);
  
      if (result.rows.length === 0) {
        return res.status(404).json(response(404, "Task not found", []));
      }
  
      return res.status(200).json(response(200, "Tasks retrieved successfully", result.rows));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while retrieving the Tasks`, []));
    }
  }
async function getTaskByStatus(req:Request, res:Response):Promise<any> {
    const status:string = req.query.status as string;
    const page:number =parseInt(req.query.page as string)||1;
    const pageCount:number=parseInt(req.query.pageCount as string)||2;
    const offset:number=(page-1)*pageCount;
    const getQuery = "SELECT task_name,status FROM task WHERE status=$1 LIMIT $2 OFFSET $3";
  
    try {
      const result = await con.query(getQuery, [status,pageCount,offset]);
      
      if (result.rows.length === 0) {
        return res.status(404).json(response(404, "Task not found", []));
      }
  
      return res.status(200).json(response(200, "Tasks retrieved successfully", result.rows));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while retrieving the Tasks`, []));
    }
  }
  
  
async function createTask(req:Request, res:Response):Promise<any> {
    const { bucketId, task, status }:{ bucketId:number, task:string, status:string } = req.body;
    const insertQuery = "INSERT INTO task (bucket_id, task_name, status) VALUES ($1, $2, $3)";
    try {
      await con.query(insertQuery, [bucketId, task, status]);
      return res.status(201).json(response(201, "Task added successfully", []));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while adding the Task`, []));
    }
  }
  
  async function updateTaskById(req:Request, res:Response):Promise<any> {
    const bucketId:number = parseInt(req.params.bucketId as string);
    const { taskId, task, status }:{taskId:number, task:string, status:string} = req.body;
    const putQuery:string = "UPDATE task SET task = $1, status = $2 WHERE bucket_id = $3 AND task_id=$4";
    try {
      const result = await con.query(putQuery, [task, status, bucketId, taskId]);
      if (result.rowCount === 0) {
        return res.status(404).json(response(404, "Task not found for the given bucket ID.", []));
      }
      return res.status(200).json(response(200, "Task updated successfully", []));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while updating the Task`, []));
    }
  }
  
  async function deleteTaskById(req:Request, res:Response):Promise<any> {
    const bucketId:number = parseInt(req.params.bucketId as string);
    const { taskId }:{taskId:number} = req.body;
    const deleteQuery:string = "DELETE FROM task WHERE bucket_id = $1 AND task_id = $2";
    try {
      const result = await con.query(deleteQuery, [bucketId, taskId]);
      if (result.rowCount === 0) {
        return res.status(404).json(response(404, "Task not found for the given bucket ID and Task ID.", []));
      }
      return res.status(200).json(response(200, "Task deleted successfully", []));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while deleting the Task`, []));
    }
  }
  
  export { getTaskById,getstatusByTaskName,getTaskByStatus, createTask, updateTaskById, deleteTaskById };
  