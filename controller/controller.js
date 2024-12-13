const con=require('../config/db.js');
function gettodos(req,res){
    const getquery='SELECT * FROM todo';
    con.query(getquery,function(err,result){
    if(err){
        res.json("error");
    }else{
        res.json(result.rows);
    }
})
};
function gettodosbyid(req,res){
    const req_id=req.params.id;
    const getquery='SELECT * FROM todo WHERE id=$1';
    con.query(getquery,[req_id],function(err,result){
    if(err){
        res.json("error");
    }else{
        res.json(result.rows);
    }
})
};
function posttodos(req,res){
    const {task,status,id}=req.body;
    const insertQuery='INSERT INTO todo (task,status,id) VALUES($1,$2,$3)';
    con.query(insertQuery,[task,status,id],function(err,result){
        if (err){
            res.send("error");
        }else{
            res.send("posted succesfully");
        }
    })
};
function puttodosbyid(req,res){
    const req_id=req.params.id;
    const req_task=req.body.task;
    const putquery='UPDATE todo SET task=$1 WHERE id=$2';
    con.query(putquery,[req_task,req_id],function(err,result){
    if(err){
        res.json("error");
    }else{
        res.json("updated");
    }
})
};
function deletetodosbyid(req,res){
    const req_id=req.params.id;
    const deletequery='DELETE FROM todo WHERE id=$1';
    con.query(deletequery,[req_id],function(err,result){
    if(err){
        res.json("error");
    }else{
        res.json("deleted");
    }
})
};
module.exports={gettodos,gettodosbyid,posttodos,puttodosbyid,deletetodosbyid};