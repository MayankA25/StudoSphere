import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import { useThemeStore } from "./store/useThemeStore";
import HomePage from "./pages/HomePage/HomePage";
import { Toaster } from "react-hot-toast";
import Welcome from "./components/Welcome/Welcome";
import FullCalendar from "./pages/FullCalendar/Calendar";
import Profile from "./components/Profile/Profile";
import Form from "./components/Form/Form";
import Loader from "./components/Loader/Loader";
function App() {
  const { getUser, user, loggingIn } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="relative" data-theme={theme}>
      {loggingIn && <Loader/>}
      <Navbar />
    <div className="bg-gradient-to-br from-0% to-slate-900 h-[100vh] relative overflow-y-scroll" >
      <Routes>
        <Route exact path="/" element={user == null || user?.user.formSubmitted ?  <HomePage /> : <Navigate to="/form"/>}></Route>
        <Route exact path="/form" element={user== null || user?.user.formSubmitted ?<Navigate to={"/"}/> : <Form/>}/>
        <Route
          exact
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to={"/"} />}
          ></Route>
        <Route
          exact
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/dashboard"} />}
          ></Route>
        <Route
          exact
          path="/fullcalendar"
          element={user ? <FullCalendar /> : <Navigate to={"/"} />}
          ></Route>
        <Route exact path="/settings" element={<Settings />}></Route>
        <Route exact path="/profile" element={user ? <Profile/> : <Navigate to={"/"}/>}></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
          </div>
  );
}

export default App;
