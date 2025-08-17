# Tweeter App

A simple Twitter-like app built with **React** and **Vite**.  
Users can post tweets, view tweets from a server (Supabase), and see loading/error states.

## Features

- Post new tweets (max 140 characters)  
- View tweets in descending order (latest first)  
- Show username and timestamp for each tweet  
- Disable tweet button while posting  
- Display server errors

## Technologies

- React  
- Vite  
- Supabase REST API  
- CSS

## Installation

git clone https://github.com/your-username/tweeter-app.git
cd tweeter-app
npm install

## Running the App

npm run dev
Open http://localhost:5173 in your browser.

## Folder Structure

src/
├─ components/      # InputTweet, TweetList, Tweet
├─ context/         # React context for global state
├─ reducer/         # Optional: useReducer implementation
├─ App.jsx
├─ main.jsx
└─ index.css

## Usage

* Type your tweet and press Enter or click Tweet

* Tweets are fetched from Supabase on load

* Tweet button is disabled when:

1) Text is empty

2) Text exceeds 140 characters

3) Request is in progress
