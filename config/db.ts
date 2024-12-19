
import {Client} from 'pg';
import dotenv from "dotenv";
dotenv.config();
interface DbConfig{
    host:string,
    user:string,
    port:number,
    password:string,
    database:string
}
const dbConfig:DbConfig={
    host:process.env.host||"",
    user:process.env.user||"",
    port:process.env.port?parseInt(process.env.port):5432,
    password:process.env.password||"",
    database:process.env.database||""
};
const con=new Client(dbConfig);
con.connect()
    .then(()=>console.log("db connected"))
    .catch((err:string)=>console.log("db not connected",err));

export default con;