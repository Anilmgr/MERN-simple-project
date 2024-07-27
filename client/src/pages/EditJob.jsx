import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return redirect("/dashboard/all-jobs");
    }
};

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

const EditJob = () => {
    const { job } = useLoaderData();
    console.log(job);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Add Job</h4>
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="position"
                        defaultValue={job?.position}
                    />
                    <FormRow
                        type="text"
                        name="company"
                        defaultValue={job?.company}
                    />
                    <FormRow
                        type="text"
                        labelText="Job Location"
                        name="jobLocation"
                    />
                    <FormRowSelect
                        name="jobStatus"
                        labelText="Job Status"
                        list={Object.values(JOB_STATUS)}
                    />
                    <FormRowSelect
                        name="jobType"
                        labelText="Job Type"
                        list={Object.values(JOB_TYPE)}
                    />
                    <button
                        type="submit"
                        className="btn btn-block form-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};
export default EditJob;
