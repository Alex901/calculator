import React, { useState } from "react";
import './Calculator.css';
import Display from "./Display/Display";
import CalculatorButton from "./Buttons/CalculatorButton";


const Calculator = () => {
    const [currentNumber, setCurrentNumber] = useState("0"); //Number to be displayed
    const [currentExpression, setExpression] = useState(''); //setCurrentExpression, but CBA :)
    const [isExecDisabled, setExecDisabled] = useState(true);
    const [isBackDisabled, setBackDisabled] = useState(true);
    const [isOpDisabled, setOpDisabled] = useState(true);
    const [isZeroDisabled, setZeroDisabled] = useState(true);
    const [ans, setAns] = useState(0);

    const HandleButtonClick = (value) => {
        if (value === '=') {
            evaluateExpression();
        } else if (value === 'C') {
            resetDisplay();
        } else if (value === '<') {
            removeOne();
        } else {
            if (!isNaN(value)) { //isValue
                setBackDisabled(false);
                setOpDisabled(false);
                if (currentNumber === "0") { //Avoid leding zero, 01 etc
                    setCurrentNumber(value);
                    setZeroDisabled(false); //Uggly fix, but it works
                }  else {
                    setCurrentNumber(currentNumber + value);
                    setExpression(currentExpression + value);
                }  
                setExpression(currentExpression + value);
            } else { //IsOperation
                if(currentExpression.length === 0){
                    setZeroDisabled(true);
                    return;
                }else if(!isNaN(currentExpression.slice(-1))){ //avoid multiple consicutive operations
                    setExpression(currentExpression + value);
                    setCurrentNumber("0");
                    setZeroDisabled(true); //Uggly fix, but it works
                }
                setExecDisabled(false);
            }
            // 1. Empty display -> rerender"
            // 2. A number -> Update number"
            // 3. Arithmetic -> Update expression
        }
        console.log('Button clicked', value);  // Check so things makes sense
    };

    const resetDisplay = () => {
        setCurrentNumber('0');
        setExpression('');
    }

    //Function to remove one character at the time,
    //untill the input is empty
    const removeOne = () => {
        setCurrentNumber(prevNumber => {
            const newNumber = prevNumber.slice(0, -1);
            if (newNumber === ""){
                setBackDisabled(true);
                setOpDisabled(true);
                return 0;
            } else {
                return newNumber;
            }
        });
    }

    const evaluateExpression = () => {
        try{
            const result = eval(currentExpression);
            setCurrentNumber(result);
           // setExecDisabled(true);
            setZeroDisabled(true);
        } catch (error) {
            console.error("Error in evaluating expression");
            setExpression('');
           // setExecDisabled(true);
        }
    }

    return (
        <div className="calculator-layout">
            <Display expression={currentExpression} currentNumber={currentNumber} />
            <div className="button-grid">
                <CalculatorButton value="1" onClick={HandleButtonClick} />
                <CalculatorButton value="2" onClick={HandleButtonClick} />
                <CalculatorButton value="3" onClick={HandleButtonClick} />
                <CalculatorButton value="<" onClick={HandleButtonClick} disabled={isBackDisabled} customClass={"erase"} />
                <CalculatorButton value="4" onClick={HandleButtonClick} />
                <CalculatorButton value="5" onClick={HandleButtonClick} />
                <CalculatorButton value="6" onClick={HandleButtonClick} />
                <CalculatorButton value="*" onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="7" onClick={HandleButtonClick} />
                <CalculatorButton value="8" onClick={HandleButtonClick} />
                <CalculatorButton value="9" onClick={HandleButtonClick} />
                <CalculatorButton value="-" onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="C" onClick={HandleButtonClick} customClass={"clear"} />
                <CalculatorButton value="0" onClick={HandleButtonClick} disabled={isZeroDisabled}/>
                <CalculatorButton value="+" onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="=" onClick={HandleButtonClick} disabled={isExecDisabled} customClass="executeButton" />
                <CalculatorButton value="/" onClick={HandleButtonClick} />
            </div>
        </div>


    );
};


export default Calculator;