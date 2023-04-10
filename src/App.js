import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Course from './pages/Course';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Course courseName="Fundamentals" courseCode="CSE-1010" semesterYear="1st Year 1st Semester"/>}/>
      </Routes>
    </Router>
    

  );
}

export default App;
