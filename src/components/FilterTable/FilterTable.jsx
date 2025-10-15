const FilterTable = ({ data, setFunction, value }) => {
  const newData = [...data, { name: "الكل" }];
  return (
    <div>
      {newData?.length > 0 && (
        <select
          className="text-center mb-5 p-2 rounded-lg bg-primary text-white cursor-pointer"
          value={value}
          onChange={(e) => setFunction(e.target.value)}
        >
          {newData.map((ele) => {
            if (ele.name) {
              return (
                <option key={ele.name} value={ele.name}>
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
