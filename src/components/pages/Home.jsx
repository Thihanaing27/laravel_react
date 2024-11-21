import { useAppProvider } from "../../context/Context";

const Home = () => {
  const { user, roleMapping } = useAppProvider();

  return (
    <div>
      home {user?.name}
      <p>Your role: {roleMapping[user?.role] || "Unknown Role"}</p>
    </div>
  );
};

export default Home;
