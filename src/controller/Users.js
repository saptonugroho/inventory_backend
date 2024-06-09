import Users from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res)=> {
    try {
        const users = await Users.findAll({
            attributes: ['id','username','image']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    const {body} = req;
    try {
        const user = await Users.findAll({
            where:{
                username: body.username
            }
        });
        const match = await bcrypt.compare(body.password, user[0].password);
        if(!match) return res.status(400).json({message:"Wrong Password"});
        const userId = user[0].id;
        const username = user[0].username;

        const accessToken = jwt.sign({userId,username}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId,username}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '86400s'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id:userId
            }
        })
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            //secure: true
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({message:"Username Not Found"});
    }
}

export const Register = async(req, res)=>{
    const {username, fullname, password, confPassword} = req.body;
    if(password != confPassword) return res.status(400).json({message: "Password & Confirm password not the same"});
    const user = await Users.findOne({
        where:{

            username: username
        }
    });
    if(user !== null) return res.status(400).json({message: "Username Exist"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            fullname: fullname,
            password: hashPassword,
            role:2
        })
        res.status(201).json({message: "Register success", data: req.body})
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }

}

export const Logout = async(req,res) => {
    const refreshToken =req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token:refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null}, {
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}