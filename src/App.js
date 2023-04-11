import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Course from './pages/Course';
import Question from './pages/Question';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResult from './pages/SearchResult';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/question" exact element={<Question course="CSE-4102: Fundamental of Everything Computer Related" batch="25" examType="Final" />} />
        <Route path="/course" exact element={<Course courseCode="CSE-4102" courseName="Fundamental of Everything Computer Related" semesterYear="1st Semester 1st Year"/>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/result" exact element={<SearchResult />} />

        <Route path="/profile" exact element={<Profile />} />

      </Routes>
    </Router>
    

  );
}

export default App;
