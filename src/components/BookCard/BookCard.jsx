import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({
  id,
  title,
  author,
  category,
  quantity,
  number,
  price,
  images,
  setShow,
  setNewId,
}) => {
  const navigate = useNavigate();

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden w-64 flex flex-col">
      {/* صورة الكتاب */}
      <div className="relative w-full h-64 bg-gray-100">
        <img
          src={images?.[0]?.url || "/placeholder-book.jpg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* معلومات الكتاب */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-600 mb-1">الكاتب: {author}</p>
        <p className="text-sm text-gray-600 mb-1">
          التصنيف: <span className="text-blue-800">{category?.name || "غير محدد"}</span>
        </p>

        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <span>الكمية: {quantity}</span>
          <span>الرقم: {number}</span>
        </div>

        <p className="text-md font-bold text-green-600 mt-3">
          السعر: {price} ل.س
        </p>

        {/* الأزرار */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/edit-book/${id}`)}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-1.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            تعديل
          </button>
          <button
            onClick={() => CheckPass(id)}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white py-1.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
