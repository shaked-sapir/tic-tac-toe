import React from 'react'

export default function PlayOnlineButton() {
    return (
        <div>
            <button className='playOnlineButton' style={playOnlineButtonStyle}>play online!</button>
        </div>
    )
}

const playOnlineButtonStyle = {
    'background': '#00ab66',
    'color': 'black',
    'width': '100px',
    'height': '50px',
    'cursor': 'pointer',
    'display': 'table-cell',
    'justify-content': 'flex-end',
    'vertical-align': 'center',
    'align': 'center'
}
