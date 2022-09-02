import { useState } from 'react';

import TypingField from './components/TypingField';
import HomepageHeader from './components/HomepageHeader';
import LayoutWrapper from './components/LayoutWrapper';
import { Routes, Route } from "react-router-dom"
import About from "./components/About/About"

import { UserContext } from './helpers/context';

// parent component for all other components
export default function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  )
}

// !! needs refactoring to another file
function Home() {
  return (
    <LayoutWrapper>
        <HomepageHeader />
        <TypingField />
      </LayoutWrapper>
    </UserContext.Provider>
  );
}