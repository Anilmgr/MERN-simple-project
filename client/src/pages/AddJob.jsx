import { Form, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/jobs", data);
        toast.success("Job added successfully!");
        return null;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
};

const AddJob = () => {
    const { user } = useOutletContext();
    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Add Job</h4>
                <div className="form-center">
                    <FormRow type="text" name="position" />
                    <FormRow type="text" name="company" />
                    <FormRow
                        type="text"
                        labelText="Job Location"
                        name="jobLocation"
                    />
                    <FormRowSelect name="jobStatus" labelText="Job Status" list={Object.values(JOB_STATUS)}/>
                    <FormRowSelect name="jobType" labelText="Job Type" list={Object.values(JOB_TYPE)}/>
                    <SubmitBtn formBtn/>
                </div>
            </Form>
        </Wrapper>
    );
};

export default AddJob;
