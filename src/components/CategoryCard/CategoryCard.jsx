import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({id,image,name,CheckPass}) => {
    const navigate=useNavigate()
  return (
    <div
      className="bg-white shadow-md hover:scale-105 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => {
        navigate(`/books/${id}`);
      }}
    >
      <div className="h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={image || "/placeholder-category.png"}
          alt={name}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
          {name}
        </h3>

        <div className="flex justify-center gap-4 hidden">
          <button
            onClick={() => navigate(`/edit-category/${id}`)}
            className="text-blue-600 hover:text-blue-400 transition-colors cursor-pointer"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => CheckPass(id)}
            className="text-red-600 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
