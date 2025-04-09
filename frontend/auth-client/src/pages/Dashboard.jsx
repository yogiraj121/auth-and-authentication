import { useEffect, useState } from "react";
import API from "../api";
import "../styles/auth.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user/profile")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.log("Not authenticated", err);
      });
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
