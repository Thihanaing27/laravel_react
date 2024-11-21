import { useState } from "react";
import axios from "../../../api/axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    parent_id: "",
  });

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

  return (
    <form
      onSubmit={handleCreate}
      className="w-2/5 mx-auto space-y-6 bg-white shadow-2xl px-10 py-20 mt-20 rounded-lg"
    >
      <h1 className="text-center font-bold text-xl">Create</h1>

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
        value="Create"
        className="bg-blue-500 rounded-md text-white w-full py-1 cursor-pointer"
      />
    </form>
  );
};

export default Create;
