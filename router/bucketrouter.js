const express=require("express");
const bucketRouters=express.Router();
const bucketControllers=require('../controller/bucketcontroller.js')
bucketRouters.get('/getbucket/:userId',bucketControllers.getBucketById);
bucketRouters.post('/postbucket',bucketControllers.createBucket);
bucketRouters.put('/putbucket/:userId',bucketControllers.updateBucketById);
bucketRouters.delete('/deletebucket/:userId',bucketControllers.deleteBucketById);
module.exports=bucketRouters;