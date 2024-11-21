import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAppProvider } from "../../context/Context";

const Register = () => {
  const { getUser, roleMapping } = useAppProvider();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.get("/sanctum/csrf-cookie ");

      const res = await axios.post("/register", formData);
      if (res.status === 200) {
        setformData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        const userRole = await getUser();

        const rolePath = roleMapping[userRole] || "unknown";

        if (rolePath == "customer") {
          navigate(`/${rolePath}/profile`);
        } else {
          navigate(`/${rolePath}/dashboard`);
        }
      }
    } catch (error) {
      // console.log(error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="w-2/5 mx-auto space-y-6 bg-white shadow-2xl px-10 py-20 mt-20 rounded-lg"
    >
      <h1 className="text-center font-semibold text-xl">Register</h1>
      <div className="space-y-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Jhon"
          id="name"
          value={formData.name}
          onChange={(e) => setformData({ ...formData, name: e.target.value })}
          className="w-full border-2 py-1 px-2 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 tracking-wide">{errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="example@gmail.com"
          id="email"
          value={formData.email}
          onChange={(e) => setformData({ ...formData, email: e.target.value })}
          className="w-full border-2 py-1 px-2 rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 tracking-wide">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="example@gmail.com"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setformData({ ...formData, password: e.target.value })
          }
          className="w-full border-2 py-1 px-2 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 tracking-wide">{errors.password}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input
          type="password"
          placeholder="example@gmail.com"
          id="password_confirmation"
          value={formData.password_confirmation}
          onChange={(e) =>
            setformData({ ...formData, password_confirmation: e.target.value })
          }
          className="w-full border-2 py-1 px-2 rounded-md"
        />
      </div>
      <input
        type="submit"
        value="Register"
        className="bg-blue-500 rounded-md font-semibold text-white w-full py-1"
      />
      <div className="text-center ">
        <p>Did you already have an account?</p>
        <p>
          <Link to="/login">
            <span className="text-blue-500">click here</span>
          </Link>{" "}
          to Login.
        </p>
      </div>
    </form>
  );
};

export default Register;
