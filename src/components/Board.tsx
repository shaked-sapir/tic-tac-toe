import React, { useState, useEffect, useRef } from 'react'
import Cell from './Cell';
import GameStatus from './GameStatus';
import winningConfigs from '../logic/winningConfigs.json';

const X = 'X';
const O = 'O';

export default function Board() {
    const [boardCells, setBoardCells] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true);
    let [winner, setWinner] = useState(null);
    let [status, setStatus] = useState(`Next player: ${getCurrentPlayer()}`);
    const boardUpdatedContainer = useRef(false);

    const handleClick = (index: number) => {
        console.log("handler winner", winner)
        if(winner) return;
        const player = getCurrentPlayer();
        playMove(index, player);
    }
    
    useEffect(() => {
        if(boardUpdatedContainer.current){
            boardUpdatedContainer.current = !boardUpdatedContainer.current;
            checkIfGameOver();
        }
    })

    const playMove = (cellIndex: number, player: string) => {
        const updatedCells = markCell([...boardCells], cellIndex, player);
        setBoardCells(updatedCells);
        boardUpdatedContainer.current = true;
    }
    
    const markCell = (cells: string[], index: number, player: string): string[] => {
        if (!cells[index]){
            console.log("fill")
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

    function getCurrentPlayer() {
        return xIsNext ? X : O;
    }

    const checkIfGameOver = () => {
        const winnerSide = getWinner();
        if(winnerSide){
            console.log("winner after", winner)
        } else {
            checkIfDraw(); // TODO: lock the screen until reset
        }
    }

    const getWinner = () => {
        winningConfigs["3x3"].forEach((combination: number[]) => {
            const [a, b, c] = combination;
            console.log(boardCells[0]==='X')
            if (boardCells[a] && boardCells[a] === boardCells[b] && boardCells[b] === boardCells[c]) {
                console.log("WIN")
                setWinner(boardCells[a]);
                setStatus(`${boardCells[a]} won!`);
                return boardCells[a];
            }
        });

        return null;
    }

    const checkIfDraw = () => {
        return !getWinner() && boardCells.every((cell: any) => cell);
    }

    // let status;
    // winner = getWinner();
    // console.log("upper winner", winner)
    status = winner ? `${winner} won!` : `Next player: ${getCurrentPlayer()}`;

    console.log("statusBeforeRender:" , {status})
    console.log("winnerBeforeRender:" , {winner})

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