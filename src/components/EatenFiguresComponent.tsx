import {FC} from "react";
import {Figure, FigureNames} from "../models/figures/Figure.ts";

interface EatenFiguresProps {
    eatenFigures: Figure[];
}

const EatenFiguresComponent: FC<EatenFiguresProps> = ({eatenFigures}) => {
    const pawns: Figure[] = [];
    const rooks : Figure[] = [];
    const bishops : Figure[] = [];
    const queens : Figure[] = [];
    const knights : Figure[] = [];

    for (let figure of eatenFigures) {
        switch (figure.name) {
            case FigureNames.PAWN:
                pawns.push(figure);
                break;
            case FigureNames.KNIGHT:
                knights.push(figure);
                break
            case FigureNames.BISHOP:
                bishops.push(figure);
                break
            case FigureNames.QUEEN:
                queens.push(figure);
                break
            case FigureNames.ROOK:
                rooks.push(figure);
                break
        }
    }

    return (
        <div className={'eaten-figures'}>
            {pawns.length > 0 &&
                <div className={'eaten-figures-item'}>{
                    pawns.length} <img src={pawns[0].logo || undefined} alt={pawns[0].name}/>
                </div>}
            {knights.length > 0 &&
                <div className={'eaten-figures-item'}>{
                    knights.length} <img src={knights[0].logo || undefined} alt={knights[0].name}/>
                </div>}
            {bishops.length > 0 &&
                <div className={'eaten-figures-item'}>{
                    bishops.length} <img src={bishops[0].logo || undefined} alt={bishops[0].name}/>
                </div>}
            {rooks.length > 0 &&
                <div className={'eaten-figures-item'}>{
                    rooks.length} <img src={rooks[0].logo || undefined} alt={rooks[0].name}/>
                </div>}
            {queens.length > 0 &&
                <div className={'eaten-figures-item'}>{
                    queens.length} <img src={queens[0].logo || undefined} alt={queens[0].name}/>
                </div>}
        </div>
    )
}

export default EatenFiguresComponent;
