import { useState } from "react";
import { removeBook, updateQuantity } from "../../redux/slice/cart/cartSlice";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

const ItemRow = ({ bookId, itemId, quantiy, title, price }) => {
  const [itemQuantity, setItemQuantity] = useState(quantiy);
  const dispatch = useDispatch();

  const handleIncrement = () => setItemQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setItemQuantity((prev) => Math.max(prev - 1, 1));
  const handleUpdate = () => {
    dispatch(updateQuantity({ itemId, data: { quantity: itemQuantity } }));
  };
  const handleRemove = () => {
    dispatch(removeBook(itemId));
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-3 text-right font-medium text-gray-700">
        {title}
      </td>
      <td className="px-4 py-3 text-center text-gray-600">{price} ل.س</td>
      <td className="px-4 py-3 text-center text-gray-600">{price*quantiy } ل.س</td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded cursor-pointer"
            onClick={handleDecrement}
          >
            ➖
          </button>
          <input
            type="text"
            value={itemQuantity}
            className="w-12 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            readOnly
          />
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded cursor-pointer"
            onClick={handleIncrement}
          >
            ➕
          </button>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition cursor-pointer"
          onClick={handleUpdate}
        >
          تأكيد
        </button>
      </td>
      <td className="px-4 py-3 text-center">
        <button onClick={handleRemove}>
          <MdDelete className="text-2xl text-red-600 hover:text-red-400 cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;
