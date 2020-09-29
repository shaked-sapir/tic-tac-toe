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
    let [draw, setDraw] = useState(false);
    let [status, setStatus] = useState(`Next player: ${getCurrentPlayer()}`);
    const boardUpdatedContainer = useRef(false);

    const handleClick = (index: number) => {
        if(winner || draw) return;
        const player = getCurrentPlayer();
        playMove(index, player);
    }
    
    
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
    
    useEffect(() => {
        if(boardUpdatedContainer.current){
            boardUpdatedContainer.current = !boardUpdatedContainer.current;
            checkIfGameOver();
        }
    });

    const checkIfGameOver = () => {
        const winnerSide = getWinner();
        if(winnerSide){
            console.log("winner after", winner);
            // TODO: lock the screen until reset
        } else {
            if(isDraw()){
                setDraw(true)
                // TODO: lock the screen until reset
            } 
        }
    }

    const getWinner = () => {
        winningConfigs["3x3"].forEach((combination: number[]) => {
            const [a, b, c] = combination;
            if (boardCells[a] && boardCells[a] === boardCells[b] && boardCells[b] === boardCells[c]) {
                setWinner(boardCells[a]);
                setStatus(`${boardCells[a]} won!`);
                return boardCells[a];
            }
        });

        return null;
    }

    const isDraw = () => {
        return !getWinner() && boardCells.every((cell: any) => cell);
    }

    status = winner ? `${winner} won!` 
        : draw ? `draw!` 
        : `Next player: ${getCurrentPlayer()}`;

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