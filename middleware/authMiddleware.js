import { UnauthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

const authenticatedUser = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token) throw new UnauthorizedError('Unauthenticated user!');
    try {
        const {userId, role} = verifyJWT(token);
        req.user = {userId, role};
        next()
    } catch (error) {
        throw new UnauthorizedError('Unauthenticated user!');
    }
}

export default authenticatedUser;