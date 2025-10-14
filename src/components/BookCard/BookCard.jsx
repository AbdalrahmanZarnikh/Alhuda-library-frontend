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
    <div className="bg-primary rounded-2xl shadow-lg overflow-hidden w-full hover:scale-105 transition-transform cursor-pointer">
      {/* الغلاف */}
      <div className="flex flex-col items-center p-5 text-white">
        <FaBook size={36} className="mb-2" />
        <h2 className="font-bold text-lg text-center truncate">{title}</h2>
        <p className="text-sm mt-1">{author}</p>
      </div>

      {/* تفاصيل الكتاب */}
      <div className="bg-white p-4 text-gray-700 space-y-2">
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
              {ele} <span className="text-black">|{" "}</span>
            </span>
          ))}
        </div>
        <div className="text-green-600 font-bold">السعر: {price} ل.س</div>
      </div>

      {/* الأزرار */}
      <div className="flex justify-between p-4 bg-gray-50 border-t">
        <button
          onClick={() => navigate(`/edit-book/${id}`)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition"
        >
          تعديل
        </button>
        <button
          onClick={() => CheckPass(id)}
          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm transition"
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default BookCard;
