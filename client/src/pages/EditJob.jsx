import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";

const EditJob = () => {
  const { user } = useOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
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
}
export default EditJob