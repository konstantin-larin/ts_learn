import {Figure, FigureNames} from "./Figure.ts";
import blackLogo from '../../assets/black-knight.png';
import whiteLogo from '../../assets/white-knight.png';
import {Colors} from "../Colors.ts";
import {Cell} from "../Cell.ts";

export default class Knight extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.KNIGHT;
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    canMove(target: Cell): Boolean {
        if(!super.canMove(target)){
            return false;
        }
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return ((dx === 1 &&  dy === 2) || (dx === 2 && dy === 1));
    }
    move(target: Cell) {
        super.move(target);
    }
}