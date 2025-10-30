import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'; // 1. Import

function App() {
  return (
    <div className="App">
      <header>
        <h1>My E-commerce Site</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          
          {/* 2. Add/Uncomment this line */}
          <Route path="/product/:id" element={<ProductScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;