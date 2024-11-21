import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategoties] = useState();

  const getCat = async () => {
    try {
      const res = await axios.get("/api/categories");

      if (res.status == 200) {
        setCategoties(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.delete(`/api/categories/${id}`);
      if (res.status === 200) {
        // alert("Category was deleted successfully!");
        getCat();
        // Optionally update UI here, e.g., refetch categories or update state
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete the category. Please try again.");
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <>
      <div>Categories</div>
      {categories?.map((category) => {
        return (
          <div key={category.id} className="space-y-4">
            <ul>
              <li>
                <div className="flex justify-between items-center space-y-4">
                  <p>{category.name}</p>

                  <div className="">
                    <button className=" bg-blue-500 px-2 py-1 rounded-md">
                      <Link to={`/categories/edit/${category.id}`}>Edit</Link>
                    </button>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Categories;
