import { useDispatch } from "react-redux";

const Pagination = ({ currentPage, next, prev, getThunk ,category}) => {
  const dispatch = useDispatch();

  const handleClickNext = () => {
    if (next) {
      dispatch(getThunk({page:next,category:category}));
    }
  };
  const handleClickPrev = () => {
    if (prev) {
      dispatch(getThunk({page:prev,category:category}));
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
