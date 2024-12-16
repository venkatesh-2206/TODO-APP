const con = require("../config/db.js");
const response = require("../common/response.js");

function getBucketById(req, res) {
  const userId = req.params.userId;
  const getQuery = "SELECT * FROM bucket WHERE user_id=$1";
  try{
    con.query(getQuery, [userId], function (err, result) {
    if (err) {
      return res.status(500).json(response(500, `${err.message} error occurred while retrieving the Bucket`, []));
    }
    if (result.rows.length == 0) {
      return res.status(404).json(response(404, "User not found", []));
    }
    return res.status(200).json(response(200, "Bucket retrieved successfully", result.rows));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}

function createBucket(req, res) {
  const { userId, bucket } = req.body;
  const insertQuery = "INSERT INTO bucket (user_id, bucket) VALUES ($1, $2)";
  try{
    con.query(insertQuery, [userId, bucket], function (err, result) {
    if (err) {
      return res.status(500).json(response(500, `${err.message} error occurred while adding the Bucket`, []));
    }
    return res.status(201).json(response(201, "Bucket added successfully", []));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}

function updateBucketById(req, res) {
  const userId = req.params.userId;
  const { bucketId, bucket } = req.body;
  const putQuery = "UPDATE bucket SET bucket = $1 WHERE user_id = $2 AND bucket_id = $3";
  try{
    con.query(putQuery, [bucket, userId, bucketId], function (err, result) {
    if (err) {
      return res.status(500).json(response(500, `${err.message} error occurred while updating the Bucket`, []));
    }
    if (result.rowCount === 0) {
      return res.status(404).json(response(404, "Bucket not found for the given user and bucket ID.", []));
    }
    return res.status(200).json(response(200, "Bucket updated successfully", []));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}
function deleteBucketById(req, res) {
  const userId = req.params.userId;
  const { bucketId } = req.body;
  const deleteQuery = "DELETE FROM bucket WHERE user_id = $1 AND bucket_id = $2";
  try{
    con.query(deleteQuery, [userId, bucketId], function (err, result) {
    if (err) {
      throw err;
    }
    if (result.rowCount === 0) {
      return res.status(404).json(response(404, "Bucket not found for the given user and bucket ID.", []));
    }
    return res.status(200).json(response(200, "Bucket deleted successfully", []));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}
module.exports = { getBucketById, createBucket, updateBucketById, deleteBucketById };
