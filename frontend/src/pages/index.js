import React, { useState, useEffect } from 'react';

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

  // runs upon first page load
  useEffect(() => {
    fetchDataOnLoad();
  }, []);


  return (
    <div>
      {/* Will be updated each time clickInfo is set */}
      {clickData === -1 ? <div>Click obj deleted. Press increase to create new obj and keep counting...</div> 
                        : <div>This button has been mashed {clickData} times.</div>}

      <button onClick={() => {
        updateData();
        } 
      }>Increase</button>

      <button onClick={() => {
        resetData();
      }}>Reset count</button>

      <button onClick={() => {
        deleteData();
      }}>Delete object from database</button>

    </div>
  );
}
export default IndexPage;

export const Head = () => <title>Button Counter</title>



