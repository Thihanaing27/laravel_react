import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    parent_id: "",
  });

  const getCat = async () => {
    try {
      const res = await axios.get(`/api/categories/show/${id}`);

      if (res.status == 200) {
        // setCategoties(res.data);
        setFormData({
          ...formData,
          name: res.data.name,
          parent_id: res.data.parent_id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
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
        navigate("/categories");
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Set validation errors
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    getCat();
  }, []);

  return (
    <form
      onSubmit={handleUpdate}
      className="w-2/5 mx-auto space-y-6 bg-white shadow-2xl px-10 py-20 mt-20 rounded-lg"
    >
      <h1 className="text-center font-bold text-xl">Edit</h1>

      {/* Category Name */}
      <div className="space-y-2">
        <label htmlFor="name">Category</label>
        <input
          type="text"
          placeholder="Type here for a new category"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
  );
};

export default Edit;
