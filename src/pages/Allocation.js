import React, { useState } from 'react';
import axios from 'axios';

const Allocation = () => {
  const [formData, setFormData] = useState({
    name: '',
    floorNo: '',
    cabinNo: '',
    dateOfJoining: '',
    mobileNumber: '',
    address: '',
    payments: {}
  });

  const generateMonthLabels = () => {
    const labels = [];
    const currentDate = new Date();

    for (let i = -4; i <= 1; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i);
      labels.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    }

    return labels;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate payment data for the months
    const monthLabels = generateMonthLabels();
    const paymentsData = {};
    monthLabels.forEach(label => {
      paymentsData[label] = false;
    });

    // Set the payments data in the formData state
    const updatedFormData = { ...formData, payments: paymentsData };

    // Submit form data to the backend
    try {
      const response = await axios.post(`/students-api/add-student`, updatedFormData);
      alert(response.data.message);
      console.log('Form Submitted:', updatedFormData);
      if (response.status !== 409)
      // Reset form data after submission
      setFormData({
        name: '',
        floorNo: '',
        cabinNo: '',
        dateOfJoining: '',
        mobileNumber: '',
        address: '',
        payments: {}
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="floorNo">Floor No:</label>
        <input
          type="text"
          id="floorNo"
          name="floorNo"
          value={formData.floorNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cabinNo">Cabin No:</label>
        <input
          type="text"
          id="cabinNo"
          name="cabinNo"
          value={formData.cabinNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dateOfJoining">Date of Joining:</label>
        <input
          type="date"
          id="dateOfJoining"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Allocation;
