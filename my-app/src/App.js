import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './components/Main';
import Encouragement from './components/Encouragement';  
import MemoryGame from './components/MemoryGame';
import MineSearch from './components/MineSearch/MineSearch';
import BubbleComponent from './components/BubbleComponent';
import FeedEat from './components/FeedEat';
import Yok from './components/Yok';
import Reaction from './components/Reaction';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route index element={<Main />} />
          <Route path="/encouragement" element={<Encouragement />} />
          <Route path="/minesearch" element={<MineSearch />} />
          <Route path="/memorygame" element={<MemoryGame />} />
          <Route path="/BubbleComponent" element={<BubbleComponent /> } />
          <Route path="/FeedEat" element={ <FeedEat /> } />
          <Route path="/yok" element={ <Yok /> } />
          <Route path="/reaction" element={ <Reaction /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
