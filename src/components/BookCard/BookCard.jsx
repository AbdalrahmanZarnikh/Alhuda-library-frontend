import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";

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
  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };
  const stringNumberToArray = number?.split(",");

  return (
    <div className="relative rounded-2xl shadow-lg overflow-hidden w-full hover:scale-105 transition-transform cursor-pointer bg-primary">
      {/* طبقة شفافة فوق الخلفية */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* المحتوى داخل طبقة فوقية */}
      <div className="relative z-10">
        {/* الغلاف */}
        <div className="flex flex-col items-center p-5 text-white">
          <FaBook size={36} className="mb-2" />
          <h2 className="font-bold text-lg text-center truncate">{title}</h2>
          <p className="text-sm mt-1">{author || "---"}</p>
        </div>

        {/* تفاصيل الكتاب */}
        <div className="bg-green-100 p-4 text-gray-700 space-y-2">
          <div>
            التصنيف:{" "}
            <span className="font-semibold text-purple-700">
              {category?.name || "غير محدد"}
            </span>
          </div>
          <div>
            الكمية: <span className="font-semibold">{quantity}</span>
          </div>
          <div>
            رقم الرف:
            {stringNumberToArray?.map((ele, idx) => (
              <span key={idx} className="font-semibold text-red-500">
                {" "}
                {ele} <span className="text-black">| </span>
              </span>
            ))}
          </div>
          <div className="text-green-600 font-bold text-center">
            السعر: {price} ل.س
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex justify-between p-4 bg-green-100 border-t">
          <button
            onClick={() => navigate(`/edit-book/${id}`)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition"
          >
            تعديل
          </button>

          {/* <button
            onClick={() => navigate(`/edit-book/${id}`)}
            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md text-sm transition"
          >
            اضافة للبيع
          </button> */}

          <button
            onClick={() => CheckPass(id)}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm transition"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
