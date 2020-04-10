import React, { Component } from 'react';
import './App.css';
import Button from './Button';
let valTest = "";
let numberArray = [];
let operationArray = [];
let result = 0;
let possibleOperators = ["+", "-", "*", "/","%"];
let flagFordot = false;
let symbols = ["(-","."];
let index = -1;

class App extends Component {

  getCalculatedValueForOther = (lengthOfText) =>{
    if(valTest===""){
      valTest="(-";
    }else{
      const regexpWithoutSymbol = /[-+%*/]/ig;
      let contVar = valTest.match(regexpWithoutSymbol);
      if(valTest==="(-"){
        valTest="";
        return;
      }
      if (null == contVar) {
        valTest = "(-" + valTest;
        return;
      }
      let lastChar = valTest.charAt(lengthOfText - 1);
      if(!valTest.endsWith("(-") && possibleOperators.includes(lastChar)){
        valTest = valTest + "(-";
        return;
      }
      if(valTest.startsWith("(-") && null != contVar && contVar.length<=1){
        valTest = valTest.substring(2, lengthOfText);
        return;
      }
      if(valTest.endsWith("(-")){
        valTest = valTest.substring(0, lengthOfText-2);
        return;
      }
      this.getLastIndexOfForCharacter(valTest);
      if(index !==-1){
        let tempStr = valTest.substring(index+1,lengthOfText);
        if(!tempStr.includes('+','%','*','/')){
          if(tempStr.startsWith('(-')){
            valTest = valTest.substring(0,index+1)+valTest.substring(index+3,lengthOfText);
          }else{
            valTest = valTest.substring(0,index+1)+"(-"+valTest.substring(index+1,lengthOfText);
          }
        }
        return;
      }
    }
       
  }
  
  getLastIndexOfForCharacter = (textVal) => {
    if(textVal.lastIndexOf('+')>0){
      index = this.getIndex(index,textVal.lastIndexOf('+'));
    }
    if(textVal.lastIndexOf('*')>0){
      index = this.getIndex(index,textVal.lastIndexOf('*'));
    }
    if(textVal.lastIndexOf('/')>0){
      index = this.getIndex(index,textVal.lastIndexOf('/'));
    }
    if(valTest.lastIndexOf('%')>0){
      index = this.getIndex(index,textVal.lastIndexOf('%'));
    }
    if(textVal.lastIndexOf('-')>0){
      let tempText = valTest.charAt(textVal.lastIndexOf('-')-1);
      if(tempText !== "(" ){
        index = this.getIndex(index,textVal.lastIndexOf('-'));
      }
    }
    return index;
  }

  getIndex = (index,lastIndex) =>{
    return index<lastIndex ? lastIndex : index;
  }

  getValueHandler = (event) => {
    let temp = event.target.innerText;
    let lengthOfText = valTest.length;
    if (possibleOperators.includes(temp)) {
      let lChar = valTest.charAt(lengthOfText-1);
      if (valTest === "" || valTest==="." || valTest.substring(lengthOfText-2,lengthOfText) === '(-' || symbols.includes(lChar) || possibleOperators.includes(lChar)) {
        return;
      }
      flagFordot = false;
      operationArray.push(temp);
      valTest = valTest + temp;
    } else if (temp === '+/-') {
      this.getCalculatedValueForOther(lengthOfText);
    } else {
      if(temp==="."  && !flagFordot){
        flagFordot = true;
        valTest = valTest + temp;
      }else if(temp!=="."){
        valTest = valTest + temp;
      }
    }

    document.getElementById('calculationArea').innerText = valTest;
    document.getElementById('resultArea').innerText = "";
  }

  clearDisplaySection = () => {
    valTest = "";
    document.getElementById('calculationArea').innerText = "";
    document.getElementById('resultArea').innerText = "";
    result = 0;
    valTest = "";
    numberArray = [];
    operationArray = [];
    index = -1;
    flagFordot=false;
  }

  getFinalNumberArray = () =>{
    let temNumArray=[];
    let j=0;
    let i=0;
    while(i < numberArray.length){
      let str = numberArray[i];
      if(str==='(' && (i+1)<numberArray.length){
        temNumArray[j++]="-"+numberArray[i+1];
        i=i+2;
      }else{
        temNumArray[j++]=numberArray[i];
        i++;
      }
    }
    return temNumArray;
  }
  calculation = () => {
    if (operationArray.length === 0) {
      return;
    }
    if(valTest.endsWith("(-") || valTest.endsWith("+") || valTest.endsWith("-") || valTest.endsWith("*") || valTest.endsWith("/") || valTest.endsWith("%")){
      return;
    }
    numberArray = valTest.trim().split('+').join(',').split('-').join(',').split('*').join(',').split('/').join(',').split('%').join(',').split(',');
    if (valTest.indexOf('(-') >= 0) {
      numberArray = this.getFinalNumberArray();
    }
    if (numberArray.length < 2 || (numberArray[(numberArray.length - 1)] === "")) {
      return;
    }
    result = this.getNumber(numberArray[0]);
    for (let i = 0; i < operationArray.length; i++) {
      let n = this.getNumber(numberArray[i + 1]);
      switch (operationArray[i]) {
        case '+':
          result = this.add(result,n);
          break;
        case '-':
          result = this.sub(result, n);
          break;
        case '*':
          result = this.mul(result, n);
          break;
        case '/':
          result = this.div(result, n);
          break;
        case '%':
          result = this.rem(result, n);
          break;
        default:
          return 'foo';
      }
    }

    document.getElementById('resultArea').innerText = result;
    result = 0;
    numberArray = [];
  }

  getNumber = (n) => {
    if(n.indexOf('.')>=0){
      return parseFloat(n);
    }
    return parseInt(n);
  }

  add = (m, n) => {
    return m + n;
  }

  sub = (m, n) => {
    return m - n;
  }

  mul = (m, n) => {
    return m * n;
  }

  div = (m, n) => {
    return m / n;
  }

  rem = (m, n) => {
    return m % n;
  }

  render() {

    return (
      <div className="App" >

        <div className="display-section">
          <div id="calculationArea" className="calculation-area"></div>
          <div id="resultArea" className="result-area"></div>
        </div>
        <div className="button-section">
          <div className="button-row">
            <Button name="C" changeRef={this.clearDisplaySection} />
            <Button name="+/-" changeRef={this.getValueHandler} />
            <Button name="%" changeRef={this.getValueHandler} />
            <Button name="/" mathVal="true" changeRef={this.getValueHandler} />
          </div>
          <div className="button-row">
            <Button name="7" changeRef={this.getValueHandler} />
            <Button name="8" changeRef={this.getValueHandler} />
            <Button name="9" changeRef={this.getValueHandler} />
            <Button name="*" mathVal="true" changeRef={this.getValueHandler} />
          </div>
          <div className="button-row">
            <Button name="4" changeRef={this.getValueHandler} />
            <Button name="5" changeRef={this.getValueHandler} />
            <Button name="6" changeRef={this.getValueHandler} />
            <Button name="-" mathVal="true" changeRef={this.getValueHandler} />
          </div>
          <div className="button-row">
            <Button name="1" changeRef={this.getValueHandler} />
            <Button name="2" changeRef={this.getValueHandler} />
            <Button name="3" changeRef={this.getValueHandler} />
            <Button name="+" mathVal="true" changeRef={this.getValueHandler} />
          </div>
          <div className="button-row">
            <Button name="0" changeRef={this.getValueHandler} />
            <Button name="." changeRef={this.getValueHandler} />
            <Button name="=" changeRef={this.calculation} />
          </div>
        </div>
      </div>
     
    );

   }
}

export default App;

