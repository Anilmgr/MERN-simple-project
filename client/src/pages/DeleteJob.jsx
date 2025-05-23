import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
      await customFetch.delete(`/jobs/${params.id}`, data);
      toast.success("Deleted job successfully!");
  } catch (error) {
      toast.error(error?.response?.data?.message);
  }
  return redirect('/dashboard/all-jobs');
};

const DeleteJob = () => {
  return (
    <div>DeleteJob</div>
  )
}
export default DeleteJob