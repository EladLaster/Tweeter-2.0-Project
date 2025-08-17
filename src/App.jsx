import './App.css'
import { TweetList } from './components/tweetList';
import { InputTweet } from './components/inputTweet'
import { TweetProvider } from './context/tweetContext';

function App() {
  return (
    <TweetProvider>
      <div className="App">
        <h1>Tweeter</h1>
        <InputTweet />
        <TweetList />
      </div>
    </TweetProvider>
  );
}

export default App;