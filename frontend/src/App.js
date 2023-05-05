import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import BlogPage from './components/BlogPage';
import EditPostPage from './components/EditPostPage';
import BlogDataService from './services/blogService';
import ContactPage from './components/ContactPage';
import Login from './components/Login';

function App() {

  // Code to test connection to database
  // BlogDataService.getAll().then(response => {
  //   console.log(response.data);
  // })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/blog" element={<BlogPage/>}></Route>
        <Route path="/edit" element={<EditPostPage/>}></Route>
        <Route path="/edit/:id" element={<EditPostPage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
