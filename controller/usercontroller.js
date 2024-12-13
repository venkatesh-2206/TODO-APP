const con=require('../config/db.js');
async function login(req,res){
    const{email,password}=req.body;
    console.log('email: ', email);
    console.log('password: ', password);
    const query = 'SELECT * FROM users WHERE user_email = $1 AND user_password = $2';
    try {
        con.query(query, [email, password], (err, result) => {
            if (err) {
                throw err;
            }else{
                const user=result.rows[0];
                console.log('user: ', user);
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


function postUser(req, res) {
    const { email, password } = req.body;
    const insertQuery = 'INSERT INTO users (user_email, user_password) VALUES ($1, $2)';
    try {
        con.query(insertQuery, [email, password], function (err, result) {
            if (err) {
                throw err;
            } else {
                res.status(201).json({
                    statusCode: 201,
                    message: "User created successfully",
                    result: [],
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "An error occurred while creating the user",
            result: [],
        });
    }
};

module.exports = { login, postUser };
