import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/axios";

const Show = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const getProduct = async () => {
    const res = await axios.get(`api/product/${id}`);
    // console.log(res);
    if (res.status == 200) {
      setProduct(res.data);
    }
  };

  useEffect(() => {
    getProduct();
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
      <div className="w-2/3 mx-auto bg-slate-100 p-4 rounded-xl shadow-2xl">
        <div className="flex">
          <p>{product?.user.name}</p>

          <div className="flex-1 text-end ">
            <span className="text-gray-600 text-xs">{product?.created_at}</span>
          </div>
        </div>
        <div>
          <p className="my-4">{product?.name}</p>
          <div>{product?.description}</div>
        </div>
        <div className=" text-end flex justify-end items-center gap-2">
          <button className="bg-blue-500 px-2 py-1 rounded-md text-white">
            Edit
          </button>{" "}
          |
          <button className="bg-red-500 px-2 py-1 rounded-md text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Show;
