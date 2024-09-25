import {FC} from "react";
import {Cell} from "../models/Cell.ts";
interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
    isAttacked: boolean;
    isAttacker: boolean;
}
const CellComponent: FC<CellProps> = ({cell, selected, click, isAttacked, isAttacker}) => {
    let bgClassname = '';
    if(selected){
        bgClassname = 'cell_selected';
    }
    else if(isAttacked){
        bgClassname = 'cell_attacked';
    }
    else if(cell.available && cell.figure){
        bgClassname = 'cell_available';
    }
    else if(isAttacker){
        bgClassname = 'cell_attacker';
    }

    return (
        <div
            className={['cell', cell.color, bgClassname].join(' ')}
            onClick={() => click(cell)}
        >
            {!cell.figure && cell.available && <div className={'available'}></div>}
            {cell.figure?.logo &&
                <img className={"figure-img"} src={cell.figure.logo} alt={cell.figure.name}/> }
        </div>
    )
}

export default CellComponent;