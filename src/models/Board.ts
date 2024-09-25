import {Cell} from "./Cell.ts";
import {Colors} from "./Colors.ts";
import Queen from "./figures/Queen.ts";
import Rook from "./figures/Rook.ts";
import Knight from "./figures/Knight.ts";
import Bishop from "./figures/Bishop.ts";
import King from "./figures/King.ts";
import Pawn from "./figures/Pawn.ts";
import {Figure, FigureNames} from "./figures/Figure.ts";

export interface Check {
    attacker: Figure;
    king: Figure;
}


export class Board {
    cells: Cell[][] = []
    public lostWhiteFigures: Figure[] = [];
    public lostBlackFigures: Figure[] = [];

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x]; //номер строки и номер ячейки в строке
    }
    public getCellCoordsInChessFormat(cell: Cell) : string{
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][cell.x];
        const y = cell.y + 1 + '';
        return letter + y;
    }
    public getCellByCoordsInChessFormat(str: string) : Cell{
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return this.getCell(letters.indexOf(str[0]),+str[1] - 1);
    }
    public getCopy(): Board {
        const newBoard = new Board();
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.cells = this.cells;
        return newBoard;
    }


    public addFigures(): void {
        new Rook(Colors.WHITE, this.getCell(0, 0))
        new Knight(Colors.WHITE, this.getCell(1, 0));
        new Bishop(Colors.WHITE, this.getCell(2, 0));
        new Queen(Colors.WHITE, this.getCell(3, 0));
        new King(Colors.WHITE, this.getCell(4, 0));
        new Bishop(Colors.WHITE, this.getCell(5, 0));
        new Knight(Colors.WHITE, this.getCell(6, 0));
        new Rook(Colors.WHITE, this.getCell(7, 0));
        new Pawn(Colors.WHITE, this.getCell(0, 1));
        new Pawn(Colors.WHITE, this.getCell(1, 1));
        new Pawn(Colors.WHITE, this.getCell(2, 1));
        new Pawn(Colors.WHITE, this.getCell(3, 1));
        new Pawn(Colors.WHITE, this.getCell(4, 1));
        new Pawn(Colors.WHITE, this.getCell(5, 1));
        new Pawn(Colors.WHITE, this.getCell(6, 1));
        new Pawn(Colors.WHITE, this.getCell(7, 1));

        new Rook(Colors.BLACK, this.getCell(0, 7))
        new Knight(Colors.BLACK, this.getCell(1, 7));
        new Bishop(Colors.BLACK, this.getCell(2, 7));
        new Queen(Colors.BLACK, this.getCell(3, 7));
        new King(Colors.BLACK, this.getCell(4, 7));
        new Bishop(Colors.BLACK, this.getCell(5, 7));
        new Knight(Colors.BLACK, this.getCell(6, 7));
        new Rook(Colors.BLACK, this.getCell(7, 7));
        new Pawn(Colors.BLACK, this.getCell(0, 6));
        new Pawn(Colors.BLACK, this.getCell(1, 6));
        new Pawn(Colors.BLACK, this.getCell(2, 6));
        new Pawn(Colors.BLACK, this.getCell(3, 6));
        new Pawn(Colors.BLACK, this.getCell(4, 6));
        new Pawn(Colors.BLACK, this.getCell(5, 6));
        new Pawn(Colors.BLACK, this.getCell(6, 6));
        new Pawn(Colors.BLACK, this.getCell(7, 6));
    }

    public initCells(): void {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)); //черный
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)); //white
                }
            }
            this.cells.push(row);
        }
    }

    // проанализировать поле на шахи
    public analyzeTheChecks(color: Colors): Check[] {
        // цвет должен быть того, кто шах делает
        // проходимся по всем ячейкам и ищем все ячейки, которые содержат фигуры цвета color
        const checks: Check[] = [];
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (cell.figure && cell.figure.color === color) {
                    const check = this._analyzeCheckFromFigure(cell.figure);
                    if (check) { //если нашли шах, то пихаем в массив
                        checks.push(check);
                    }
                }
            }
        }

        return checks;
    }

    private _analyzeCheckFromFigure(figure: Figure): Check | null {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (figure.canMove(cell) &&
                    cell?.figure?.name === FigureNames.KING &&
                    cell.figure?.color !== figure.color) {
                    const check: Check = {
                        attacker: figure,
                        king: cell.figure,
                    }
                    return check;
                }
            }
        }
        return null;
    }


    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                // доступно ли чисто физически
                if (selectedCell?.figure) {
                    target.available = this.mayFigureMove(selectedCell.figure, target);
                }  else target.available = false;
            }
        }
    }

    public mayFigureMove(figure: Figure, target: Cell): boolean {
        let isAvailable = false;
        const selectedCell = figure.cell;
        isAvailable = !!selectedCell?.figure?.canMove(target);
        if (isAvailable) {
            isAvailable = this._isNextStepAvailable(figure, target);
        }

        return isAvailable;
    }

    public checkOnPossibleMoves(color: Colors): boolean {
        let isPossible = false;
        for (let cellsRow of this.cells) {
            for (let cell of cellsRow) {
                const figure = cell.figure;
                if (figure && figure.color === color) {
                    isPossible = this._isFigureAvailable(figure);
                }
                if (isPossible) {
                    break;
                }
            }
            if (isPossible) {
                break; //если возможен хоть один ход, то заканчиваем проверку
            }
        }
        return isPossible;
    }

    private _isFigureAvailable(figure: Figure): boolean {
        for (let cellsRow of this.cells) {
            for (let cell of cellsRow) {
                const isCanMove = figure.canMove(cell);
                if (isCanMove) {
                    if (this._isNextStepAvailable(figure, cell)) {
                        return true;
                    }
                }
            }
        }

        // если ни разу не вернуло true, значит ходов нет(((
        return false;
    }

    private _isNextStepAvailable(figure: Figure, target: Cell) {
        //     теперь проверяем на наличие шахов при том раскладе, если этот ход сделается
        const prevFigure = target.figure;
        const prevCell = figure.cell;
        prevCell.figure = null;
        target.setFigure(figure);
        //     сделав будущий ход в модели проверяем эту модель на шахи
        const oppColor = figure.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
        const potentialChecks = this.analyzeTheChecks(oppColor);
        // после проверки возвращаем все обратно
        target.setFigure(prevFigure);
        prevCell.setFigure(figure);

        return potentialChecks.length === 0
    }
}