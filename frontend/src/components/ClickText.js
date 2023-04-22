import React from 'react';
// import IndexPage, {clickData} from '../pages/index.js';

function ClickText(props) {
    return (
        <>
        {props.clickData === -1 ? <div className='click-text'>Click obj deleted. Press (+) to create new obj.</div> 
                        : <div className='click-text'>This button has been mashed {props.clickData} times.</div>}
        </>
    )
} export default ClickText;