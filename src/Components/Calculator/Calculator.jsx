import React, { useState, useEffect } from "react";
import './Calculator.css';
import Display from "./Display/Display";
import CalculatorButton from "./Buttons/CalculatorButton";


const Calculator = () => {
    const [currentNumber, setCurrentNumber] = useState("0"); //Number to be displayed
    const [currentExpression, setExpression] = useState(''); //setCurrentExpression, but CBA :)
    const [isExecDisabled, setExecDisabled] = useState(true);
    const [isBackDisabled, setBackDisabled] = useState(true);
    const [isOpDisabled, setOpDisabled] = useState(true);
    const [isFuncDisabled, setFuncDisabled] = useState(true);
    const [isZeroDisabled, setZeroDisabled] = useState(true);
    const [numberReset, setNumberReset] = useState(false);
    const [ans, setAns] = useState(0);
    const [tmp, setTmp] = useState(0);

    const HandleButtonClick = (value) => {
        //TOOD: NaN 

        //TODO: Should d a switch-case to make it less messy. Maybe later

        //First we check special functions, so first we check if we have a zero

        if (value === "±") {
            setCurrentNumber(currentNumber * -1 + '');
        } else if (value === ".") {
            if (currentNumber.includes('.')) {
                return; //Do nothing
            } else {
                setCurrentNumber(currentNumber + value);
            }

        } else if (value === "ANS") {
            setCurrentNumber(ans);
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
            if (currentNumber != '') {
                removeOneCharacter();
            }

        } else {
            if (!isNaN(value)) { //isValue
                setBackDisabled(false);
                setOpDisabled(false);
                setFuncDisabled(false);
                if (currentNumber == "0") { //Avoid leding zero, 01 etc
                    setCurrentNumber(value);
                    setZeroDisabled(false); //Uggly fix, but it works
                } else if (numberReset) {
                    setCurrentNumber(value)
                    setNumberReset(false)
                } else {
                    setCurrentNumber(currentNumber + '' + value);
                }
            } else { //IsOperation
                if (isValidNumber(currentNumber)) {
            //        console.log("valid number, continue")
                    if (currentExpression == '') {
                        setExpression(currentNumber + value);
                        setCurrentNumber("0");
                    } else if (currentExpression.includes("=")) {
                        updateExpressionEq(value);
                    } else {
                        if (currentNumber != "0") { // Dont need this(probably :))
                            updateExpression(value);
                        } else {
                            setExpression(currentExpression.slice(0, -1) + value); //Change op
                        }
                    }
                } else {
                    console.log("invalid number, stop")
                }
                setExecDisabled(false);
            }
        }
       // console.log('Button clicked', value);  // Check so things makes sense
    };

    const resetNumber = () => {
        setCurrentNumber('0');
        setNumberReset(false);
    }

    const resetAll = () => {
        setCurrentNumber('0');
        setExpression('');
        setAns('');
        setNumberReset(false);
    }

    //Function to remove one character at the time,
    //untill the input is empty
    const removeOneCharacter = () => {
        setCurrentNumber(prevNumber => {
            prevNumber = prevNumber.toString(); //TODO: remember to remove
            const newNumber = prevNumber.slice(0, -1);
            if (newNumber === "") {
                // setBackDisabled(true);
                // setOpDisabled(true);
                return "0";
            } else {
                return newNumber.toString();
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
            setAns(result);
            setExpression(currentExpression + currentNumber + value);
            setNumberReset(true);
            //  setExecDisabled(true);
            // setZeroDisabled(true);
        } catch (error) {
            console.error("Error in evaluating expression");
            setExpression('');
            // setExecDisabled(true);
        }
    }

    const updateExpression = (value) => {

            try {
                setExpression(prevExpression => {
                    console.log("prevExp:", prevExpression);
                    console.log("currentNumber ", currentNumber)
                    setTmp(currentNumber); //Why did I even do this ? 
                    const result = eval(prevExpression + '' + currentNumber);
                    setCurrentNumber(result + '');
                    setAns(result + '');
                    setExpression(result + value);
                    setNumberReset(true);
                    setOpDisabled(true);

                })
                //  setExecDisabled(true);
                // setZeroDisabled(true);
            } catch (error) {
                console.error("Error in evaluating expression");
                // setExecDisabled(true);
            }
    }

    
    const updateExpressionEq = (value) => {
            console.log("1) CurrentExpression", currentExpression);

            try {
                setExpression(prevExpression => {
                    const expressionWithoutEqual = prevExpression.slice(0, -1);
                    console.log("currentExp:", currentExpression);
                    console.log("prevExp; ", prevExpression)
                    console.log("EE; ", expressionWithoutEqual)

                    const result = eval(expressionWithoutEqual);
                    console.log("result: ", result)
                    setAns(result + '');
                    setExpression(result + value);
                    setNumberReset(true);
                    setOpDisabled(true);

                });
                //  setExecDisabled(true);
                // setZeroDisabled(true);
            } catch (error) {
                console.error("Error in evaluating expression");
                // setExecDisabled(true);
            }       
    }

    const isValidNumber = str => {
        if (typeof str !== 'string') {
            str = str.toString();
        }

        if (str.charAt(str.length - 1) == ".") {
            return false;
        } else {
            return true;
        }
    };

    const getLastCharacter = str => {
        return str.charAt(str.length - 1);
    };


    return (
        <div className="calculator-layout">
            <Display expression={currentExpression} currentNumber={currentNumber} />
            <div className="button-grid">
                <CalculatorButton value="C" onClick={HandleButtonClick} customClass={"clear"} />
                <CalculatorButton value="CE" onClick={HandleButtonClick} customClass={"clear-all"} />
                <CalculatorButton value="ANS" onClick={HandleButtonClick} />
                <CalculatorButton value="<" onClick={HandleButtonClick} customClass={"erase"} />

                <CalculatorButton value="√(x)" onClick={HandleButtonClick} disabled={isFuncDisabled} customClass={"func"} />
                <CalculatorButton value="x²" onClick={HandleButtonClick} disabled={isFuncDisabled} customClass={"func"} />
                <CalculatorButton value="1/x" onClick={HandleButtonClick} disabled={isFuncDisabled} customClass={"func"} />

                <CalculatorButton value="*" onClick={HandleButtonClick} disabled={isOpDisabled} />
                <CalculatorButton value="1" onClick={HandleButtonClick} />
                <CalculatorButton value="2" onClick={HandleButtonClick} />
                <CalculatorButton value="3" onClick={HandleButtonClick} />
                <CalculatorButton value="/" onClick={HandleButtonClick} customClass={"Op"} disabled={isOpDisabled} />
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