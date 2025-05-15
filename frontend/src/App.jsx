import react from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Schools from "./pages/Schools";
import Teachers from "./pages/Teachers";
import Parents from "./pages/Parents";
import Students from "./pages/Students";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";



function Logout() {
  localStorage.clear();
  return <Navigate to="/login"/>
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin" element={
          <ProtectedRoute onlyStaff={true}>
              <Admin />
          </ProtectedRoute>
          }
        />
        <Route path="/schools" element={
            <ProtectedRoute>
                <Schools />
            </ProtectedRoute>
            }
        />
        <Route path="/teachers" element={
            <ProtectedRoute>
                <Teachers />
            </ProtectedRoute>
        }
        />
        <Route path="/parents" element={
            <ProtectedRoute>
                <Parents />
            </ProtectedRoute>
        }
        />
        <Route path="/students" element={
            <ProtectedRoute>
                <Students />
            </ProtectedRoute>
        }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
