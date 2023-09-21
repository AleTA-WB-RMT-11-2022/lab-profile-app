// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MyProfilesPage from "./pages/MyProfilesPage";
import SearchPage from "./pages/SearchPage"

function App() {
  return (
    <div className="App container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-profiles" element={<MyProfilesPage />} />        
        <Route path="/:profileId" element={<ProfilePage />} />
        <Route path="/search/:searchParam" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
