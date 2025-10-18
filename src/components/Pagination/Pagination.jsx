import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Pagination = ({ currentPage, next, prev, getThunk, category }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const newCategory = typeof id == "string" ? id : category;

  const handleClickNext = () => {
    if (next) {
      dispatch(getThunk({ page: next, category: newCategory }));
    }
  };
  const handleClickPrev = () => {
    if (prev) {
      dispatch(getThunk({ page: prev, category: newCategory }));
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 md:gap-30 p-10">
      <button
        className={` text-white  p-4 cursor-pointer rounded-lg ${
          next ? "bg-primary hover:bg-primary/60" : "bg-gray-500 "
        }`}
        onClick={handleClickNext}
      >
        التالي{" "}
      </button>

      <span className="bg-primary text-xl rounded-lg text-white w-10 h-10 p-5 flex justify-center items-center">
        {currentPage}
      </span>
      <button
        className={` text-white  p-4 cursor-pointer rounded-lg ${
          prev ? "bg-primary hover:bg-primary/60" : "bg-gray-500 "
        }`}
        onClick={handleClickPrev}
      >
        السابق
      </button>
    </div>
  );
};

export default Pagination;
