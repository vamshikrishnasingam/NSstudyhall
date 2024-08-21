import React from 'react';
import { useNavigate } from 'react-router-dom';
function RootLayout() {
  const navigate = useNavigate();

  const handleNavigation = (pageNumber) => {
      navigate(`/${pageNumber}`)
  };
  const handleAllocation=()=>{
    navigate("/allocation")
  }
  const handleAll=()=>{
    navigate("/All")
  }

  return (
    <div className='mb-2'>
      <button onClick={() => handleNavigation(1)}>First AC</button>
      <button onClick={() => handleNavigation(2)}>Second AC</button>
      <button onClick={() => handleNavigation(3)}>Non AC</button>
      <button onClick={() => handleAll()}>Other Members</button>
      <button onClick={() => handleAllocation()}>Add new member</button>
    </div>
  );
}

export default RootLayout;
