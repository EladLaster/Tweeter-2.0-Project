import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TweetProvider } from './context/tweetContext';
import { UserProvider } from './context/userContext';
import { Profile } from './Pages/Profile';
import { Home } from './Pages/Home';
import { Navbar } from './Pages/NavBar';
import { Login } from './Pages/login';
import { ProtectedRoute } from './components/protectedRoute'; 

function App() {
  return (
    <BrowserRouter basename="/Tweeter-2.0-Project/">
      <UserProvider>
        <TweetProvider>
          <Navbar />
          <div className="App">
            <h1>Tweeter 2.0</h1>
            <Routes>
              {/* דפים מוגנים */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* דפים פתוחים */}
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </TweetProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
