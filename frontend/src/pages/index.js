// imports
import React, { useState, useEffect } from 'react';
import "../styles.scss" 
import ClickText from '../components/ClickText';
import ClickButtons from '../components/ClickButtons';
import Navbar from '../components/Navbar';

const IndexPage = () => {
  let [clickData, setClickData] = useState(null);

  const fetchDataOnLoad = async () => {
    const response = await fetch('http://localhost:8000/on-load/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    clickData = data.objNumClicks;
    setClickData(clickData);
    console.log(data);
  };

  const updateData = async () => {
    const response = await fetch('http://localhost:8000/update-clicks/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
      const data = await response.json();
      clickData = data.objNumClicks;
      setClickData(clickData);
      console.log(data);
  };

  const resetData = async () => {
    const response = await fetch('http://localhost:8000/reset-clicks/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json '}
    });
    const data = await response.json();
    clickData = data.objNumClicks;
    setClickData(clickData);
    console.log(data);

    if (data.objNumClicks !== 0) console.log("error in resetData()");
  }

  const deleteData = async () => {
    const response = await fetch('http://localhost:8000/update-clicks/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    clickData = data.objNumClicks;
    setClickData(clickData);
    console.log(data);

    if (data.objNumClicks !== -1) console.log("error in deleteData()");
  };

  // runs upon first page load
  useEffect(() => {
    fetchDataOnLoad();
  }, []);


  return (
    <div className='overall-container'>
      <Navbar/>
      {/* Pass clickData as props to ClickText component */}
      <ClickText clickData={clickData}/> 
      <ClickButtons updateData={updateData}
                    resetData={resetData}
                    deleteData={deleteData}
      />
    </div>
  );
}; export default IndexPage;

export const Head = () => <title>Button Masher</title>



