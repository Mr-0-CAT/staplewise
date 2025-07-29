import React, { useState } from 'react';
import { Plus, Package, MapPin, DollarSign } from 'lucide-react';
import { cashewGrades } from '../../data/mockData';

interface ProductListing {
  id: string;
  name: string;
  grade: string;
  costPerKg: number;
  minimumOrderQuantity: number;
  location: string;
  createdAt: Date;
}

const ListProduct: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<ProductListing[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    costPerKg: '',
    minimumOrderQuantity: '',
    location: 'Bangalore, Karnataka' // Auto-filled from company details
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: ProductListing = {
      id: Date.now().toString(),
      name: formData.name,
      grade: formData.grade,
      costPerKg: parseFloat(formData.costPerKg),
      minimumOrderQuantity: parseInt(formData.minimumOrderQuantity),
      location: formData.location,
      createdAt: new Date()
    };

    setProducts(prev => [newProduct, ...prev]);
    setFormData({
      name: '',
      grade: '',
      costPerKg: '',
      minimumOrderQuantity: '',
      location: 'Bangalore, Karnataka'
    });
    setShowForm(false);
    alert('Product listed successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-primary">List Product</h1>
          <p className="text-gray-600 mt-2">Add your cashew products to the marketplace</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
          <h2 className="text-xl font-bold font-playfair text-primary mb-6">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="e.g., Premium Cashew Kernels"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Grade *
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="">Select Grade</option>
                  {cashewGrades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost per KG (₹) *
                </label>
                <input
                  type="number"
                  name="costPerKg"
                  value={formData.costPerKg}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="e.g., 850"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Quantity (KG) *
                </label>
                <input
                  type="number"
                  name="minimumOrderQuantity"
                  value={formData.minimumOrderQuantity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="e.g., 100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  placeholder="Auto-filled from company details"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Location is auto-filled from your company registration details
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
              >
                List Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold font-playfair text-primary">Your Listed Products</h2>
        </div>

        {products.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {products.map((product) => (
              <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-primary mr-3">
                        {product.name}
                      </h3>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {product.grade}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <div>
                          <p className="text-sm">Price per KG</p>
                          <p className="font-semibold text-primary">₹{product.costPerKg}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Package className="w-4 h-4 mr-2" />
                        <div>
                          <p className="text-sm">Min. Order</p>
                          <p className="font-semibold">{product.minimumOrderQuantity} KG</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <div>
                          <p className="text-sm">Location</p>
                          <p className="font-semibold">{product.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <p className="text-sm text-gray-500">
                      Listed on {product.createdAt.toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-2">No products listed yet</p>
            <p className="text-gray-400 mb-6">Add your first product to start selling on StapleWise</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;