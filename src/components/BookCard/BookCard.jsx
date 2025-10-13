import { useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";

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

  console.log(stringNumberToArray);

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all hover:scale-[1.015] duration-300 border border-gray-200 flex flex-col">
      {/* رأس البطاقة */}
      <div className="bg-primary text-white px-5 py-3 flex items-center gap-3">
        <FaBookReader size={24} />
        <h2 className="text-lg font-bold truncate">{title}</h2>
      </div>

      {/* التفاصيل */}
      <div className="p-4 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
        <div>
          الكاتب: <span className="text-gray-900 font-medium">{author}</span>
        </div>
        <div>
          التصنيف:{" "}
          <span className="text-purple-700 font-medium">
            {category?.name || "غير محدد"}
          </span>
        </div>
        <div>
          الكمية: <span className="font-semibold">{quantity}</span>
        </div>
        <div>
          رقم الرف:
          {stringNumberToArray?.map((ele) => {
            return (
              <span className="font-semibold">
                {" "}
                {ele} <span className="text-green-500 font-bold">|</span>{" "}
              </span>
            );
          })}
        </div>
      </div>

      {/* السعر والأزرار */}
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t">
        <span className="text-green-600 font-bold text-md">
          السعر: {price} ل.س
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit-book/${id}`)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
          >
            تعديل
          </button>
          <button
            onClick={() => CheckPass(id)}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
