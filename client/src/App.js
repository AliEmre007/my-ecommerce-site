import './App.css';
// 1. Import routing components and your new screen
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My E-commerce Site</h1>
      </header>
      <main>
        {/* 2. Define your routes */}
        <Routes>
          {/* This route shows the HomeScreen component at the "/" URL */}
          <Route path="/" element={<HomeScreen />} />

          {/* We will create the ProductScreen component next */}
          {/* <Route path="/product/:id" element={<ProductScreen />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;