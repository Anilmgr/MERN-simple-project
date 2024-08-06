import { Form } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormPage";

const SearchContainer = () => {
    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Search Job</h4>
                <div className="form-center">
                    <FormRow type="text" name="search" />
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
                    <FormRowSelect
                        name="sort"
                        labelText="Sort"
                        list={Object.values(JOB_SORT_BY)}
                    />
                    <button className="btn btn-block form-btn" type="button">Search</button>
                </div>
            </Form>
        </Wrapper>
    );
};
export default SearchContainer;
