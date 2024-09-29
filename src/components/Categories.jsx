import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`
      );
      setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
      setHasMore(response.data.products.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Infinite Scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return;
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Handle search functionality
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="mb-4 p-2 border rounded-lg w-full"
      />

      {/* Products */}
      <h1 className="text-2xl font-bold mb-4 text-center m-5">All Products</h1>

      {loading && currentPage === 1 && ( // Show loader during initial load
        <div className="text-center">
          <p>Loading products...</p>
        </div>
      )}

      {filteredProducts.length === 0 && !loading ? ( // Show no products message if none available and not loading
        <div className="text-center p-4 bg-red-100 text-red-600 border border-red-300 rounded-md">
          <h2 className="text-lg font-semibold">Out of Stock</h2>
          <p>No products are available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

      {/* Loader for Infinite Scroll */}
      {loading && currentPage > 1 && ( // Show loader when fetching more products
        <div className="text-center">
          <p>Loading more products...</p>
        </div>
      )}

      <hr />

      {/* Categories */}
      <h1 className="text-2xl font-bold mb-4 text-center m-5">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          // Check if the category is an object or a string
          const categoryName = typeof category === 'object' ? category.name : category;
          return (
            <button
              key={index}
              className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-100 transition duration-200"
              onClick={() => navigate(`/products/${categoryName}`)}
            >
              <h2 className="text-lg font-semibold">{categoryName}</h2>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
