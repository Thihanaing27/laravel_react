import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAppProvider } from "../../context/Context";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useAppProvider();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    user_id: user.id,
    category_id: "",
  });

  const [categories, setCategoties] = useState();

  const getCat = async () => {
    try {
      const res = await axios.get("/api/categories");

      if (res.status == 200) {
        setCategoties(res.data);
      }
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.post("api/product", formData);
      alert("Product created successfully!");
      navigate("/vendor/products");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  //fetch categories
  useEffect(() => {
    getCat();
  }, []);
  return (
    <div className="w-full bg-white p-4 h-screen">
      <div>
        <Link to="/vendor/products">
          <button className="bg-gray-500 text-white px-1 py-1 rounded-md">
            Back
          </button>
        </Link>
      </div>
      <div>
        <form
          onSubmit={handleCreate}
          className="w-[90%] mx-auto space-y-6  px-10 py-5  rounded-lg"
        >
          <h1 className="text-xl font-semibold text-center">
            Create a new product
          </h1>
          {/* Product Name */}
          <div className="space-y-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Product Name"
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

          {/* Product Description */}
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <textarea
              className="w-full border-2 py-1 px-2 rounded-md"
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />

            {errors.description && (
              <p className="text-red-500 tracking-wide">{errors.description}</p>
            )}
          </div>

          {/* Product Price */}
          <div className="space-y-2">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              placeholder="0000.0000"
              id="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border-2 py-1 px-2 rounded-md"
            />
            {errors.price && (
              <p className="text-red-500 tracking-wide">{errors.price}</p>
            )}
          </div>

          {/* Product Stock */}
          <div className="space-y-2">
            <label htmlFor="stock">Stock</label>
            <input
              type="text"
              placeholder="000"
              id="stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="w-full border-2 py-1 px-2 rounded-md"
            />
            {errors.stock && (
              <p className="text-red-500 tracking-wide">{errors.stock}</p>
            )}
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="w-full border-2 py-1 px-2 rounded-md"
              value={formData.category_id}
              onChange={(e) =>
                setFormData({ ...formData, category_id: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <input
            type="submit"
            value="Create"
            className="bg-blue-500 rounded-md text-white w-full py-1 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
