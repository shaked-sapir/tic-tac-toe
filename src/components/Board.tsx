/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react'
import Cell from './Cell';
import GameStatus from './GameStatus';

// board state
// turnState - whose turn is it?

// handle click:
// 1. copy current state
// 2. mutate - X/O
// 3. set new state
// 4. check for win/draw
// 5. switch turns
const X = 'X';
const O = 'O';

export default function Board() {
    const [boardCells, setBoardCells] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true);

    let status;
    status = `Next player: ${getCurrentPlayer()}`;

    const handleClick = (index: number) => {
        const player = getCurrentPlayer();
        const updatedCells = markCell([...boardCells], index, player);
        setBoardCells(updatedCells);
    }
    
    const markCell = (cells: string[], index: number, player: string): string[] => {
        if (!cells[index]){
            cells[index] = player;
            switchTurns();
        }

        return cells;
    }

    const switchTurns = () => {
        setXIsNext(!xIsNext);
    }

    const renderCell = (index: number) => {
        return <Cell value={boardCells[index]} onClick={() => handleClick(index)}></Cell>
    }

    function getCurrentPlayer(){
        return xIsNext ? X : O;
    }

    return (
        <div>
            <GameStatus status={status}></GameStatus>
            <div className="boardRow" style={boardRowStyle}>
                {renderCell(0)}
                {renderCell(1)}
                {renderCell(2)}
            </div>
            <div className="boardRow" style={boardRowStyle}>
                {renderCell(3)}
                {renderCell(4)}
                {renderCell(5)}
            </div>
            <div className="boardRow" style={boardRowStyle}>
                {renderCell(6)}
                {renderCell(7)}
                {renderCell(8)}
            </div>
        </div>)
}


const boardRowStyle = {
    'display': 'flex',
    'justify-content': 'center'
}