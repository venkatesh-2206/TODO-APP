import con from "../config/db";
import response from "../common/response";
import {Request,Response} from "express";

async function getBucketById(req:Request, res:Response):Promise<any> {
    const userId:number= parseInt(req.params.userId as string);
    const getQuery:string = "SELECT * FROM bucket WHERE user_id=$1";
    try {
      const result = await con.query(getQuery, [userId]);
      if (result.rows.length === 0) {
        return res.status(404).json(response(404, "User not found", []));
      }
      return res.status(200).json(response(200, "Bucket retrieved successfully", result.rows));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while retrieving the Bucket`, []));
    }
  }
  async function getBucketByName(req:Request, res:Response):Promise<any> {
    const bucketName:string= (req.query.bucketName as string)||"";
    const page:number =parseInt(req.query.page as string )||1;
    const pageCount:number=parseInt(req.query.pageCount as string)||2;
    const offset:number=(page-1)*pageCount;
    const getQuery:string = "SELECT bucket.user_id,bucket.bucket_id,bucket.bucket_name,task_name,status FROM bucket join task ON task.bucket_id=bucket.bucket_id WHERE bucket_name=$1 LIMIT $2 OFFSET $3";
    try {
      const result = await con.query(getQuery, [bucketName,pageCount,offset]);
      if (result.rows.length == 0) {
        return res.status(404).json(response(404, "User not found", []));
      }
      return res.status(200).json(response(200, "Bucket retrieved successfully", result.rows));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while retrieving the Bucket`, []));
    }
  }
  
  async function createBucket(req:Request, res:Response):Promise<any> {
    const {userId,bucketName}:{ userId:number, bucketName:string } = req.body;
    const insertQuery:string = "INSERT INTO bucket (user_id, bucket_name) VALUES ($1, $2)";
    try {
      await con.query(insertQuery, [userId, bucketName]);
      return res.status(201).json(response(201, "Bucket added successfully", []));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while adding the Bucket`, []));
    }
  }
  
  async function updateBucketById(req:Request, res:Response):Promise<any> {
    const userId:number = parseInt(req.params.userId);
    const {bucketId,bucketName}:{ bucketId:number, bucketName:string } = req.body;
    const putQuery:string = "UPDATE bucket SET bucketname = $1 WHERE user_id = $2 AND bucket_id = $3";
    try {
      const result = await con.query(putQuery, [bucketName, userId, bucketId]);
      if (result.rowCount === 0) {
        return res.status(404).json(response(404, "Bucket not found for the given user and bucket ID.", []));
      }
      return res.status(200).json(response(200, "Bucket updated successfully", []));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while updating the Bucket`, []));
    }
  }
  
  async function deleteBucketById(req:Request, res:Response):Promise<any> {
    const userId:number = parseInt(req.params.userId as string);
    const {bucketId}:{ bucketId:number } = req.body;
    const deleteQuery:string = "DELETE FROM bucket WHERE user_id = $1 AND bucket_id = $2";
    try {
      const result = await con.query(deleteQuery, [userId, bucketId]);
      if (result.rowCount === 0) {
        return res.status(404).json(response(404, "Bucket not found for the given user and bucket ID.", []));
      }
      return res.status(200).json(response(200, "Bucket deleted successfully", []));
    } catch (err:any) {
      return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
    }
  }
  
export { getBucketById,getBucketByName, createBucket, updateBucketById, deleteBucketById };
  
