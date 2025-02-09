import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CodeContext, UserContext, randomWordsContext } from './helpers/context';
import Multiplayer from './routes/Multiplayer';
import Login from './routes/Login';
import Home from './routes/Home';
import User from './routes/User';
import Nav from './components/Nav';
import Leaderboard from './routes/Leaderboard';
import LayoutWrapper from './components/LayoutWrapper';
import './App.css';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import ForgotPassword from './routes/ForgotPassword';
import CreateKeyboard from './routes/CreateKeyboard';
import RandomWords from './helpers/RandomWords';

//!! toggle dark mode
import { ThemeProvider } from './helpers/ThemeContext';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState(); // user state, set at login
  const [userKeyboards, setUserKeyboards] = useState(); // array of keyboards for the user, set at login
  const [currentKeyboard, setCurrentKeyboard] = useState(); // this is the id of the current keyboard, set when user goes to TypingField
  const [codeEntered, setCodeEntered] = useState();
  const [userScore, setUserScore] = useState(); // this is the score of the user, gets set when the user finishes typing
  const [guestName, setGuestName] = useState(
    uniqueNamesGenerator({ dictionaries: [adjectives, animals] }).toUpperCase()
  ); // this is the name of the guest user, set when user goes to TypingField

  // context for randomWords
  const [randomWords, setRandomWords] = useState(RandomWords({ time: 1, numWords: 100 }));

  useEffect(() => {
    // continually updates, checking if no user is signed in. if there isnt, set the current user to the localStorage data for user, keyboards, and current keyboard.
    if (
      !user &&
      window.localStorage.getItem('user') !== 'undefined' &&
      window.localStorage.getItem('keyboards') !== 'undefined'
    ) {
      setUser(JSON.parse(window.localStorage.getItem('user')));
      setUserKeyboards(JSON.parse(window.localStorage.getItem('keyboards')));
    }
  });

  useEffect(() => {
    // when user is signed in, userkeyboards change, or currentkeyboard changes update the local data.
    window.localStorage.setItem('user', JSON.stringify(user));
    window.localStorage.setItem('keyboards', JSON.stringify(userKeyboards));
    window.localStorage.setItem('currentKeyboard', currentKeyboard);
  }, [user, userKeyboards, currentKeyboard]);

  // this will wrap all other components
  return (
    <BrowserRouter>
      <ThemeProvider>
        <randomWordsContext.Provider value={{ randomWords, setRandomWords }}>
          <UserContext.Provider
            value={{
              user,
              setUser,
              userKeyboards,
              setUserKeyboards,
              currentKeyboard,
              setCurrentKeyboard,
              userScore,
              setUserScore,
              guestName,
              setGuestName,
            }}
          >
            <CodeContext.Provider value={{ codeEntered, setCodeEntered }}>
              <div className="bg-beige transition-all dark:bg-cosmic-purple">
                <Nav />

                <LayoutWrapper>
                  <Routes>
                    <Route path="/cthulhu-teaches-typing/" element={<Home />} />
                    <Route path="/cthulhu-teaches-typing/multiplayer" element={<Multiplayer />} />
                    <Route path="/cthulhu-teaches-typing/login" element={<Login />} />
                    <Route path="/cthulhu-teaches-typing/leaderboard" element={<Leaderboard />} />
                    <Route path="/cthulhu-teaches-typing/user" element={<User />} />
                    <Route path="/cthulhu-teaches-typing/forgot-password" element={<ForgotPassword />} />
                    <Route path="/cthulhu-teaches-typing/create-keyboard" element={<CreateKeyboard />} />
                  </Routes>
                </LayoutWrapper>
              </div>
            </CodeContext.Provider>
          </UserContext.Provider>
        </randomWordsContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
