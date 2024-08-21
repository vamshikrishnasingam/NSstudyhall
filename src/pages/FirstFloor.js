import React, { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


function FirstFloor() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [months, setMonths] = useState([]);
  const [allottedSeats, setAllottedSeats] = useState([]);
  const [remainingSeats, setRemainingSeats] = useState([]);
  const totalSeats = 100;

  const handleRowClick = (item) => {
    navigate(`/details/${item._id}`, { state: { item, monthLabels: months } });
  };

  useEffect(() => {
    const fetchkeys = async () => {
      await axios
        .get(`/students-api/get-students/1`)
        .then((response) => {
          console.log("data : ", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchkeys();
    setMonths(generateMonthLabels());
  }, []);

  useEffect(() => {
    if (data.length) generateSeats(totalSeats);
  }, [data]);

  const generateSeats = (n) => {
    const arr = data.map(item => item.cabinNo);
    console.log('Allocated Seats:', arr);
    const allSeats = Array.from({ length: n }, (_, i) => String(i + 1));
    const unallocatedSeats = allSeats.filter(seat => !arr.includes(seat));
    console.log('Unallocated Seats:', unallocatedSeats);
    setAllottedSeats(arr);
    setRemainingSeats(unallocatedSeats);
  };

  const generateMonthLabels = () => {
    const labels = [];
    const currentDate = new Date();
    for (let i = -5; i <= 2; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i);
      labels.push(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    }
    setMonths(labels);
    return labels;
  };

  const handleCheckboxClick = async (studentId, monthIndex) => {
    const updatedData = data.map(student => {
      if (student._id === studentId) {
        const updatedPayments = student.payments;
        if (!updatedPayments[monthIndex]) {
          updatedPayments[monthIndex] = true;
          axios.post(`/students-api/update-payment/${studentId}`, { monthIndex })
            .then(response => {
              console.log('Payment updated successfully:', response.data);
              alert(response.data.message);
            })
            .catch(error => {
              console.error('Error updating payment:', error);
            });
        }
        return { ...student, payments: updatedPayments };
      }
      return student;
    });
    console.log('data after : ', updatedData);
    setData(updatedData);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = async() => {
    setData(prevData =>
      prevData.map(item => (item._id === selectedItem._id ? selectedItem : item))
    );
    await axios.post(`/students-api/update-student-seat/${selectedItem._id}`, selectedItem)
      .then(response => {
        console.log('Student updated successfully:', response.data);
        if(response.status ===200 )
        alert('Student details updated successfully');
        if(response.status ===404 )
          alert(response.data.message);
        if(response.status ===400 || response.setAllottedSeats===500 )
          alert('Student update failed');
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
    setShow(false);
  };

  const handleChangeSeat = (item) => {
    setSelectedItem(item);
    handleShow();
  };

  return (
    <div>
      <h1>First Floor AC</h1>
      <div>
        <h1>Allocated Seats : </h1>
        {
          allottedSeats.map((item, index) => (
            <p key={index} style={{ display: 'inline', marginRight: '10px' }}>{item}</p>
          ))
        }
      </div>
      <div>
        <h1>Remaining Seats : </h1>
        {
          remainingSeats.map((item, index) => (
            <p key={index} style={{ display: 'inline', marginRight: '10px' }}>{item}</p>
          ))
        }
      </div>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>CabinNo</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Payments</th>
              <th>Date of Joining</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.cabinNo}</td>
                <td onClick={() => handleRowClick(item)}>{item.name}</td>
                <td>{item.mobileNumber}</td>
                <td>
                  {months.map((month, index) => (
                    <label key={index} style={{ marginRight: '10px' }}>
                      {month}:
                      <input
                        type="checkbox"
                        checked={item.payments[month] === true ? true : false}
                        style={{ marginLeft: '5px' }}
                        onClick={() => handleCheckboxClick(item._id, month)}
                      />
                    </label>
                  ))}
                </td>
                <td>{item.dateOfJoining}</td>
                <td>{item.address}</td>
                <Button onClick={() => handleChangeSeat(item)}>Change Seat</Button>
                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Student Details Editing</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    Change the details you want to edit :
                    {selectedItem && (
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={selectedItem.name}
                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  Floor:
                  <input
                    type="text"
                    value={selectedItem.floorNo}
                    onChange={(e) => setSelectedItem({ ...selectedItem, floorNo: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  Cabin No:
                  <input
                    type="text"
                    value={selectedItem.cabinNo}
                    onChange={(e) => setSelectedItem({ ...selectedItem, cabinNo: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  Phone:
                  <input
                    type="text"
                    value={selectedItem.mobileNumber}
                    onChange={(e) => setSelectedItem({ ...selectedItem, mobileNumber: e.target.value })}
                  />
                </label>
                <br />
                <label>
                  Address:
                  <input
                    type="text"
                    value={selectedItem.address}
                    onChange={(e) => setSelectedItem({ ...selectedItem, address: e.target.value })}
                  />
                </label>
                <Button onClick={()=>handleSave()}>Save Details</Button>
              </div>
            )}
                  </Offcanvas.Body>
                </Offcanvas>
              </tr>
            ))}
          </tbody>
        </table>

      
      </div>
    </div>
  );
}

export default FirstFloor;
