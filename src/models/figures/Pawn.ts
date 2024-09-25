import {Figure, FigureNames} from "./Figure.ts";
import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import {Colors} from "../Colors.ts";
import {Cell} from "../Cell.ts";

export default class Pawn extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.PAWN;
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    private _direction = this.cell.figure?.color === Colors.BLACK ? -1 : 1;
    private _isFirstStep: boolean = true;
    public canBeTakenEnPass: boolean = false;
    

    canMove(target: Cell): Boolean {
        if (!super.canMove(target)) return false;
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? -2 : 2;

        if (
            (target.y === this.cell.y + this._direction ||
                this._isFirstStep &&
                (target.y === this.cell.y + firstStepDirection) &&
                this.cell.board.getCell(target.x, target.y - firstStepDirection / 2).isEmpty()
            )
            && target.x === this.cell.x
            && target.isEmpty()
        ) {
            return true;
        }
        if (
            (target.y === this.cell.y + this._direction)
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && (this.cell.isEnemy(target))
        ) {
            return true;
        }
        
        if(this._isCapturingEnPassantCell(target)){
            return true;
        }

        return false;
    }

    _isCapturingEnPassantCell(target : Cell) : boolean{
        if(
            (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && target.y === this.cell.y + this._direction
        ) {
            if(target.x === this.cell.x + 1){

                const takenTarget = this.cell.board.getCell(this.cell.x + 1, this.cell.y);
                if(this.cell.isEnemy(takenTarget) && takenTarget.figure instanceof Pawn
                    && takenTarget.figure.canBeTakenEnPass
                ){
                    return true;
                }
            }

            if(target.x === this.cell.x - 1){
                const takenTarget = this.cell.board.getCell(this.cell.x - 1, this.cell.y);
                if(this.cell.isEnemy(takenTarget) && takenTarget.figure instanceof Pawn
                    && takenTarget.figure.canBeTakenEnPass
                ){
                    return true;
                }
            }
        }
        return false;
    }

    move(target: Cell) {
        if(this._isCapturingEnPassantCell(target)){
            const takenPawnCell = this.cell.board.getCell(target.x, target.y - this._direction);
            if(takenPawnCell.figure){
                if(this.color === Colors.WHITE){
                    this.cell.board.lostBlackFigures.push(takenPawnCell.figure);
                } else {
                    this.cell.board.lostWhiteFigures.push(takenPawnCell.figure);
                }
            }

            takenPawnCell.setFigure(null);
        }

        const movedBy2 = Math.abs(target.y - this.cell.y) === 2;
        super.move(target);
        if(movedBy2 && this._isFirstStep){
            this.canBeTakenEnPass = true;
        } else this.canBeTakenEnPass = false;
        if (this._isFirstStep) {
            this._isFirstStep = false;
        }
    }
}