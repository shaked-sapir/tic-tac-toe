import React from 'react';

export default function Cell(props: any) {
    return (
        <button className='cell' onClick={props.onClick} style={cellStyle} >
            {props.value}
        </button>
    )
}

const cellStyle = {
    'background-color': '#ff0000',
    'color': '#fff',
    'border': '1px solid black',
    'height': '50px',
    'width': '50px',
    'cursor': 'pointer'
}


