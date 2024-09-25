import {FC} from "react";
import {Colors} from "../models/Colors.ts";
import whiteBishop from "../assets/white-bishop.png";
import whiteKnight from "../assets/white-knight.png";
import whiteQueen from "../assets/white-queen.png";
import whiteRook from "../assets/white-rook.png";
import blackBishop from "../assets/black-bishop.png";
import blackKnight from "../assets/black-knight.png";
import blackQueen from "../assets/black-queen.png";
import blackRook from "../assets/black-rook.png";
import Bishop from "../models/figures/Bishop.ts";
import Knight from "../models/figures/Knight.ts";
import Rook from "../models/figures/Rook.ts";
import Queen from "../models/figures/Queen.ts";
import {Figure} from "../models/figures/Figure.ts";

const WhiteSet: FC<ChooseFigureProps> = ({goodPawn, setGoodPawn}) => {
    return (
        <>
            <div className={'choose-figure-item'} onClick={() => {
                goodPawn.cell.figure = new Bishop(Colors.WHITE, goodPawn.cell);
                setGoodPawn(goodPawn.cell.figure);
            }}>
                <img src={whiteBishop} alt="Белый слон"/>
            </div>
            <div className={'choose-figure-item'}
                onClick={() => {
                    goodPawn.cell.figure = new Knight(Colors.WHITE, goodPawn.cell);
                    setGoodPawn(goodPawn.cell.figure);
                }}>
                <img src={whiteKnight} alt="Белый конь"/>
            </div>
            <div className={'choose-figure-item'}
                onClick={() => {
                    goodPawn.cell.figure = new Rook(Colors.WHITE, goodPawn.cell);
                    setGoodPawn(goodPawn.cell.figure);
                }}>
                <img src={whiteRook} alt="Белая ладья"/>
            </div>
            <div className={'choose-figure-item'}
                onClick={() => {
                    goodPawn.cell.figure = new Queen(Colors.WHITE, goodPawn.cell);
                    setGoodPawn(goodPawn.cell.figure);
                }
                }>
                <img src={whiteQueen} alt="Белая королева"/>
            </div>
        </>
    )
}
const BlackSet: FC<ChooseFigureProps> = ({goodPawn, setGoodPawn}) => {
    return (
        <>
            <div className={'choose-figure-item'}
                onClick={() => {
                    goodPawn.cell.figure = new Bishop(Colors.BLACK, goodPawn.cell);
                    setGoodPawn(goodPawn.cell.figure)
                }
                }>
                <img src={blackBishop} alt="Черный слон"/>
            </div>
            <div className={'choose-figure-item'}
                onClick={() => {
                    goodPawn.cell.figure = new Knight(Colors.BLACK, goodPawn.cell);
                    setGoodPawn(goodPawn.cell.figure);
                }
                }>
                <img src={blackKnight} alt="Черный конь"/>
            </div>
            <div className={'choose-figure-item'}
                onClick={() => {
                    goodPawn.cell.figure = new Rook(Colors.BLACK, goodPawn.cell);
                    setGoodPawn(goodPawn.cell.figure);
                }
                }>
                <img src={blackRook} alt="Черная ладья"/>
            </div>
            <div className={'choose-figure-item'}
                onClick={() => {
                    goodPawn.cell.figure = new Queen(Colors.BLACK, goodPawn.cell);
                    setGoodPawn(goodPawn.cell.figure);

                }}>
                <img src={blackQueen} alt="Черная королева"/>
            </div>
        </>
    )
}

interface ChooseFigureProps {
    goodPawn: Figure;
    setGoodPawn: (pawn: Figure) => void;
}

const ChooseFigure: FC<ChooseFigureProps> = ({goodPawn, setGoodPawn}) => {
    return (
        <div className={'choose-figure'}>
            {goodPawn.color === Colors.WHITE ?
                <WhiteSet goodPawn={goodPawn} setGoodPawn={setGoodPawn}/> :
                <BlackSet goodPawn={goodPawn} setGoodPawn={setGoodPawn}/>
            }
        </div>
    )
}

export default ChooseFigure;