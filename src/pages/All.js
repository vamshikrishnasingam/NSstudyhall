import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function All() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/students-api/get-all-students`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleRowClick = (item) => {
    navigate(`/details/${item._id}`, { state: { item} });
  };
   const renderFloorData = (floor, title) => (
    <div style={{ marginBottom: '20px' }}>
      <strong>{title}</strong>
      <table border="1" style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {groupedData[floor] ? (
            groupedData[floor].map(student => (
              <tr key={student._id}>
                <td onClick={() => handleRowClick(student)}>{student.name}</td>
                <td>{student.mobileNumber}</td>
                <td>{student.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const groupByFloor = (data) => {
    return data.reduce((acc, student) => {
      const floor = student.floorNo;
      if (!acc[floor]) {
        acc[floor] = [];
      }
      acc[floor].push(student);
      return acc;
    }, {});
  };
  const groupedData = groupByFloor(data);

  return (
    <div>
      <h1>All Students Data:</h1>
      {/* {renderFloorData('1', 'First Floor AC')}
      {renderFloorData('2', 'Second Floor AC')}
      {renderFloorData('3', 'Third Floor Non-AC')} */}
      {renderFloorData('', 'Previous Members')}
    </div>
  );
}

export default All;
