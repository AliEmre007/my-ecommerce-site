import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'; // 1. Import

function App() {
  return (
    <div className="App">
      <header>
        <h1>My E-commerce Site</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} /> {/* 2. Add this route */}
        </Routes>
      </main>
    </div>
  );
}

export default App;