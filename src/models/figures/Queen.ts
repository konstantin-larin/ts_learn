import {Figure, FigureNames} from "./Figure.ts";
import blackLogo from '../../assets/black-queen.png';
import whiteLogo from '../../assets/white-queen.png';
import {Colors} from "../Colors.ts";
import {Cell} from "../Cell.ts";

export default class Queen extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.QUEEN;
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    public canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false;
        }
        if(this.cell.isEmptyVertical(target)){
            return true;
        }
        if(this.cell.isEmptyHorizontal(target)){
            return true;
        }
        if(this.cell.isEmptyDiagonal(target)){
            return true;
        }

        return false;
    }
    move(target: Cell) {
        super.move(target);
    }
}