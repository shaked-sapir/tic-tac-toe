import React from 'react';

export default function Cell(props: any) {
    const cellStyle = {
        'background-color': '#ff0000',
        'color': '#fff',
        'border': '1px solid black',
        'height': '100px',
        'width': '100px',
        'cursor': props.value? 'not-allowed' : 'pointer',
        'font-size': '80px'
    }

    return (
        <button className='cell' onClick={props.onClick} style={cellStyle} >
            {props.value}
        </button>
    )
}




