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
    const [ans, setAns] = useState(0); //For later

    const HandleButtonClick = (value) => {
        //TOOD: NaN 

        //TODO: Should d a switch-case to make it less messy. Maybe later

        //First we check special functions, so first we check if we have a zero

        if (value === "±") {
            setCurrentNumber(currentNumber * -1);
        } else if (value === "." && !currentNumber.includes('.')) {
            setCurrentNumber(currentNumber + value);
        } else if (value === "√(x)") {
            setCurrentNumber(Math.sqrt(currentNumber));
            setExpression("√" + currentNumber + "=");
        } else if (value === "x²") {
            setExpression(currentNumber + "² =");
            setCurrentNumber(currentNumber * currentNumber);
        } else if (value === "1/x") {
            setCurrentNumber(1 / currentNumber);
            setExpression("1/" + currentNumber);
        } else if (value === '=') {
            evaluateExpression(value);
        } else if (value === 'C') {
            resetAll();
        } else if (value === 'CE') {
            resetNumber();
        } else if (value === '<') {
            removeOne();
        } else {
            if (!isNaN(value)) { //isValue
                setBackDisabled(false);
                setOpDisabled(false);
                if (currentNumber == "0") { //Avoid leding zero, 01 etc
                    setCurrentNumber(value);
                    setZeroDisabled(false); //Uggly fix, but it works
                } else {
                    setCurrentNumber(currentNumber + value);
                    //setExpression(currentExpression + value);
                }
                //setExpression(currentExpression + value);
            } else { //IsOperation
                //eveluate
                //update expression
                //change operation
                console.log(currentExpression.charAt(currentExpression.length));
                if (currentExpression.length >1 && currentNumber == 0) { //TODO: Smarter helper method here 
                    console.log("haj")
                    setExpression(currentExpression.slice(0,-1)+value);
                    return;
                } else {
                    setExpression(currentNumber + value);
                    setCurrentNumber(0);
                    setExecDisabled(false);
                }
            }
            // 1. Empty display -> rerender"
            // 2. A number -> Update number"
            // 3. Arithmetic -> Update expression
        }
        console.log('Button clicked', value);  // Check so things makes sense
    };

    const resetNumber = () => {
        setCurrentNumber('0');
    }

    const resetAll = () => {
        setCurrentNumber('0');
        setExpression('');
    }

    //Function to remove one character at the time,
    //untill the input is empty
    const removeOne = () => {
        setCurrentNumber(prevNumber => {
            const newNumber = prevNumber.slice(0, -1);
            if (newNumber === "") {
                setBackDisabled(true);
                setOpDisabled(true);
                return 0;
            } else {
                return newNumber;
            }
        });
    }

    const evaluateExpression = (value) => {
        try {
            /*        setExpression(currentExpression+currentNumber)
                   console.log(currentExpression+currentNumber);
                   console.log(currentNumber); */
            const result = eval(currentExpression + currentNumber);
            setCurrentNumber(result);
            setExpression(currentExpression + currentNumber + value);
          //  setExecDisabled(true);
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
                <CalculatorButton value="C" onClick={HandleButtonClick} customClass={"clear"} />
                <CalculatorButton value="CE" onClick={HandleButtonClick} customClass={"clear-all"} />
                <CalculatorButton value="ANS" onClick={HandleButtonClick} />
                <CalculatorButton value="<" onClick={HandleButtonClick} customClass={"erase"} />

                <CalculatorButton value="√(x)" onClick={HandleButtonClick} />
                <CalculatorButton value="x²" onClick={HandleButtonClick} />
                <CalculatorButton value="1/x" onClick={HandleButtonClick} />

                <CalculatorButton value="*" onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="1" onClick={HandleButtonClick} />
                <CalculatorButton value="2" onClick={HandleButtonClick} />
                <CalculatorButton value="3" onClick={HandleButtonClick} />
                <CalculatorButton value="/" onClick={HandleButtonClick} customClass={"Op"} />
                <CalculatorButton value="4" onClick={HandleButtonClick} />
                <CalculatorButton value="5" onClick={HandleButtonClick} />
                <CalculatorButton value="6" onClick={HandleButtonClick} />
                <CalculatorButton value="-" onClick={HandleButtonClick} customClass={"Op"} disabled={isOpDisabled} />
                <CalculatorButton value="7" onClick={HandleButtonClick} />
                <CalculatorButton value="8" onClick={HandleButtonClick} />
                <CalculatorButton value="9" onClick={HandleButtonClick} />
                <CalculatorButton value="+" onClick={HandleButtonClick} customClass={"Op"} disabled={isOpDisabled} />
                <CalculatorButton value="±" onClick={HandleButtonClick} />
                <CalculatorButton value="0" onClick={HandleButtonClick} disabled={isZeroDisabled} />
                <CalculatorButton value="." onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="=" onClick={HandleButtonClick} disabled={isExecDisabled} customClass="executeButton" />
            </div>
        </div>


    );
};


export default Calculator;