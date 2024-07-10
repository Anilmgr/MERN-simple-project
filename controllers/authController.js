import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js'
import { UnauthorizedError } from '../errors/customError.js';

export const register =  async (req,res) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({user});
}

export const login = async (req,res)=>{
    const user = await User.find(req.body);
    if(!user) throw new UnauthorizedError('Email or password doesn\'t match!');

}