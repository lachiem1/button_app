import React, { useState, useEffect } from 'react';

const IndexPage = () => {
  let [clickInfo, setClickInfo] = useState(0);
  let [loading, setLoading] = useState(true);

  // runs upon first page load
  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let response = await fetch("http://localhost:8000/api/clicked/1/");
    let data = await response.json();
    setClickInfo(data);
    setLoading(false);
    console.log("getData ->data: ", data);
    console.log("getData ->clickInfo: ", clickInfo);
  };

  const updateData = async () => {
    const newInfo = {
      ...clickInfo,
      num_clicks: clickInfo.num_clicks + 1
    }

    clickInfo = newInfo;
    setClickInfo(newInfo);

    await fetch("http://localhost:8000/api/clicked/1/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...clickInfo, 'updated': new Date() })
    });
    console.log("update -> clickInfo: ", clickInfo.num_clicks)
  };

  const resetData = async () => {
    const newInfo = {
      ...clickInfo,
      num_clicks: 0
    }

    clickInfo = newInfo;
    setClickInfo(newInfo);

    await fetch("http://localhost:8000/api/clicked/1/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...clickInfo, 'updated': new Date() })
    });
    console.log("update: ", clickInfo.num_clicks)
  };


  return (
    <div>

      {loading ? <div>...</div> : <div>This button has been mashed {clickInfo.num_clicks} times.</div>}
      
      <button onClick={() => {
        updateData();
        } 
      }>Increase</button>

      <button onClick={() => {
        resetData();
      }}>Reset count</button>

    </div>
  );
}
export default IndexPage;

export const Head = () => <title>Button Counter</title>



