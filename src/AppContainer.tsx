import React from 'react'
import Board from './components/Board'
import PlayOnlineButton from './components/PlayOnlineButton'

export default function AppContainer() {
    return (
        <div>
            <PlayOnlineButton></PlayOnlineButton>
            <Board></Board>
        </div>
    )
}
