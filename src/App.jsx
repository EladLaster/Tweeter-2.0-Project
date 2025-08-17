import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TweetProvider } from './context/tweetContext';
import { UserProvider } from './context/userContext';
import { Profile } from './Pages/Profile';
import { Home } from './Pages/Home';
import { Navbar } from './Pages/NavBar';

function App() {
  return (
    <BrowserRouter basename="/Tweeter-2.0-Project/">
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
    </BrowserRouter>
  );
}

export default App;
