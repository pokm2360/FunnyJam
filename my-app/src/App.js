import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardGame from './components/CardGame';
import Main from './components/Main';
import Cloud from './components/Games/Cloud';
import Clover from './components/Games/Clover';
import Balloon from './components/Games/Balloon';
import Curse from './components/Games/Curse';
import Encouragement from './components/Encouragement';  
import MemoryGame from './components/MemoryGame';
import Form from './components/Games/MineSearch/Form';
import MineSearch2 from './components/Games/MineSearch/MineSearch2';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="#main" element={<Main />} />
          <Route index element={<Main />} />
          <Route path="#clover" element={<Clover />} />
          <Route path="#cloud" element={<Cloud />} />
          <Route path="/balloon" element={<Balloon />} />
          <Route path="#curse" element={<Curse />} />
          <Route path="/encouragement" element={<Encouragement />} />
          <Route path="/MemoryGame" element={<MemoryGame />} />
          <Route path="/minesearch" element={<Form />} />
          <Route path="/minesearch2" element={<MineSearch2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
