import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TweetProvider } from './context/tweetContext';
import { UserProvider } from './context/userContext';
import { Profile } from './Pages/Profile';
import { Home } from './Pages/Home';
import { Navbar } from './Pages/NavBar';
import { Login } from './Pages/Login';
import { SignUp } from './Pages/SignUp';
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
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </TweetProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
