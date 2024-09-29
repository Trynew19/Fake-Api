import {  Route, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import Products from "./components/Products";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/products/:category" element={<Products />} />
      </Routes>
      <h1 className="text-center text-red-500 text-2xl m-10">Made by Krishna chauhan</h1>
    </div>
  );
};

export default App;
