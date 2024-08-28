import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./All.css"; // Import custom CSS
import { Button, Offcanvas, Table, Container, Row, Col } from "react-bootstrap";

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
    navigate(`/details/${item._id}`, { state: { item } });
  };

  const renderFloorData = (floor, title) => (
    <div className="floor-container">
      <h2 className="floor-title">{title}</h2>
      <Table
        striped
        bordered
        hover
        responsive
        variant="dark"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {groupedData[floor] ? (
            groupedData[floor].map((student) => (
              <tr
                key={student._id}
                className="student-row"
                onClick={() => handleRowClick(student)}
              >
                <td>{student.name}</td>
                <td>{student.mobileNumber}</td>
                <td>{student.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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
    <div className="all-students-container">
      <h1 className="main-title">All Students Data</h1>
      {/* Uncomment if needed */}
      {/* {renderFloorData('1', 'First Floor AC')}
      {renderFloorData('2', 'Second Floor AC')}
      {renderFloorData('3', 'Third Floor Non-AC')} */}
      {renderFloorData("", "Previous Members")}
    </div>
  );
}

export default All;
