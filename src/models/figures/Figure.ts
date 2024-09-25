import {Colors} from "../Colors.ts";
import logo from "../../assets/white-knight.png";
import {Cell} from "../Cell.ts";

export enum FigureNames{
    FIGURE= 'Фигура',
    KING = 'Король',
    KNIGHT = 'Конь',
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон",
}

export class Figure{
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    public canMove(target: Cell): Boolean {
        if(target.figure?.color === this.color) return false
        return true;
    };

    move(target: Cell) : void {
        target.setFigure(this);
        // каждый ход надо убирать взятие на проходе

        for(let rowCells of this.cell.board.cells){
            for(let cell of rowCells){
                if(cell.figure && cell.figure.name === FigureNames.PAWN){

                    if('canBeTakenEnPass' in cell.figure){
                        cell.figure.canBeTakenEnPass = false;
                    }
                }
            }
        }
    };

}