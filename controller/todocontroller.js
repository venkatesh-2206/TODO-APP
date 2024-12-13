const con=require('../config/db.js');
function getTodosById(req, res) {
    const userId = req.params.id;
    const getQuery = 'SELECT * FROM usertask WHERE user_id=$1';
    try {
        con.query(getQuery, [userId], function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(200).json({
                    statusCode: 200,
                    message: "Tasks retrieved successfully",
                    result:[ result.rows]
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "An error occurred while retrieving tasks",
            result: [],
        });
    }
};

function postTodos(req, res) {
    const { userId, task, status } = req.body;
    const insertQuery = 'INSERT INTO usertask (user_id, task, status) VALUES ($1, $2, $3)';
    try {
        con.query(insertQuery, [userId, task, status], function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(201).json({
                    statusCode: 201,
                    message: "Task added successfully",
                    result: [],
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "An error occurred while adding the task",
            result: [],
        });
    }
};

function putTodosById(req, res) {
    const userId = req.params.id;
    const { taskId, task, status } = req.body;
    const putQuery = 'UPDATE usertask SET task = $1, status = $2 WHERE user_id = $3 AND usertask_id = $4';
    try {
        con.query(putQuery, [task, status, userId, taskId], function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(200).json({
                    statusCode: 200,
                    message: "Task updated successfully",
                    result: [],
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "An error occurred while updating the task",
            result: [],
        });
    }
};

function deleteTodosById(req, res) {
    const userId = req.params.id;
    const { taskId } = req.body;
    const deleteQuery = 'DELETE FROM usertask WHERE user_id = $1 AND usertask_id = $2';
    try {
        con.query(deleteQuery, [userId, taskId], function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(200).json({
                    statusCode: 200,
                    message: "Task deleted successfully",
                    result: [],
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "An error occurred while deleting the task",
            result: [],
        });
    }
};

module.exports = { getTodosById, postTodos, putTodosById, deleteTodosById };
