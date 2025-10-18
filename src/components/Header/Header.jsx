import { useEffect, useRef, useState } from "react";
import { BiSearch, BiMenu, BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getBookBySearch,
  getBooks,
  setTrim,
} from "../../redux/slice/user/bookSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = window.location;
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed !== "") {
        dispatch(setTrim(trimmed));
        dispatch(getBookBySearch(searchTerm));
      } else if (trimmed === "" && location.pathname === "/") {
        dispatch(setTrim(""));
        dispatch(getBooks());
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch, navigate]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <header className="bg-primary/90 p-3 md:p-5 flex flex-wrap justify-between items-center gap-3 relative">
      {/* الشعار */}
      <div className="flex items-center gap-2">
        <img src="image.png" alt="logo" className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-white font-bold text-lg md:text-2xl hidden sm:block">
          نظام الكتب
        </h1>
      </div>

      {/* زر القائمة للموبايل */}
      <button
        className="text-white text-3xl md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <BiX /> : <BiMenu />}
      </button>

      {/* روابط التنقل (للحاسوب) */}
      <nav
        className={`hidden md:flex ${
          location.pathname !== "/" && "md:m-auto"
        }  gap-4 text-lg font-bold`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-lg p-3 ${
              isActive
                ? "bg-black text-white"
                : "bg-white hover:bg-white/50 hover:text-white"
            }`
          }
        >
          الكتب
        </NavLink>
        <NavLink
          to="/add-book"
          className={({ isActive }) =>
            `rounded-lg p-3 ${
              isActive
                ? "bg-black text-white"
                : "bg-white hover:bg-white/50 hover:text-white"
            }`
          }
        >
          إضافة كتاب
        </NavLink>
        <NavLink
          to="/add-category"
          className={({ isActive }) =>
            `rounded-lg p-3 ${
              isActive
                ? "bg-black text-white"
                : "bg-white hover:bg-white/50 hover:text-white"
            }`
          }
        >
          الأقسام
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `rounded-lg p-3 ${
              isActive
                ? "bg-black text-white"
                : "bg-white hover:bg-white/50 hover:text-white"
            }`
          }
        >
          المبيعات
        </NavLink>
      </nav>

      {/* شريط البحث */}
      <div
        className={`${
          location.pathname !== "/" && "hidden"
        } relative w-full md:w-1/3`}
      >
        <input
          type="text"
          ref={input}
          placeholder="ابحث عن كتاب"
          className="p-3 w-full rounded-lg border border-gray-300 bg-white text-sm md:text-lg text-center"
          onChange={handleSearch}
        />
        {searchTerm.length > 0 && (
          <span
            onClick={() => {
              input.current.value = "";
              setSearchTerm("");
            }}
            className="absolute right-3 top-2 md:top-3 bg-gray-300 text-red-500 w-6 h-6 md:w-7 md:h-7 flex justify-center items-center rounded-full cursor-pointer"
          >
            X
          </span>
        )}
        <BiSearch
          className="absolute left-3 top-3 md:top-4 text-gray-500"
          size={21}
        />
      </div>

      {/* قائمة الموبايل المنسدلة */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-primary/70 shadow-md flex flex-col items-center text-center py-3 px-4 space-y-2 md:hidden z-50 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg p-3 w-full ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white hover:bg-white/50 hover:text-white"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            الكتب
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              `rounded-lg p-3 w-full ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white hover:bg-white/50 hover:text-white"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            إضافة كتاب
          </NavLink>
          <NavLink
            to="/add-category"
            className={({ isActive }) =>
              `rounded-lg p-3 w-full ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white hover:bg-white/50 hover:text-white"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            الأقسام
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `rounded-lg p-3 w-full ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white hover:bg-white/50 hover:text-white"
              } hidden`
            }
            onClick={() => setMenuOpen(false)}
          >
            المبيعات
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
