import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Pages/SignIN";
import Signup from "./Pages/SignUp";
import Todo from "./Components/Todo";
import ErrorPage from "./Pages/ErrorPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Logout from "./Pages/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/createtodo" element={<Todo />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;