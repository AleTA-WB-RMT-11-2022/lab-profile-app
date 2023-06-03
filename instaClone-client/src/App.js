// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MyProfilesPage from "./pages/MyProfilesPage";

function App() {
  return (
    <div className="App container m-0 mb-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-profiles" element={<MyProfilesPage />} />        
        <Route path="/:profileId" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
