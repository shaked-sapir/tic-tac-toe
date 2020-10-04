import React from 'react'

export default function GameStatus(props: any) {

    const getStyle = () => {
        return {
            'display': 'flex',
            'justify-content': 'center',
            'align-content': 'center',
            'padding': '10px'
        }
    }

    return (
        <div style={getStyle()}>
            <text style={statusStyle}>{props.status}</text>
            <button className="reset" onClick={props.onClick} style={resetStyle}>Reset</button>
        </div>
    )
}

const statusStyle = {
    'display': 'flex',
    'justify-content': 'center',
    'margin-right': '10px'
}

const resetStyle = {
    'background': '#d3d3d3',
    'color': 'black',
    'padding': '5px 10px',
    'cursor': 'pointer',
    'display': 'table-cell',
    'vertical-align': 'middle',
    'justify-content': 'flex-end',
    'align': 'right'
}