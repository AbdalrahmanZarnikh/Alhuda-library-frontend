import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import PopUp from "../components/PopUp/PopUp";
import FormLayout from "../components/FormLayout/FormLayout";
import { Edit2, Trash2 } from "lucide-react";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../redux/slice/category/categorySlice";

const FormCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories, isLoading } = useSelector((state) => state.categorySlice);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (!isUpdateMode) reset({ name: "" });
    if (isUpdateMode && categories.length > 0) {
      const found = categories.find((item) => item._id === id);
      if (found) reset({ name: found.name });
    }
  }, [id, isUpdateMode, categories, reset]);

  const [show, setShow] = useState(false);
  const [newId, setNewId] = useState("");

  const form = new FormData();
  const onSubmit = async (data) => {
    form.append("name", data.name);
    const action = isUpdateMode
      ? updateCategory({ id: id, data: form })
      : addCategory(form);
    await dispatch(action);
  };

  const CheckPass = (id) => {
    setShow(true);
    setNewId(id);
  };

  const Fields = [
    {
      type: "text",
      label: "الاسم",
      placeholder: "ادخل اسم الصنف",
      register,
      required: true,
      errors,
      nameInDocument: "name",
    },
  ];

  return (
    <div className="p-10">
      <ButtonReverse text={"رجوع"} />
      <PopUp
        msg={"هل أنت متأكد من الحذف ؟"}
        id={newId}
        thunk={deleteCategory}
        showVar={show}
        onClose={() => setShow(false)}
      />

      <div className="hidden">
        {isUpdateMode && (
          <ButtonReverse
            text={"العودة لإنشاء صنف جديد "}
            to={"/add-category"}
          />
        )}

        <FormLayout
          id={id}
          isLoading={isLoading}
          Submit={handleSubmit(onSubmit)}
          contentFormFilds={Fields}
          multipleImages={true}
          form={form}
        />
      </div>

      {/* ✅✅ عرض الأصناف بطريقة جميلة كبطاقات */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">جميع الأصناف</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="bg-white shadow-md hover:scale-105 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={category.images[0]?.url || "/placeholder-category.png"}
                    alt={category.name}
                    className="object-cover h-full w-full"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                    {category.name}
                  </h3>

                  <div className="flex justify-center gap-4 hidden">
                    <button
                      onClick={() => navigate(`/edit-category/${category._id}`)}
                      className="text-blue-600 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => CheckPass(category._id)}
                      className="text-red-600 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              لا توجد أصناف حالياً
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCategory;
