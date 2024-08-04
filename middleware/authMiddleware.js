import { BadRequestError, UnauthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticatedUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw new UnauthorizedError("Unauthenticated user!");
    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === "66aeebba56718044a05ff9c8";
        req.user = { userId, role, testUser };
        next();
    } catch (error) {
        throw new UnauthorizedError("Unauthenticated user!");
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route!");
        }
        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) throw new BadRequestError("Demo user. Read only!");
    next();
};
