import {Figure, FigureNames} from "./Figure.ts";
import blackLogo from '../../assets/black-bishop.png';
import whiteLogo from '../../assets/white-bishop.png';
import {Colors} from "../Colors.ts";
import {Cell} from "../Cell.ts";

export default class Bishop extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.BISHOP;
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    canMove(target: Cell): Boolean {
        if(!super.canMove(target)){
            return false;
        }

        if(this.cell.isEmptyDiagonal(target)){
            return true;
        }

        return false;
    }
    move(target: Cell) {
        super.move(target)
    }
}