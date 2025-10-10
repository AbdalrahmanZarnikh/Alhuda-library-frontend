import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../components/PopUp/PopUp";
import FilterTable from "../components/FilterTable/FilterTable";
import loading from "../utils/loading.json";
import { deleteBook, getBooks } from "../redux/slice/user/bookSlice";
import { getCategories } from "../redux/slice/category/categorySlice";
import BookCard from "../components/BookCard/BookCard";

function Home() {
  const dispatch = useDispatch();

  const { isLoading, books } = useSelector((state) => state.bookSlice);
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

  const filteredData = books?.filter((ele) => ele.category?.name === category);

  useEffect(() => {
    if (categories?.length > 0) {
      setCategory(categories[0]?.name);
    }
  }, [categories]);

  return (
    <>
      {isLoading === "Pending" ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie animationData={loading} className="w-10" />
        </div>
      ) : (
        <div className="p-5 overflow-x-auto">
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

          <div className="flex justify-between">
            <FilterTable
              data={categories}
              setFunction={setCategory}
              value={category}
            />
          </div>
          {/* End Filter Section */}

          <div>
            {filteredData.map((book) => {
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
        </div>
      )}
    </>
  );
}

export default Home;
