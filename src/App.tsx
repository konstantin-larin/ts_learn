import './App.css'
import BoardComponent from "./components/BoardComponent.tsx";
import Timer from "./components/Timer.tsx";
import {useEffect, useState} from "react";
import {Board, Check} from "./models/Board.ts";
import {Player} from "./models/Player.ts";
import {Colors} from "./models/Colors.ts";
import EatenFiguresComponent from "./components/EatenFiguresComponent.tsx";
import ChooseFigure from "./components/ChooseFigure.tsx";
import Pawn from "./models/figures/Pawn.ts";
import {Figure} from "./models/figures/Figure.ts";

enum GameStatuses {
    NULL = 0,
    WHITE_CONTINUE = 'Белые ходят',
    BLACK_CONTINUE = 'Черные ходят',
    STALEMATE = 'Пат',
    WHITE_WIN = 'Победа белых! Откройте меню, чтобы начать заново.',
    BLACK_WIN = 'Победа черных! Откройте меню, чтобы начать заново.'
}

function App(): JSX.Element {
    //в меню будет: Начать заново, сменить сторону, Играть с компьютером, играть с другом
    //фичи типа установить длительность таймера, перевернуть доску и тп забей
    const [board, setBoard] = useState(new Board());
    const [checks, setChecks] = useState<Check[]>([]);
    const [whiteTimerStopped, setWhiteTimerStopped] = useState(true);
    const [blackTimerStopped, setBlackTimerStopped] = useState(true);
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [gameStatus, setGameStatus] = useState<GameStatuses>(GameStatuses.NULL);
    const [boardDisabled, setBoardDisabled] = useState(false);
    const [goodPawn, setGoodPawn] = useState<Figure | null>(null);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [timerRestarted, setTimerRestarted] = useState(false);

    function swapPlayer() {
        if (currentPlayer) {
            currentPlayer.notMoved = false;
            if (currentPlayer.color === Colors.WHITE) {
                setWhiteTimerStopped(true);
                if (!blackPlayer.notMoved) setBlackTimerStopped(false);
            }
            if (currentPlayer.color === Colors.BLACK) {
                setBlackTimerStopped(true);
                if (!whitePlayer.notMoved) setWhiteTimerStopped(false);
            }
            const checks = board.analyzeTheChecks(currentPlayer.color);
            setChecks(checks);
        }
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    function restart() {
        setChecks([]);
        setBlackTimerStopped(true);
        setWhiteTimerStopped(true);
        setTimerRestarted(true);

        setBlackPlayer(new Player(Colors.BLACK));
        setWhitePlayer(new Player(Colors.WHITE));
        setCurrentPlayer(null);
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setGameStatus(GameStatuses.NULL);
    }

    function updateBoard() {
        setBoard(board.getCopy());
    }

    useEffect(() => {
        setCurrentPlayer(whitePlayer);
    }, [whitePlayer]);
    useEffect(() => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }, []);
    useEffect(() => {
        if (goodPawn && !(goodPawn instanceof Pawn)) {
            swapPlayer();
            setGoodPawn(null);
        }
        setBoardDisabled(!!goodPawn);
    }, [goodPawn]);
    useEffect(() => {
        if (currentPlayer) {
            if (board.checkOnPossibleMoves(currentPlayer.color)) {
                if (currentPlayer.color === Colors.WHITE) {
                    setGameStatus(GameStatuses.WHITE_CONTINUE);
                } else setGameStatus(GameStatuses.BLACK_CONTINUE);
            } else {
                setBoardDisabled(true);
                if (checks.length > 0) {
                    if (currentPlayer.color === Colors.WHITE) {
                        setGameStatus(GameStatuses.BLACK_WIN);
                    } else setGameStatus(GameStatuses.WHITE_WIN);
                } else setGameStatus(GameStatuses.STALEMATE);
            }
        }
    }, [currentPlayer]);
    useEffect(() => {
        if(menuIsOpen){
            setBoardDisabled(true);
        } else setBoardDisabled(false);
    }, [menuIsOpen]);

    return (
        <div className={'app'}>
            <div className={'call-menu'} onClick={() => {
                setMenuIsOpen(true);
            }}>Меню</div>
            {menuIsOpen &&
                <div className={'modal'}>
                    <div className={'menu'}>
                        <div className="button" onClick={() => {
                            setMenuIsOpen(false);
                        }}>Продолжить</div>
                        <div className={'button'} onClick={() => {
                            setMenuIsOpen(false);
                            restart();
                        }}>Начать заново</div>
                    </div>
                </div>
            }
            {goodPawn && <ChooseFigure goodPawn={goodPawn} setGoodPawn={setGoodPawn}/>}
            <h1>{goodPawn ? 'Выберите фигуру' : gameStatus}</h1>
            <div className={'board-container'}>
                <div className={'board-info'}>
                    <EatenFiguresComponent eatenFigures={board.lostWhiteFigures}></EatenFiguresComponent>
                    <Timer restarted={timerRestarted} stopped={blackTimerStopped}
                        setRestarted={setTimerRestarted}
                        isOverFunc={() => {
                            setGameStatus(GameStatuses.WHITE_WIN);
                        }}></Timer>
                </div>
                <BoardComponent
                    setGoodPawn={setGoodPawn}
                    disabled={boardDisabled}
                    checks={checks}
                    swapPlayer={swapPlayer}
                    currentPlayer={currentPlayer}
                    board={board} updateBoard={updateBoard}></BoardComponent>
                <div className={'board-info'}>
                    <EatenFiguresComponent eatenFigures={board.lostBlackFigures}></EatenFiguresComponent>
                    <Timer restarted={timerRestarted} setRestarted={setTimerRestarted} stopped={whiteTimerStopped} isOverFunc={() => {
                        setGameStatus(GameStatuses.BLACK_WIN);
                    }}></Timer>
                </div>
            </div>
        </div>
    )
}

export default App
