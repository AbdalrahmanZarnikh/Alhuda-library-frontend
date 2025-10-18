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
import CategoryCard from "../components/CategoryCard/CategoryCard";

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
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          جميع الأقسام
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard
                name={category.name}
                id={category._id}
                image={category?.images[0]?.url}
                CheckPass={CheckPass}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              لا توجد أقسام حالياً
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCategory;
