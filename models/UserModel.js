import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        lastName: {
            type: String,
            default: "lastName",
        },
        location: {
            type: String,
            default: "Sydney",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        avatar: String,
        avatarPublicId: String,
    },
    { timestamp: true }
);

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model("User", UserSchema);
