// import { useNavigate } from "react-router-dom";
// import { FaBook } from "react-icons/fa";
// import { updateBook, deleteBook } from "../../redux/slice/user/bookSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { addBook } from "../../redux/slice/cart/cartSlice";
// import Lottie from "lottie-react";
// import loading from "../../utils/loading.json";

// const BookCard = ({
//   id,
//   title,
//   author,
//   category,
//   quantity,
//   number,
//   price,
//   setShow,
//   setNewId,
// }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const CheckPass = (id) => {
//     setShow(true);
//     setNewId(id);
//   };
//   const stringNumberToArray = number?.split(",");

//   const [Loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (quantity === 0) {
//       dispatch(deleteBook(id));
//     }
//   }, [quantity]);

//   const handleAddBook = (id) => {
//     setLoading(true);
//     dispatch(addBook({ bookId: id })).then(() => {
//       setLoading(false);
//     });
//   };

//   return (
//     <div className="relative rounded-2xl shadow-lg overflow-hidden w-full hover:scale-105 transition-transform cursor-pointer bg-primary">
//       {/* طبقة شفافة فوق الخلفية */}
//       <div className="absolute inset-0 bg-black/40 z-0"></div>

//       {/* المحتوى داخل طبقة فوقية */}
//       <div className="relative z-10">
//         {/* الغلاف */}
//         <div className="flex flex-col items-center p-5 text-white">
//           <FaBook size={36} className="mb-2" />
//           <h2 className="font-bold text-lg text-center truncate">{title}</h2>
//           <p className="text-sm mt-1">{author || "---"}</p>
//         </div>

//         {/* تفاصيل الكتاب */}
//         <div className="bg-green-100 p-4 text-gray-700 space-y-2">
//           <div>
//             التصنيف:{" "}
//             <span className="font-semibold text-purple-700">
//               {category?.name || "غير محدد"}
//             </span>
//           </div>
//           <div>
//             الكمية: <span className="font-semibold">{quantity}</span>
//           </div>
//           <div>
//             رقم الرف:
//             {stringNumberToArray?.map((ele, idx) => (
//               <span key={idx} className="font-semibold text-red-500">
//                 {" "}
//                 {ele} <span className="text-black">| </span>
//               </span>
//             ))}
//           </div>
//           <div className="text-green-600 font-bold text-center">
//             السعر: {price} ل.س
//           </div>
//         </div>

//         {/* الأزرار */}
//         <div className="flex justify-between p-4 bg-green-100 border-t ">
//           <button
//             onClick={() => navigate(`/edit-book/${id}`)}
//             className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
//           >
//             تعديل
//           </button>

//           <button
//             onClick={() => {
//               handleAddBook(id);
//             }}
//             className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer hidden lg:block"
//           >
//             {Loading ? (
//               <div className="flex justify-center items-center">
//                 <Lottie animationData={loading} className="w-7" />
//               </div>
//             ) : (
//               "اضافة للمبيعات"
//             )}
//           </button>

//           <button
//             onClick={() => {
//               dispatch(
//                 updateBook({ id: id, data: { quantity: quantity + 1 } })
//               );
//             }}
//             className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md text-xl transition cursor-pointer"
//           >
//             +
//           </button>

//           <button
//             onClick={() => {
//               dispatch(
//                 updateBook({ id: id, data: { quantity: quantity - 1 } })
//               );
//             }}
//             className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md text-xl transition cursor-pointer"
//           >
//             -
//           </button>

//           <button
//             onClick={() => CheckPass(id)}
//             className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
//           >
//             حذف
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;

import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaEdit,
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
} from "react-icons/fa";
import { updateBook, deleteBook } from "../../redux/slice/user/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addBook } from "../../redux/slice/cart/cartSlice";
import Lottie from "lottie-react";
import loading from "../../utils/loading.json";

