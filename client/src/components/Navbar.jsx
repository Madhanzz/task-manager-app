import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div>
      <h2>Task Manager</h2>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;