import { UnauthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticatedUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw new UnauthorizedError("Unauthenticated user!");
    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role };
        next();
    } catch (error) {
        throw new UnauthorizedError("Unauthenticated user!");
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('Unauthorized to access this route!')
        }
        next();
    };
};
