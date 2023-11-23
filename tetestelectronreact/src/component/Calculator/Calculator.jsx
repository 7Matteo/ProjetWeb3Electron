// Calculator.jsx
import React, { useState } from 'react';
import Button from '../Button/Button.jsx';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleCalculate = () => {
    try {
      setExpression(eval(expression).toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
  };

  return (
    <div className="calculator-container">
      <input type="text" value={expression} readOnly />
      <div className="button-row">
        <Button value="7" onClick={() => handleButtonClick('7')} />
        <Button value="8" onClick={() => handleButtonClick('8')} />
        <Button value="9" onClick={() => handleButtonClick('9')} />
        <Button value="/" onClick={() => handleButtonClick('/')} />
      </div>
      <div className="button-row">
        <Button value="4" onClick={() => handleButtonClick('4')} />
        <Button value="5" onClick={() => handleButtonClick('5')} />
        <Button value="6" onClick={() => handleButtonClick('6')} />
        <Button value="*" onClick={() => handleButtonClick('*')} />
      </div>
      <div className="button-row">
        <Button value="1" onClick={() => handleButtonClick('1')} />
        <Button value="2" onClick={() => handleButtonClick('2')} />
        <Button value="3" onClick={() => handleButtonClick('3')} />
        <Button value="-" onClick={() => handleButtonClick('-')} />
      </div>
      <div className="button-row">
        <Button value="0" onClick={() => handleButtonClick('0')} />
        <Button value="." onClick={() => handleButtonClick('.')} />
        <Button value="=" onClick={handleCalculate} />
        <Button value="+" onClick={() => handleButtonClick('+')} />
      </div>
      <div className="button-row">
        <Button value="C" onClick={handleClear} />
      </div>
    </div>
  );
};

export default Calculator;
