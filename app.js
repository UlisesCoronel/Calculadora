const numberButton = document.querySelectorAll(".numbers");
const operationButton = document.querySelectorAll("[data-operations]");
const equalButton = document.getElementById("buttonEq");
const delButton = document.getElementById("buttonDel");
const clearButton = document.getElementById("buttonClear");
const prevValueText = document.querySelector(".valor-superior");
const currentValueText = document.querySelector(".valor-inferior");

class Calculadora {
  //inicializa los valores
  constructor(currentValueText, prevValueText) {
    this.prevValueText = prevValueText;
    this.currentValueText = currentValueText;
    this.prevValue = "";
    this.currentValue = "";
    this.operation = undefined;
  }

  //agrega un numero o '.'
  addNumber(value) {
    if (value === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue + value;
  }

  //imprimir pantalla
  printDisplay() {
    this.currentValueText.innerText = this.currentValue;
    this.prevValueText.innerText = this.prevValue;
  }

  //realiza los calculos
  calc() {
    let result;
    let floatCurrentValue = parseFloat(this.currentValue);
    
    let floatPrevValue = parseFloat(this.prevValue);
    console.log(floatPrevValue);
    // previene error en las transformaciones
    if (isNaN(floatCurrentValue) || isNaN(floatPrevValue)) return;
    switch (this.operation) {
      case "+":
        result = floatPrevValue + floatCurrentValue;
        console.log('suma');
        break
      case "-":
        result = floatPrevValue - floatCurrentValue;
        console.log('resta');
        break
      case "*":
        result = floatPrevValue * floatCurrentValue;
        console.log('mult');
        break
      case "/":
        result = floatPrevValue / floatCurrentValue;
        console.log('div');
        break
      case "%":
        result = floatPrevValue % floatCurrentValue;
        console.log('mod');
        break;
        default: return;
    }

    // muestra el resultado y reinicia las variables
    this.currentValue = result;
    this.operation = undefined;
    this.prevValue = "";
  }

  chooseOperation(value) {
    console.log(value);
    if (this.currentValue == "") return; //pasa en caso de que no se hayan ingresado numeros
    if (this.prevValue != "") {
      //realiza el calculo en caso de que haya una operacion guardada
      this.calc();
    }
    this.operation = value;
    this.prevValue = this.currentValue;
    this.currentValue = "";
  }

  clear() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  delete() {
    this.prevValue = "";
    this.currentValue = "";
    this.operation = undefined;
  }
}

//Construye la clase calculadora
const calculadora = new Calculadora(currentValueText, prevValueText);

// agregar evento a los botones numeros
numberButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculadora.addNumber(btn.value);
    calculadora.printDisplay();
  });
});

// agrega evento a las operaciones
operationButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculadora.chooseOperation(btn.value);
  });
});

// agrega evento al =
equalButton.addEventListener("click", () => {
  calculadora.calc();
  calculadora.printDisplay();
});

delButton.addEventListener("click", () => {
  calculadora.delete();
  calculadora.printDisplay();
});

clearButton.addEventListener("click", () => {
  calculadora.clear();
  calculadora.printDisplay();
});
