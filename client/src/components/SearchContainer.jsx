import { Form, Link, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import SubmitBtn from "./SubmitBtn";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
    const {searchValues} = useAllJobsContext()
    const {search, jobStatus, jobType, sort} = searchValues
    const submit = useSubmit();
    return (
        <Wrapper>
            <Form className="form">
                <h4 className="form-title">Search Job</h4>
                <div className="form-center">
                    <FormRow type="text" name="search" onChange={(e)=>{submit(e.currentTarget.form)}} defaultValue={search}/>
                    <FormRowSelect
                        name="jobStatus"
                        labelText="Job Status"
                        list={['all',...Object.values(JOB_STATUS)]}
                        defaultValue={jobStatus}
                        onChange={(e)=>{submit(e.currentTarget.form)}}
                    />
                    <FormRowSelect
                        name="jobType"
                        labelText="Job Type"
                        list={['all', ...Object.values(JOB_TYPE)]}
                        defaultValue={jobType}
                        onChange={(e)=>{submit(e.currentTarget.form)}}
                    />
                    <FormRowSelect
                        name="sort"
                        labelText="Sort"
                        list={Object.values(JOB_SORT_BY)}
                        onChange={(e)=>{submit(e.currentTarget.form)}}
                        defaultValue={sort}
                    />
                    <Link to='/dashboard/all-jobs' className="btn form-btn delete-btn">Reset Search Values</Link>
                    <SubmitBtn formBtn/> 
                </div>
            </Form>
        </Wrapper>
    );
};
export default SearchContainer;
