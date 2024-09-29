import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        // Directly use `category` string in the API call.
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
        setProducts(response.data.products); // Assuming response.data.products contains the product list
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="p-6">
      {/* Displaying the category as a string */}
      <button className="px-4 py-1 bg-green-400 rounded-md text-2xl" onClick={()=> navigate('/')} >Back</button>
      <h1 className="text-2xl font-bold mb-4">Products in {category}</h1>
      {products.length === 0 ? (
        <div className="text-center p-4 bg-red-100 text-red-600 border border-red-300 rounded-md">
          <h2 className="text-lg font-semibold">Out of Stock</h2>
          <p>No products are available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 ">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg shadow-md p-4 flex flex-col hover:scale-105">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mb-2 w-full h-32 object-cover rounded"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">Rating: {product.rating} ⭐</span>
              </div>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
