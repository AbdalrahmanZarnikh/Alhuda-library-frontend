import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store.js";
import Home from "./pages/Home.jsx";
import Form from "./pages/Form.jsx";
import FormCategory from "./pages/FormCategory.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster />
      <Header />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/add-book" element={<Form />} />
        <Route path="/edit-book/:id" element={<Form />} />  
        <Route path="/add-category" element={<FormCategory />} />
        <Route path="/edit-category/:id" element={<FormCategory />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
