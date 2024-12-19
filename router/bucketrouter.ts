import express from "express";
const bucketRouters = express.Router();
import { getBucketById,getBucketByName, createBucket, updateBucketById, deleteBucketById } from "../controller/bucketcontroller";
bucketRouters.get('/getbucket/:userId', getBucketById);
bucketRouters.get('/getbucketbyname',getBucketByName);
bucketRouters.post('/createbucket',createBucket);
bucketRouters.put('/updatebucket/:userId',updateBucketById);
bucketRouters.delete('/deletebucket/:userId',deleteBucketById);
export default bucketRouters;