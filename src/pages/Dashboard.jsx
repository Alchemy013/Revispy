import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    })();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { count } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true });

      const { data } = await supabase
        .from("categories")
        .select("*")
        .range(start, end);

      setCategories(data || []);
      setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
    };

    fetchCategories();
  }, [page]);

  useEffect(() => {
    if (!userId) return;
    const fetchUserInterests = async () => {
      const { data } = await supabase
        .from("user_interests")
        .select("category_id")
        .eq("user_id", userId);
      setSelected(new Set(data.map((d) => d.category_id)));
    };

    fetchUserInterests();
  }, [userId]);

  const handleToggle = async (categoryId) => {
    const updated = new Set(selected);

    if (updated.has(categoryId)) {
      updated.delete(categoryId);
      await supabase
        .from("user_interests")
        .delete()
        .eq("user_id", userId)
        .eq("category_id", categoryId);
    } else {
      updated.add(categoryId);
      await supabase.from("user_interests").insert([
        {
          user_id: userId,
          category_id: categoryId,
        },
      ]);
    }

    setSelected(updated);
  };

  const handleSave = () => {
    navigate("/home");
  };

  const getPageNumbers = () => {
    const maxPages = 5;
    const half = Math.floor(maxPages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-1">
          Please mark your interests!
        </h1>
        <p className="text-center text-gray-400 mb-6 text-sm">
          We will keep you notified.
        </p>
        <hr className="border-gray-700 mb-6" />

        <h2 className="text-lg font-medium mb-4 text-center">
          My saved interests!
        </h2>

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {categories.map((cat) => {
            const isSelected = selected.has(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => handleToggle(cat.id)}
                className={`w-32 text-center px-4 py-2 rounded-full text-sm border transition-all duration-200 ease-in-out
                  ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white"
                  }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-2 text-gray-500 text-sm mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="hover:text-white disabled:opacity-30"
          >
            &lt;&lt;
          </button>

          {getPageNumbers().map((pNum) => (
            <button
              key={pNum}
              onClick={() => setPage(pNum)}
              className={`px-2 rounded ${
                page === pNum
                  ? "text-white font-bold underline"
                  : "hover:text-white"
              }`}
            >
              {pNum}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="hover:text-white disabled:opacity-30"
          >
            &gt;&gt;
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md font-semibold text-white tracking-wide"
          >
            Save Interests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
