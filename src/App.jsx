import React, { useState } from "react";
import "./index.css";

// turnos
const TURNS = {
    X: 'x',
    O: 'o',
}

// cuadrados
const Square = ({ children, isSelected,updateBoard, index}) => {

    // Evaluamos el turno actual
    const className = `square ${isSelected ? 'is-selected' : ''}`;

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

function App() {
    // tablero usando el hook useState
    const [board, setBoard] = useState(
            Array(9).fill(null)
        );
    const [turn, setTurn] = useState(TURNS.X);

    // useState para identificar al GANADOR
    const [winner, setWinner] = useState(null); //null = ganador | false = ganador

    const checkWinner = (boardToCheck) => {
        for (const combo of WINNER_COMBOS) {
            const [a,b,c] = combo;
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        }
    }

    // función para ACTUALIZAR el TABLERO
    const updateBoard = (index) => {
        // evitar sobreescribir en el board
        if (board[index]) return

        // guardar el indice o valor del Square pulsado
        const newBoard = [...board]; // creamos un nuevo arreglo con un clonado supercial (spread) para evitar mutar el existente
        newBoard[index] = turn;
        // actualizar el board
        setBoard(newBoard);

        // Cambiar el turno cada que se actualice el board
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);

    }

    // App a renderizar
    return (
        <main className="board">
            <h1>Gato</h1>
            <section className="game">
                {
                    board.map((_, index) => {
                        return (
                            <Square 
                                // para renderizar algo de React require siempre de un ID
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {board[index]}
                            </Square>
                        );
                    })
                }
            </section>
            <section className="turn">
                {/* Mostrar turno activo */}
                <Square isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>
        </main>
    );
}

export default App;