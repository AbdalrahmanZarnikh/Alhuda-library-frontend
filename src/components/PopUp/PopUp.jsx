import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const PopUp = ({ msg, id, thunk, showVar,onClose }) => {

  const dispatch=useDispatch()
  const [pass, setPass] = useState("");
  const {books}=useSelector((state)=>state.bookSlice)



  const handleDelete = async () => {
    const found = books.find((item) => item._id === id);
    if (pass == "3415") {
      await dispatch(thunk(id));
      if(found){
        toast.success(`تم حذف بيانات ${found.name}`)
      }
      else{
        toast.success(`تم حذف العمرة بنجاح`)
      }
      
      onClose();
    } else {
      toast.error("الرمز السري خاطئ");
    }
  };

  return (
    <div>
      {showVar && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">{msg}</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="ادخل الرمز السري للحذف"
                className="rounded-lg p-2"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
            </div>
            <div className="flex  gap-2">
              <button
                className="submit-button m-auto mt-5 cursor-pointer bg-primary"
                onClick={handleDelete}
              >
                إدخال
              </button>
              <button
                className="submit-button m-auto mt-5  cursor-pointer bg-primary "
                onClick={() => {
                  onClose();
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
