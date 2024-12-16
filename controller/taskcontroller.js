const con = require("../config/db.js");
const response = require("../common/response.js");

function getTaskById(req, res) {
  const bucketId = req.params.bucketId;
  const getQuery = "SELECT * FROM task WHERE bucket_id=$1";
  try{
  con.query(getQuery, [bucketId], function (err, result) {
    if (err) {
     throw err;
    }
    if (result.rows.length === 0) {
      return res.status(404).json(response(404, "Bucket not found", []));
    }
    return res.status(200).json(response(200, "Tasks retrieved successfully", result.rows));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}

function createTask(req, res) {
  const { bucketId, task, status } = req.body;
  const insertQuery = "INSERT INTO task (bucket_id, task, status) VALUES ($1, $2, $3)";
  try{
  con.query(insertQuery, [bucketId, task, status], function (err, result) {
    if (err) {
     throw err;
    }
    return res.status(201).json(response(201, "Task added successfully", []));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}

function updateTaskById(req, res) {
  const bucketId = req.params.bucketId;
  const { taskId, task, status } = req.body;
  const putQuery = "UPDATE task SET task = $1, status = $2 WHERE bucket_id = $3 AND task_id=$4";
  try{
  con.query(putQuery, [task, status, bucketId, taskId], function (err, result) {
    if (err) {
      throw err;
    }
    if (result.rowCount === 0) {
      return res.status(404).json(response(404, "Task not found for the given bucket ID.", []));
    }
    return res.status(200).json(response(200, "Task updated successfully", []));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}

function deleteTaskById(req, res) {
  const bucketId = req.params.bucketId;
  const { taskId } = req.body;
  const deleteQuery = "DELETE FROM task WHERE bucket_id = $1 AND task_id = $2";
  try{
  con.query(deleteQuery, [bucketId, taskId], function (err, result) {
    if (err) {
      throw err;
    }
    if (result.rowCount === 0) {
      return res.status(404).json(response(404, "Task not found for the given bucket ID and Task ID.", []));
    }
    return res.status(200).json(response(200, "Task deleted successfully", []));
  });
}catch(err){
    return res.status(500).json(response(500, `${err.message} error occurred while deleting the Bucket`, []));
}
}

module.exports = { getTaskById, createTask, updateTaskById, deleteTaskById };
