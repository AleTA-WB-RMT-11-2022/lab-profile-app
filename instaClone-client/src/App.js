// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import { Route, Routes } from "react-router-dom";
// import CloudinaryUploadWidget from "./components/CloudinaryUploadWidget";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./pages/Profile";

//import Signup from "./components/Signup";


function App() {

  return (
    <div className="App container m-0">
  <Navbar />
   <Routes >
   <Route path="/" element={ <HomePage /> } />
   <Route path="/signup" element={ <Signup /> } />
   <Route path="/login" element={<Login />} />
   <Route path="/profile/:id" element={<Profile />} />
    {/* <Route path="/" element={<CloudinaryUploadWidget/>} /> */}
    
   </Routes>
   
    </div>
  );
}

export default App;