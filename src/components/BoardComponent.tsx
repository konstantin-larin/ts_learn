import {Board, Check} from "../models/Board.ts";
import CellComponent from "./CellComponent.tsx";
import {Cell} from "../models/Cell.ts";
import {FC, Fragment, useEffect, useState} from "react";
import {Player} from "../models/Player.ts";
import Pawn from "../models/figures/Pawn.ts";
import {Colors} from "../models/Colors.ts";

interface BoardProps {
    disabled: Boolean;
    board: Board;
    updateBoard: () => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
    checks: Check[];
    setGoodPawn: (pawn: Pawn | null) => void;
}

const BoardComponent: FC<BoardProps> =
    ({
         board, updateBoard, disabled,
         setGoodPawn, swapPlayer, currentPlayer, checks
     }) => { //это generics
        const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

        function cellOnClick(cell: Cell) {
            if (disabled) return;
            if (selectedCell && selectedCell !== cell) {
                const figure = selectedCell.figure;
                if (figure && board.mayFigureMove(figure, cell)) {
                    selectedCell.moveFigure(cell);
                    if (figure instanceof Pawn &&
                        (
                            (cell.y === 0 && figure.color === Colors.BLACK) ||
                            (cell.y === 7 && figure.color === Colors.WHITE)
                        )

                    ) {
                        setGoodPawn(figure);
                    } else {
                        swapPlayer();
                    }
                    setSelectedCell(null);
                } else if (cell.figure?.color === currentPlayer?.color) {
                    setSelectedCell(cell);
                }
            } else {
                if (cell.figure?.color === currentPlayer?.color) {
                    setSelectedCell(cell);
                }
            }
        }

        function highlightCells() {
            board.highlightCells(selectedCell);
            updateBoard();
        }



        useEffect(() => {
            highlightCells();
        }, [selectedCell]);


        return (
            <div className={'board board_mirrored'}>
                {board.cells.map((row, index) => (
                    <Fragment key={index}>
                        {row.map(cell => (
                            <CellComponent
                                isAttacked={!!checks.find(check => check.king === cell.figure)}
                                isAttacker={!!checks.find(check => check.attacker === cell.figure)}
                                click={cellOnClick}
                                cell={cell} key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
                        ))}
                    </Fragment>
                ))}
            </div>
        )
    }
export default BoardComponent;