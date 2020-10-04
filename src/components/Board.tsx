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
    let [status, setStatus] = useState(currentPlayerTurnString());

    // will ensure the board is updated before checking for game-over
    const boardUpdatedContainer = useRef(false);

    const handleClick = (index: number) => {
        if (winner || draw) {
            return;
        }

        const player = getCurrentPlayer();
        playMove(index, player);
    }

    function getCurrentPlayer(){
        return xIsNext ? X : O;
    }

    const playMove = (cellIndex: number, player: string) => {
        const updatedCells = markCell([...boardCells], cellIndex, player);
        setBoardCells(updatedCells);
        boardUpdatedContainer.current = true;
    }

    const markCell = (cells: string[], index: number, player: string): string[] => {
        if (!cells[index]) {
            cells[index] = player;
            switchTurns();
        }

        return cells;
    }

    const switchTurns = () => {
        setXIsNext(!xIsNext);
    }

    useEffect(() => {
        if (boardUpdatedContainer.current) {
            boardUpdatedContainer.current = !boardUpdatedContainer.current;
            checkIfGameOver();
        }
    });

    const checkIfGameOver = () => {
        const winnerSide = getWinner();
        
        if (winnerSide) {
            setWinner(winnerSide);
            setStatus(`${winnerSide} won!`);
        } else {
            if (isDraw()) {
                setDraw(true);
                setStatus(`draw!`);
            }
        }
    }

    const getWinner = () => {
        let result = null;

        winningConfigs["3x3"].forEach((winningOption: number[]) => {
            const combinationOnBoard = winningOption.reduce((seq: string[], idx: number) => {
                return [...seq, boardCells[idx]];
            }, []);

            if (isCombinationWinning(combinationOnBoard)) {
                result =  combinationOnBoard[0];
            }
        });

        // no winner yet
        return result;
    }

    const isCombinationWinning = (combination: string[]) => {
        return combination[0] && new Set(combination).size === 1;
    }

    const isDraw = () => {
        return !getWinner() && boardCells.every((cell: any) => cell);
    }

    const resetGame = () => {
        setDraw(false);
        setWinner(null);
        setXIsNext(true);
        setStatus(currentPlayerTurnString());
        boardUpdatedContainer.current = false;

        setBoardCells(Array(9).fill(null));
    }

    function currentPlayerTurnString() {
        return `Next player: ${getCurrentPlayer()}`;
    }

    status = winner ? `${winner} won!`
        : draw ? `draw!`
            : currentPlayerTurnString();

    const renderCell = (index: number) => {
        return <Cell value={boardCells[index]} onClick={() => handleClick(index)}></Cell>
    }

    return (
        <div>
            <GameStatus status={status} onClick={() => resetGame()}></GameStatus>
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