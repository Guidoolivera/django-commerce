import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ArticleForm from './components/ArticleForm';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <div className='bg-slate-800 h-screen'>
      <BrowserRouter>
        <div className='container mx-auto '>
          <Navigation />
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/articles/create" element={
              <ProtectedRoute>
                <ArticleForm />
              </ProtectedRoute>
            } />
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="*" element={<Navigate to="/home" />} />
            {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          </Routes>
          <Toaster />

        </div>
        <Footer />
      </BrowserRouter>

    </div>

  )
}

export default App