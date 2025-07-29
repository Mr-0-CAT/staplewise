import React, { useState } from 'react';
import { Save, Building, MapPin, Calendar, FileText } from 'lucide-react';
import { CompanyDetails as CompanyDetailsType } from '../../types';

const CompanyDetails: React.FC = () => {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsType>({
    name: '',
    location: '',
    address: {
      street1: '',
      street2: '',
      pincode: '',
      state: ''
    },
    registrarName: '',
    gstin: '',
    yearEstablished: new Date().getFullYear()
  });

  const [isEditing, setIsEditing] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCompanyDetails(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setCompanyDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company details saved:', companyDetails);
    setIsEditing(false);
    alert('Company details saved successfully!');
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-primary">Company Details</h1>
          <p className="text-gray-600 mt-2">Manage your company information and registration details</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            Edit Details
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Identity */}
          <div>
            <div className="flex items-center mb-6">
              <Building className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-bold font-playfair text-primary">Company Identity</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={companyDetails.name}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={companyDetails.location}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center mb-6">
              <MapPin className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-bold font-playfair text-primary">Address</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address 1 *
                </label>
                <input
                  type="text"
                  name="address.street1"
                  value={companyDetails.address.street1}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                  placeholder="Building number, street name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address 2
                </label>
                <input
                  type="text"
                  name="address.street2"
                  value={companyDetails.address.street2}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                  placeholder="Area, landmark"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={companyDetails.address.pincode}
                    onChange={handleInputChange}
                    required
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                    placeholder="6-digit pincode"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="address.state"
                    value={companyDetails.address.state}
                    onChange={handleInputChange}
                    required
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div>
            <div className="flex items-center mb-6">
              <FileText className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-bold font-playfair text-primary">Registration Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registrar Name *
                </label>
                <input
                  type="text"
                  name="registrarName"
                  value={companyDetails.registrarName}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                  placeholder="Name of the registrar"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GSTIN *
                </label>
                <input
                  type="text"
                  name="gstin"
                  value={companyDetails.gstin}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                  placeholder="15-digit GST number"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Establishment *
                </label>
                <input
                  type="number"
                  name="yearEstablished"
                  value={companyDetails.yearEstablished}
                  onChange={handleInputChange}
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  disabled={!isEditing}
                  className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Details
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyDetails;