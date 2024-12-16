const con=require('../config/db.js');
const response=require("../common/response.js");
function login(req,res){
    const{email,password}=req.body;
    // console.log('email: ', email);
    // console.log('password: ', password);
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
    const query = 'SELECT * FROM users WHERE user_email = $1 AND user_password = $2';
    try {
        con.query(query, [email, password], (err, result) => {
            if (err) {
                throw err;
            }else{
                const user=result.rows[0];
                //console.log('user: ', user);
                if(!user){
                    return res.status(404).json({message:"User not found"})
                }
                return res.json({user:{ 'id': user.user_id, 'email': user.user_email } })
            }
    })
    } catch (error) {
        console.log(`${error}`);
    }
    
};

function createUser(req, res) {
    const { email, password } = req.body;
    const insertQuery = 'INSERT INTO users (user_email, user_password) VALUES ($1, $2)';
    try {
        con.query(insertQuery, [email, password], function (err, result) {
            if (err) {
                throw err;
            } else {
               return res.status(201).json(response(201, "User created successfully",[]));
            }
        });
    } catch (err) {
        return res.status(500).json(response(500,`${err.message} error occurred while adding the task`, [],));
    }
};

module.exports = { login, createUser };
