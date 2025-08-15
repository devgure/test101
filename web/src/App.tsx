// web/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;