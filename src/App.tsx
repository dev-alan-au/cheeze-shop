import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layouts/Main';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Account from './pages/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
