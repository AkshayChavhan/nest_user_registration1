import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ProtectedRoutes from "./routes/protectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" 
        // element={<ProtectedRoutes />}
        >
          <Route index element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
