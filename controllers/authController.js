import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { UnauthorizedError } from "../errors/customError.js";
import { USER_ROLE } from "../utils/constants.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    const isFirstUser = (await User.countDocuments()) === 0;
    req.body.role = isFirstUser ? USER_ROLE.ADMIN : USER_ROLE.USER;
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({
        message: "Account created successfully!",
    });
};

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const isValidUser =
        user && comparePassword(req.body.password, user.password);
    if (!isValidUser)
        throw new UnauthorizedError("Email or password doesn't match!");
    const token = createJWT({ userId: user._id, role: user.role });
    res.json({ token });
};
