import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BackendURL } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error("Fetch list error:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        BackendURL + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product removed successfully");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to remove product");
      console.error("Remove product error:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Item List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map((item, index) => (
          <div key={index} className="border p-4 rounded-md shadow relative">
            {/* ❌ Remove X Button */}
            <p
              className="absolute top-2 right-3 text-xl font-bold text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => removeProduct(item._id)}
              title="Delete product"
            >
              X
            </p>

            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>

            {/* Description with scroll */}
            <p className="text-sm text-gray-600 mb-2 break-words max-h-24 overflow-auto">
              {item.description}
            </p>

            <p className="text-sm font-medium mb-1">Price: ₹{item.price}</p>

            <p className="text-sm mb-1">
              <strong>Category:</strong> {item.category}
            </p>
            <p className="text-sm mb-1">
              <strong>Subcategory:</strong> {item.subCategory}
            </p>

            <p className="text-sm mb-2">
              <strong>Sizes:</strong>{" "}
              {item.sizes && item.sizes.length > 0 ? item.sizes.join(", ") : "N/A"}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.image.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Product ${i + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
