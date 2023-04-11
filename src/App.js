import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Course from './pages/Course';
import Question from './pages/Question';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/question" exact element={<Question course="CSE-4102: Fundamental of Everything Computer Related" batch="25" examType="Final" />} />
        <Route path="/course" exact element={<Course courseCode="CSE-4102" courseName="Fundamental of Everything Computer Related" semesterYear="1st Semester 1st Year"/>} />

      </Routes>
    </Router>
    

  );
}

export default App;
