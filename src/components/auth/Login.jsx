import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAppProvider } from "../../context/Context";

const Login = () => {
  const { getUser, roleMapping } = useAppProvider();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.post("/login", formData);

      if (res.status === 200) {
        setFormData({
          email: "",
          password: "",
        });

        const userRole = await getUser();

        const rolePath = roleMapping[userRole] || "unknown";

        if (rolePath == "customer") {
          navigate(`/${rolePath}/profile`);
        } else {
          navigate(`/${rolePath}`);
        }
      }
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-2/5 mx-auto space-y-6 bg-white shadow-2xl px-10 py-20 mt-20 rounded-lg"
    >
      <h1 className="text-center font-bold text-xl">Login</h1>
      <div className="space-y-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="example@gmail.com"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full border-2 py-1 px-2 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 tracking-wide">{errors.password}</p>
        )}
      </div>
      <input
        type="submit"
        value="Login"
        className="bg-blue-500 rounded-md text-white w-full py-1"
      />
      <div className="text-center ">
        <p>Don't you have an account?</p>
        <p>
          <Link to="/register">
            <span className="text-blue-500">click here</span>
          </Link>{" "}
          to create.
        </p>
      </div>
    </form>
  );
};

export default Login;
