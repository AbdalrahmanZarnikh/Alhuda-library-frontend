import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonReverse from "../components/ButtonReverse/ButtonReverse";
import FormLayout from "../components/FormLayout/FormLayout";
import { useEffect } from "react";
import { createBook, updateBook } from "../redux/slice/user/bookSlice";
import { getCategories } from "../redux/slice/category/categorySlice";

const Form = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const { books, isLoading } = useSelector((state) => state.bookSlice);
  const { categories } = useSelector((state) => state.categorySlice);

  const contentFormFilds = [
    {
      type: "text",
      label: "عنوان الكتاب",
      placeholder: "ادخل عنوان",
      register: register,
      required: true,
      errors: errors,
      nameInDocument: "title",
    },
    {
      type: "text",
      label: "اسم الكاتب",
      placeholder: "ادخل اسم الكاتب ",
      register: register,
      required: false,
      errors: errors,
      nameInDocument: "author",
    },
    {
      type: "number",
      label: "الكمية",
      placeholder: "ادخل الكمية",
      register: register,
      required: false,
      errors: errors,
      nameInDocument: "quantity",
    },
    {
      type: "number",
      label: "السعر",
      placeholder: "ادخل السعر",
      register: register,
      required: false,
      errors: errors,
      nameInDocument: "price",
    },
    {
      type: "number",
      label: "رقم الرف",
      placeholder: "ادخل رقم الرف",
      register: register,
      required: false,
      errors: errors,
      nameInDocument: "number",
    },
  ];

  const contentFormFieldsSelector = [
    {
      data: categories,
      label: "الصنف",
      register: register,
      required: true,
      option: "اختر  الصنف",
      errors: errors,
      nameInDocument: "category",
    },
  ];


  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isUpdateMode && books.length > 0) {
      const found = books.find((item) => item._id === id);
      if (found) {
        reset({
          title: found.title,
          author: found.author,
          quantity: found.quantity,
          price: found.price,
          number: found.number,
          category: found.category?._id || "",
        });

        // const omraFound = omras.find((item) => item._id === found.omra?._id);
        // if (omraFound && found.roomType) {
        //   setTotal(omraFound[found.roomType]);
        // }
      }
    }
  }, [id, isUpdateMode, reset, categories, books]);



  // Function To Handle Submit
  const form = new FormData();
  const onSubmit = (data) => {
    form.append("title", data.title);
    form.append("author", +data.author);
    form.append("number", data.number);
    form.append("quantity", data.quantity);
    form.append("price", data.price);

    if (categories.length > 0) {
      form.append("category", data.category);
    }

    const action = isUpdateMode
      ? updateBook({ id: id, data: form })
      : createBook(form);

    dispatch(action).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="p-10">
      <ButtonReverse text={"رجوع"} />

      <FormLayout
        data={books}
        id={id}
        isLoading={isLoading}
        Submit={handleSubmit(onSubmit)}
        contentFormFilds={contentFormFilds}
        contentFormFieldsSelector={contentFormFieldsSelector}
        multipleImages={true}
        form={form}
      />
    </div>
  );
};

export default Form;
