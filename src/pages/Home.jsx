import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../components/PopUp/PopUp";
import FilterTable from "../components/FilterTable/FilterTable";
import loading from "../utils/loading.json";
import { deleteBook, getBooks } from "../redux/slice/user/bookSlice";
import { getCategories } from "../redux/slice/category/categorySlice";
import BookCard from "../components/BookCard/BookCard";
import Pagination from "../components/Pagination/Pagination";

function Home() {
  const dispatch = useDispatch();

  const { isLoading, books, paginationBooks, trim } = useSelector(
    (state) => state.bookSlice
  );
  const { categories } = useSelector((state) => state.categorySlice);
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  const [newId, setNewId] = useState("");

  useEffect(() => {
    const fn = async () => {
      await dispatch(getBooks());
      await dispatch(getCategories());
    };
    fn();
  }, [dispatch]);

  const filteredData = books?.filter((ele) => {
    if (category !== "الكل") {
      return ele.category?.name === category;
    } else {
      return ele;
    }
  });

  useEffect(() => {
    if (categories?.length > 0) {
      setCategory("الكل");
    }
  }, [categories]);

  return (
    <div className="">
      {isLoading === "Pending" ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loading} className="w-10" />
        </div>
      ) : (
        <div className="p-5 h-fit">
          <PopUp
            msg={"هل أنت متأكد من الحذف ؟"}
            id={newId}
            thunk={deleteBook}
            showVar={show}
            onClose={() => {
              setShow(false);
            }}
          />

          {/*Start Filter Section */}

          <div className="flex justify-between ">
            <FilterTable
              data={categories}
              setFunction={setCategory}
              value={category}
            />
          </div>

          {/* End Filter Section */}
          {trim.length > 0 && filteredData.length == 0 && (
            <div className="flex justify-center items-center font-bold text-2xl w-full h-full bg-secondary overflow-hidden">
              الكتاب غير موجود
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {filteredData.length > 0 &&
              filteredData.map((book) => {
                return (
                  <BookCard
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    quantity={book.quantity}
                    number={book.number}
                    category={book?.category}
                    images={book?.images}
                    setNewId={setNewId}
                    setShow={setShow}
                  />
                );
              })}
          </div>

          {trim === "" && filteredData.length > 0 && (
            <Pagination
              currentPage={paginationBooks?.currentPage}
              next={paginationBooks?.next}
              prev={paginationBooks?.prev}
              getThunk={getBooks}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
