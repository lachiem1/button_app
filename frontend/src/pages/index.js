import React, { useState, useEffect } from 'react';

const IndexPage = () => {
  let [clickInfo, setClickInfo] = useState(0);
  let [loading, setLoading] = useState(true);

  // runs upon first page load
  useEffect(() => {
    getData();
  }, []);

  // get data from api upon page load/reload
  let getData = async () => {
    let response = await fetch("http://localhost:8000/api/clicked/1/");
    let data = await response.json();
    // when data is returned then setClickInfo and setLoading to be false so click info can be displayed
    setClickInfo(data);
    setLoading(false);
    // console.log("getData ->data: ", data);
    // console.log("getData ->clickInfo: ", clickInfo);
  };

  // runs onClick for increase count button  
  const updateData = async () => {
    // increment counter by 1 by getting clickInfo object and modifying num_clicks property
    const newInfo = {
      ...clickInfo,
      num_clicks: clickInfo.num_clicks + 1
    }

    // overwrite clickInfo and set it
    clickInfo = newInfo;
    setClickInfo(newInfo);

    // this line is hardcoded...
    await fetch("http://localhost:8000/api/clicked/1/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...clickInfo, 'updated': new Date() })
    });
    // console.log("update -> clickInfo: ", clickInfo.num_clicks)
  };

  // runs onClick for reset count button
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
      {/* Will be updated each time clickInfo is set */}
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



