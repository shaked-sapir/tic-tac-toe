import React, { useState } from 'react'
import Cell from './Cell';

// board state
// turnState - whose turn is it?

// handle click:
// 1. copy current state
// 2. mutate - X/O
// 3. set new state
// 4. check for win/draw
// 5. switch turns
export default function Board() {
    const [boardCells, setBoardCells] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true);

    let status;
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;

    const handleClick = (index: number) => {
        const player = xIsNext ? "X" : "O";
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

    return (
        <div>
            <div className="status">{status}</div>
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
    'display': 'flex'
}