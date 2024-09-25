import {Figure, FigureNames} from "./Figure.ts";
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';
import {Colors} from "../Colors.ts";
import {Cell} from "../Cell.ts";
import Rook from "./Rook.ts";

export default class King extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.KING;
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    notMoved = true;

    canMove(target: Cell): Boolean {
        if(!super.canMove(target)){
            return false;
        }

        if (
            Math.abs(this.cell.x - target.x) <= 1 &&
            Math.abs(this.cell.y - target.y) <= 1 &&
            (target.isEmpty() || this.cell.isEnemy(target))
        ) {
            return true;
        }

        if (this._isCastlingCell(target)) return true;
        return false;
    }

    private _isCastlingCell(cell: Cell){
        if(this.notMoved){
        //     проверяем здесь две клетки
            if(cell.x === 2 && this.cell.y === cell.y){
                const d = cell.board.getCell(3, this.cell.y);
                const b = cell.board.getCell(1, this.cell.y);
                const a = cell.board.getCell(0, this.cell.y);
                if(d.isEmpty() && b.isEmpty()
                    && a.figure && a.figure instanceof Rook && a.figure.notMoved
                    && a.figure.color === this.color
                ){
                    return true;
                }
            }

            if(cell.x === 6 && this.cell.y === cell.y){
                const h = cell.board.getCell(7, this.cell.y);
                const f = cell.board.getCell(5, this.cell.y);
                if(f.isEmpty() && h.figure instanceof Rook && h.figure.notMoved &&
                    h.figure.color === this.color
                ){
                    return true;
                }
            }
        }
        return false;
    }
    move(target: Cell) {
        if(this._isCastlingCell(target)){
            if(target.x === 2){
                const a = target.board.getCell(0, this.cell.y);
                const d = target.board.getCell(3, this.cell.y);
                a.moveFigure(d);
            }
            if(target.x === 6){
                const h = target.board.getCell(7, this.cell.y);
                const f = target.board.getCell(5, this.cell.y);
                h.moveFigure(f);
            }
        }
        super.move(target);
        this.notMoved = false;
    }
}