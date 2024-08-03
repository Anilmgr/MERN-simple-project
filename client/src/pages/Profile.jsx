import { Form, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if(file && file.size > 500000){
      toast.error('Image size too large!')
      return null
    }
    try {
        await customFetch.patch("/users/update-user", formData);
        toast.success("Updated profile successfully!");
        return null;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
};

const Profile = () => {
    const { user } = useOutletContext();
    const { name, lastName, email, location } = user;

    return (
        <Wrapper>
            <Form method="post" className="form" encType="multipart/form-data">
                <h4 className="form-title">Profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">
                            Select an image file (max 500KB)
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            className="form-input"
                            accept="image/*"
                        />
                    </div>
                    <FormRow type="text" name="name" defaultValue={name} />
                    <FormRow
                        type="text"
                        name="lastName"
                        labelText="Last Name"
                        defaultValue={lastName}
                    />
                    <FormRow
                        type="text"
                        labelText="Location"
                        name="location"
                        defaultValue={location}
                    />
                    <FormRow
                        type="email"
                        name="email"
                        labelText="Email"
                        defaultValue={email}
                    />
                    <SubmitBtn formBtn/>
                </div>
            </Form>
        </Wrapper>
    );
};
export default Profile;
