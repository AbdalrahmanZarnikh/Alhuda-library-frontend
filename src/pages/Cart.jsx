import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, confirm } from "../redux/slice/cart/cartSlice";
import ItemCard from "../components/ItemCard/ItemCard";
import ItemRow from "../components/ItemCard/ItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleConfirmPaid = () => {
    dispatch(confirm());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        قائمة المبيعات
      </h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="px-4 py-2 text-right">الكتاب</th>
            <th className="px-4 py-2 text-center">السعر</th>
            <th className="px-4 py-2 text-center">السعر النهائي</th>
            <th className="px-4 py-2 text-center">الكمية</th>
            <th className="px-4 py-2 text-center">تحديث</th>
            <th className="px-4 py-2 text-center">حذف</th>
          </tr>
        </thead>
        <tbody>
          {cart?.cartItems?.map((ele) => (
            <ItemRow
              title={ele.book?.title}
              price={ele.book?.price}
              bookId={ele.book?._id}
              itemId={ele._id}
              quantiy={ele.quantity}
            />
          ))}

          <tr>
            <td className="px-4 py-2 text-right text-gray-700">الاجمالي</td>
            <td className="px-4 py-2 text-right text-gray-700"></td>
            <td className="px-4 py-3 text-center text-gray-600">
              {cart.totalCartPrice} ل.س
            </td>

            <td className="px-4 py-3 text-center text-gray-600 ">
              <button
                className=" bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-300"
                onClick={handleConfirmPaid}
              >
                إتمام العملية
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
