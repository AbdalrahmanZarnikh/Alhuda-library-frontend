import { useDispatch } from "react-redux";
import { getBooks } from "../../redux/slice/user/bookSlice";

const FilterTable = ({ data, setFunction, value }) => {
  const newData = [...data, { name: "الكل" }];
  const dispatch=useDispatch()
  const handleChange = (e) => {
    setFunction(e.target.value);
    dispatch(getBooks({category:e.target.value}))
  };
  return (
    <div>
      {newData?.length > 0 && (
        <select
          className="text-center mb-5 p-2 rounded-lg bg-primary text-white cursor-pointer"
          value={value}
          onChange={(e) => {handleChange(e)}}
        >
          {newData.map((ele) => {
            if (ele.name) {
              return (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              );
            } else {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            }
          })}
        </select>
      )}
    </div>
  );
};

export default FilterTable;
