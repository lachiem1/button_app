import React from "react";

function ClickButtons({updateData, resetData, deleteData}) {
    return (
        <div className='buttons-container'>
            <button onClick={() => {
            updateData();
            }} className='increase-button'> (+) </button>

            <button onClick={() => {
            resetData();
            }} className='reset-button'>(Reset)</button>

            <button onClick={() => {
            deleteData();
            }} className='delete-button'>(Del)</button>
        </div>
    )
} export default ClickButtons;