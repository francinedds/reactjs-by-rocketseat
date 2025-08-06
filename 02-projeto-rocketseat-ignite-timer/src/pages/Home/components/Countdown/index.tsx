import { useContext, useEffect } from "react";
import { CountContainer, Separator } from "./styles"
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function Countdown(){
    const { activeCycle, activeCycleId, markCurrencyCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext)

    // parte do countdown, porém usamos antes do useEffect para a função poder enxergá-la 
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
   
    // contar de 1 em 1 segundos e encerra o ciclo
    useEffect(() => {
        let interval: number; 

        if(activeCycle){
        interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate));

                if(secondsDifference >= totalSeconds){
                    markCurrencyCycleAsFinished()

                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, setSecondsPassed, markCurrencyCycleAsFinished])

    // countdown
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    // mudando title da aba
    useEffect (() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle]);

    return (
        <CountContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountContainer>
    )
}