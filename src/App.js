import React from "react";
import { Component } from "react";
import "./App.css";
import "./components/SortingVisualizer/mainBackground.css";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";

class App extends Component {
  initialElements = 10;
  state = {
    numElements: 10,
    newNumElements: 10,
    array:this.setArray(this.initialElements), // [500, 200, 300, 400, 100], 
    speed: 1,
  };
  setArray(numElements) {
    const array = [];
    const min = 10;
    const max = 700;
    //console.log("state", this.state);
    for (let i = 0; i < numElements; i++) {
      // how many random numbers you want to sort
      array.push(generateRandomNumberBetween(min, max));
    }
    //this.setState({array:array})
    return array;
  }
  resetArray(numElements) {
    numElements = parseInt(numElements)
    var array = this.setArray(numElements);
    console.log("Reset Pressed", array, numElements)
    this.setState({ array: array, color: "red" , numElements : numElements});
  }

  handleChange = (event) => {
    // the new number of elements we need to make an array for
    if (!isNaN(event.target.value)) {
      var number = parseInt(event.target.value);
      if (number > 100 || number < 0) {
        alert("Please enter a number between 100 and 1");
      } else {
        this.setState({ newNumElements: number });
      }
    } else {
      this.setState({ newNumElements: 0 });
    }
  };
  handleSubmit = (event) => {
    console.log("Submit before state", this.state);
    var newArray = this.setArray(this.state.newNumElements);
    this.setState({ numElements: this.state.newNumElements, array: newArray });
    console.log("Submit after state", this.state);
    event.preventDefault(); // we need this so that the page doesn't reload on clicking the sumit button
  };
  componentDidMount() {
    //console.log("mount")
  }
  //handleChildArray = (newArray) => {
  //  console.log("new state array", newArray)
  //  this.setState({ array: newArray });
  //  console.log("new state array 2", this.state.array)
  //};

  render() {
    //this.helper();
    //console.log("App rendered 1")
    return (
      <div>
        <h2 style={{ textAlign: "center", color: "DarkBlue", fontSize: 50 }}>
          {" "}
          Welcome to the Sorting Visualizer
        </h2>
        <h2> {this.renderFormOfNumberOfElements()}</h2>
        <div className="App">
          <SortingVisualizer
            size={this.state.numElements}
            array={this.state.array}
            speed={this.state.speed}
          >
            <button
              className="button-style"
              onClick={() => this.resetArray(this.state.numElements)}
            >
              Reset Array
            </button>
          </SortingVisualizer>
        </div>
      </div>
    );
  }

  renderFormOfNumberOfElements() {
    var label = "Number of elements to sort:  ";
    let layout = (
      <form onSubmit={this.handleSubmit}>
        <label>
          {label}
          <input
            type="text"
            value={this.renderFormValue()}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
    return layout;
  }
  renderFormValue() {
    if (isNaN(this.state.newNumElements)) {
      return 0;
    } else {
      return this.state.newNumElements;
    }
  }
}

// to generate radnom numbers provided between  values
function generateRandomNumberBetween(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}
export default App;
