import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const Products = () => {
  const [products, setProducts] = useState();

  const getProduct = async () => {
    const res = await axios.get("api/product");
    console.log(res);
    if (res.status == 200) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="w-full bg-white p-4 h-screen">
      <div className="text-end my-4">
        <Link to="/vendor/add-product">
          <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
            Add Product
          </button>
        </Link>
      </div>
      <hr />
      <div className="my-4">
        <h1 className="text-xl font-semibold text-center">Products List</h1>
        <div className="flex flex-wrap gap-8">
          {products?.map((product) => {
            return (
              <div
                className="w-80 flex-1 bg-white shadow-xl px-2 py-6"
                key={product.id}
              >
                <div className="flex justify-between">
                  <p>{product.name}</p>
                  <div className="flex gap-2 items-center">
                    <span className="inline text-sm text-gray-500">
                      11.3.2024
                    </span>
                    <p>{product.user.name}</p>
                  </div>
                </div>
                <div className="my-4">
                  <p>this is description</p>
                </div>
                <div>
                  <p>Price - 12000</p>
                </div>
                <Link to={`/vendor/show/${product.id}`}>
                  <button className="bg-blue-500 px-2 py-1 text-white rounded-lg text-end float-end">
                    Read More...
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
