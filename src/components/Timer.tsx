import {FC, useEffect, useRef, useState} from "react";
interface TimerProps {
    isOverFunc: () => void;
    restarted: boolean;
    setRestarted: (bool:boolean) => void;
    stopped: boolean,
}

const Timer: FC<TimerProps> = ({isOverFunc, restarted, setRestarted, stopped}) => {
    const [isOver, setIsOver] = useState(false);
    const [mins, setMins] = useState(15);
    const [secs, setSecs] = useState(0);
    const timeout = useRef(0);
    useEffect(() => {
        if(!stopped && !isOver){
            timeout.current = setTimeout(() => {
                if(secs === 0){
                    if(mins > 0){
                        setSecs(59);
                        setMins(mins - 1);
                    } else {
                        isOverFunc();
                        setIsOver(true);
                    }
                } else setSecs(secs - 1);
            }, 1000);
        } else clearTimeout(timeout.current);
    }, [secs, stopped]);
    useEffect(() => {
        if(restarted){
            setSecs(0);
            setMins(15);
            setRestarted(false);
        }
    }, [restarted]);
    return (
        <div className={'timer'}>
            {mins < 10 ? '0' : ''}{mins}:{secs < 10 ? '0' : ''}{secs}
        </div>
    )
}
export default Timer;
