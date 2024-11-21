import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const ManageCategories = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    parent_id: "",
  });
  const [isEdti, setIsEdit] = useState(false);
  const [catId, setCatId] = useState("");
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
  // end get Categories

  //Start Create Category
  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.post("api/categories/store", formData);
      if (res.status === 201) {
        setFormData({
          name: "",
          parent_id: "",
        });
        setErrors({}); // Clear any previous errors
        alert("Category created successfully!"); // Optional success feedback
        getCat();
        navigate("/admin/categories");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Set validation errors
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  //end create caregory

  //Start handle Edit
  const handleEdit = async (id) => {
    setIsEdit(true);
    try {
      const res = await axios.get(`/api/categories/show/${id}`);
      if (res.status == 200) {
        setCatId(res.data.id);
        setFormData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //End handle Edit

  //start handle Update
  const handleUpdate = async (e, id) => {
    e.preventDefault(); // Prevent form submission reload

    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.put(`api/categories/update/${id}`, formData);

      if (res.status === 200) {
        setFormData({
          name: "",
          parent_id: "",
        });
        setErrors({}); // Clear any previous errors
        alert("Category updated successfully!"); // Optional success feedback
        setIsEdit(false);
        getCat();
        navigate("/admin/categories");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Set validation errors
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  //end handle Update

  //Start Delete Categoriy
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.delete(`/api/categories/${id}`);
      if (res.status === 200) {
        getCat();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete the category. Please try again.");
    }
  };
  //Start Delete Categoriy

  //fetch categories
  useEffect(() => {
    getCat();
  }, []);

  return (
    <div className="w-full p-4 h-screen bg-white ">
      <h1 className="text-center text-xl font-semibold">Categories</h1>

      {!isEdti ? (
        /* Category create Form */

        <form
          onSubmit={handleCreate}
          className="w-[90%] mx-auto space-y-6  px-10 py-5  rounded-lg"
        >
          {/* Category Name */}
          <div className="space-y-2">
            <label htmlFor="name">Category Create Form</label>
            <input
              type="text"
              placeholder="Type here for a new category"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border-2 py-1 px-2 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 tracking-wide">{errors.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Create"
            className="bg-blue-500 rounded-md text-white w-full py-1 cursor-pointer"
          />
        </form>
      ) : (
        // {/* end Category Create Form */}

        //  {/* Category Update Form */}
        <form
          onSubmit={(e) => handleUpdate(e, catId)}
          className="w-[90%] mx-auto space-y-6  px-10 py-5  rounded-lg"
        >
          {/* Category Name */}
          <div className="space-y-2">
            <label htmlFor="name">Category Edit Form</label>
            <input
              type="text"
              placeholder="Type here for a new category"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border-2 py-1 px-2 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 tracking-wide">{errors.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Update"
            className="bg-blue-500 rounded-md text-white w-full py-1 cursor-pointer"
          />
        </form>
        // {/* end Category Update Form */}
      )}
      <hr />

      {/* category table */}

      <table className="w-full text-center mt-6 border-2 p-3">
        <thead className="">
          <tr className="border-b-2">
            <th>#</th>
            <th>Name</th>
            <th>Parent Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="m-4">
          {categories?.map((category) => {
            return (
              <tr key={category.id} className="border-b-2 ">
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.parent_id ? category.parent_id : "-----"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(category.id)}
                    className=" bg-blue-500 px-2 py-1 rounded-md text-white"
                  >
                    Edit
                  </button>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 px-2 py-1 rounded-md my-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
