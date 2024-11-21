import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Appcontext = createContext(); // Define and export the context

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // sessionStorage ရှိ user data ကို JSON အနေနဲ့ ဖတ်
    const sessionUser = sessionStorage.getItem("user");
    return sessionUser ? JSON.parse(sessionUser) : null;
  });

  const getUser = async () => {
    try {
      // CSRF cookie ကို fetch
      await axios.get("/sanctum/csrf-cookie");

      // API မှာ user data ကို fetch
      const { data } = await axios.get("api/user");

      // State ကို update လုပ်ပြီး sessionStorage ထဲမှာ သိမ်း
      setUser(data);
      const userRole = data.role;
      sessionStorage.setItem("user", JSON.stringify(data));
      return userRole;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const logout = async () => {
    try {
      // Laravel မှာ logout API ကို call
      await axios.post("/logout");

      // sessionStorage ထဲက user data ကို ဖျက်
      sessionStorage.removeItem("user");

      // user state ကို null ပြန်သတ်မှတ်
      setUser(null);

      // Optional: Login page သို့ navigate
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const roleMapping = {
    0: "admin",
    1: "vendor",
    2: "customer",
  };

  const role = roleMapping[user?.role] || "unknown";

  return (
    <Appcontext.Provider value={{ user, getUser, logout, roleMapping, role }}>
      {children}
    </Appcontext.Provider>
  );
};

// Custom hook to use the context
export const useAppProvider = () => {
  return useContext(Appcontext);
};

export default Appcontext;
