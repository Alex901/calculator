import React, { useState } from "react";
import './Calculator.css';
import Display from "./Display/Display";
import CalculatorButton from "./Buttons/CalculatorButton";


const Calculator = () => {
    const [currentNumber, setCurrentNumber] = useState("0"); //Number to be displayed
    const [currentExpression, setExpression] = useState('');
    const [isExecDisabled, setExecDisabled] = useState(true);
    const [isBackDisabled, setBackDisabled] = useState(true);
    const [isOpDisabled, setOpDisabled] = useState('true');

    const HandleButtonClick = (value) => { 
        if(value === '='){
            console.log("Calculate result")
        } else if(value === 'C'){
            resetDisplay();
        } else if(value === '<'){
            removeOne();
        } else {
            if(!isNaN(value)){
                setBackDisabled(false);
                setOpDisabled(false);
               console.log({currentNumber}) 
               if(currentNumber == 0){ //No empty numbers in my calculater :) 
                    setCurrentNumber(value);
               } else {
                setCurrentNumber(currentNumber + value);
               }
            } else {
                console.log("Operation key clicked -> check number -> update expression");
            }
            console.log("Update display");
            // 1. Empty display -> rerender"
            // 2. A number -> Update number"
            // 3. Arithmetic -> Update expression
        }
        console.log('Button clicked',  value);  // Check so things makes sense
    };
 
    const resetDisplay = () => {
        setCurrentNumber('0');
        setExpression('');
    }
    
    const removeOne = () => {

            console.log('currentNumber: ', currentNumber);
            setCurrentNumber(currentNumber.slice(0,-1));
            if(currentNumber.length < 1){
                setCurrentNumber("0");
                setBackDisabled(true);
            }       
    }

    return (
        <div className="calculator-layout">
            <Display expression={currentExpression} currentNumber={currentNumber}/>
            <div className="button-grid">
                <CalculatorButton value="1" onClick={HandleButtonClick} />
                <CalculatorButton value="2" onClick={HandleButtonClick} />
                <CalculatorButton value="3" onClick={HandleButtonClick} />
                <CalculatorButton value="<" onClick={HandleButtonClick} disabled={isBackDisabled} customClass={"erase"}/>
                <CalculatorButton value="4" onClick={HandleButtonClick} />
                <CalculatorButton value="5" onClick={HandleButtonClick} />
                <CalculatorButton value="6" onClick={HandleButtonClick} />
                <CalculatorButton value="*" onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="7" onClick={HandleButtonClick} />
                <CalculatorButton value="8" onClick={HandleButtonClick} />
                <CalculatorButton value="9" onClick={HandleButtonClick} />
                <CalculatorButton value="-" onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="C" onClick={HandleButtonClick} customClass={"clear"} />
                <CalculatorButton value="0" onClick={HandleButtonClick} />
                <CalculatorButton value="+" onClick={HandleButtonClick} disabled={isOpDisabled}/>
                <CalculatorButton value="=" onClick={HandleButtonClick} disabled={isExecDisabled} customClass="executeButton"/>
            </div>

        </div>
        

    );
};


export default Calculator;