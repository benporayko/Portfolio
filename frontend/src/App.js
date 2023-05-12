import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import BlogPage from './components/BlogPage';
import EditPostPage from './components/EditPostPage';
import ContactPage from './components/ContactPage';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/blog" element={<BlogPage/>}></Route>
        <Route path="/edit" element={<EditPostPage/>}></Route>
        <Route path="/edit/:id" element={<EditPostPage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
