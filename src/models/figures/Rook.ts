import {Figure, FigureNames} from "./Figure.ts";
import blackLogo from '../../assets/black-rook.png';
import whiteLogo from '../../assets/white-rook.png';
import {Colors} from "../Colors.ts";
import {Cell} from "../Cell.ts";

export default class Rook extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.ROOK;
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    notMoved = true;

    canMove(target: Cell): Boolean {
        if(!super.canMove(target)){
            return false;
        }
        if(this.cell.isEmptyVertical((target))){
            return true;
        }
        if(this.cell.isEmptyHorizontal((target))){
            return true;
        }
        return false;
    }
    move(target: Cell) {
        super.move(target);
    }
}