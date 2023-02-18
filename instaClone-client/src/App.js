// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProfilePage from "./pages/ProfilePage";
import ProfilesPage from "./pages/ProfilesPage";
import PicsPage from "./pages/PicsPage";

function App() {
  return (
    <div className="App container m-0 mb-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/:profileId" element={<ProfilePage />} />
        <Route path="/pics/:profileId" element={<PicsPage />} />
      </Routes>
    </div>
  );
}

export default App;
