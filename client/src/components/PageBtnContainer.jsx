import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = () => {
    const { data } = useAllJobsContext();
    const { jobs, totalJobs, numOfPage, currentPage} = data;
    const pages = Array.from({length:numOfPage},(_, index)=>{return index + 1})
    console.log(pages);
    
  return (
    <Wrapper>
        <button className="btn prev-btn">
            <HiChevronDoubleLeft/>
            prev
        </button>
        <div className="btn-container">
            {
                pages.map((pageNumber)=>{
                    return <button className={`btn page-btn ${pageNumber == currentPage && 'active'}`}>{pageNumber}</button>
                })
            }
        </div>
        <button className="btn next-btn">
            <HiChevronDoubleRight/>
            next
        </button>
    </Wrapper>
  )
}
export default PageBtnContainer