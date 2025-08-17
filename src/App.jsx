import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TweetProvider } from './context/tweetContext';
import { UserProvider } from './context/userContext';
import { Profile } from './Pages/Profile';
import { Home } from './Pages/Home';
import { Navbar } from './Pages/NavBar';

function App() {
  return (
    <Router>
      <UserProvider>
        <TweetProvider>
          <Navbar />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </TweetProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