const BookCard = ({
  id,
  title,
  author,
  category,
  quantity,
  number,
  price,
  setShow,
  setNewId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  const stringNumberToArray = number?.split(",");

  useEffect(() => {
    if (quantity === 0) {
      dispatch(deleteBook(id));
    }
  }, [quantity]);

  const handleAddBook = (id) => {
    setLoading(true);
    dispatch(addBook({ bookId: id })).then(() => {
      setLoading(false);
    });
  };

  // تحديد لون حالة الكمية
  const getQuantityColor = (qty) => {
    if (qty === 0) return "text-red-700 bg-red-100 border border-red-200";
    if (qty < 5) return "text-amber-700 bg-amber-100 border border-amber-200";
    return "text-emerald-700 bg-emerald-100 border border-emerald-200";
  };

  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden w-full hover:scale-105 transition-all duration-300 cursor-pointer bg-orange-800 hover:shadow-2xl group">
      {/* تأثير hover */}
      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-all duration-300 z-0"></div>

      {/* المحتوى */}
      <div className="relative z-10 h-full flex flex-col">
        {/* الهيدر - معلومات الكتاب الأساسية */}
        <div className="flex flex-col items-center p-6 text-white">
          <div className="relative mb-3">
            <div className="w-16 h-16 bg-white/25 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <FaBook size={28} className="text-white" />
            </div>
          </div>

          <h2 className="font-bold text-xl text-center line-clamp-2 mb-1 leading-tight">
            {title}
          </h2>
          <p className="text-white/90 text-sm">{author || "---"}</p>
        </div>

        {/* تفاصيل الكتاب */}
        <div className="bg-white/95 backdrop-blur-sm p-5 flex-1 space-y-3">
          {/* التصنيف */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-lg font-medium">التصنيف:</span>
            <span className="font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full text-lg border border-indigo-200">
              {category?.name || "غير محدد"}
            </span>
          </div>

          {/* الكمية */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-lg font-medium">الكمية:</span>
            <span
              className={`font-bold px-3 py-1 rounded-full text-lg ${getQuantityColor(
                quantity
              )}`}
            >
              {quantity} كتاب
            </span>
          </div>

          {/* أرقام الرفوف */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-lg font-medium">الرف:</span>
            <div className="flex gap-1 flex-wrap justify-end">
              {stringNumberToArray?.map((ele, idx) => (
                <span
                  key={idx}
                  className="bg-sky-100 text-sky-800 px-2 py-1 rounded text-lg font-medium border border-sky-200"
                >
                  {ele}
                </span>
              ))}
            </div>
          </div>

          {/* السعر */}
          <div className="text-center pt-2">
            <div className="text-amber-600 font-bold text-lg bg-amber-50 py-2 rounded-xl border border-amber-200">
              {price} ل.س
            </div>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="bg-white/90 backdrop-blur-sm p-4 border-t border-gray-300">
          {/* الصف الأول - الأزرار الأساسية */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => navigate(`/edit-book/${id}`)}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 shadow-md border border-sky-600 cursor-pointer"
            >
              <FaEdit size={14} />
              تعديل
            </button>

            <button
              onClick={() => handleAddBook(id)}
              disabled={Loading}
              className="hidden lg:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 shadow-md disabled:opacity-50 border border-amber-600 cursor-pointer "
            >
              {Loading ? (
                <Lottie animationData={loading} className="w-5 h-5" />
              ) : (
                <>
                  <FaShoppingCart size={14} />
                  <span className="hidden lg:inline">مبيعات</span>
                </>
              )}
            </button>

            <button
              onClick={() => CheckPass(id)}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 shadow-md border border-rose-600 cursor-pointer"
            >
              <FaTrash size={14} />
              حذف
            </button>
          </div>

          {/* الصف الثاني - أزرار الكمية */}
          <div className="flex justify-center items-center gap-3 bg-gray-100 rounded-xl p-2 border border-gray-200">
            <span className="text-gray-700 text-sm font-medium">الكمية:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    updateBook({ id: id, data: { quantity: quantity - 1 } })
                  )
                }
                className="w-10 h-10 bg-rose-500 hover:bg-rose-600 text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md border border-rose-600 cursor-pointer"
              >
                <FaMinus size={14} />
              </button>

              <span className="w-8 text-center font-bold text-gray-800">
                {quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    updateBook({ id: id, data: { quantity: quantity + 1 } })
                  )
                }
                className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md border border-emerald-600 cursor-pointer"
              >
                <FaPlus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
