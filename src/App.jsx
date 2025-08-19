import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TweetProvider } from './context/tweetContext';
import { UserProvider } from './context/userContext';
import { Home } from './Pages/Home';
import { Profile } from './Pages/Profile';
import { Login } from './Pages/Login';
import { Navbar } from './Pages/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter basename="/Tweeter-2.0-Project/">
      <UserProvider>
        <TweetProvider>
          <Navbar />
          <div className="App">
            <h1>Tweeter 2.0</h1>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }/>
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }/>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </TweetProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
