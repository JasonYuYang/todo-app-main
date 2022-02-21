import React, { useState, useEffect } from 'react';

import { TodoContextProvider } from './store/TodoContext';

import Todos from './components/Todos';
import Form from './components/Form';
import Headers from './components/Headers';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.body.className = 'background';
    document.body.classList.add(`${theme}mode`);
  }, [theme]);

  const handleOnClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <TodoContextProvider>
      <main>
        <Headers themeOption={theme} onClick={handleOnClick} />
        <Form />
        <Todos />
      </main>
    </TodoContextProvider>
  );
}

export default App;
