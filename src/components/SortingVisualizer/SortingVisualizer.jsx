import React from "react";

import "./SortingVisualizer.css";
import "./button.css";
import { bubbleSortAnimations } from "../SortingAlgorithms/SortingAlgorithms.jsx";
import { selectionSortAnimations } from "../SortingAlgorithms/SortingAlgorithms.jsx";
import { insertionSortAnimations } from "../SortingAlgorithms/SortingAlgorithms.jsx";
//import { ReactComponent } from '*.svg'
//import { render } from '@testing-library/react';
//import {ButtonGroup} from 'react-bootstrap';
export default class SortingVisualizer extends React.Component {
  render() {
    var array = this.props.array;

    // this for loop basically shows how to print elements of an array
    // if we don't know the mp every value to some key we get error in console

    // to get around that error we use element.map( (value, idx) => "thing to map to")
    // this is also like a for loop
    //const list = []
    // for(var i = 0; i < array.length; i++) {
    //     list.push(<li key> {array[i]}</li>);
    // }
    //console.log(list)
    //console.log("this is props.size", this.props.size)
    return (
      <div>
        <div>
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  height: `${value / 1}px`,
                  width: "15px",
                }}
              ></div>
            ))}
            <div>
              {this.props.children}
              <button
                className="button-style"
                onClick={() => this.bubbleSort()}
              >
                Merge Sort
              </button>
              <button
                className="button-style"
                onClick={() => this.bubbleSort()}
              >
                Insertion Sort
              </button>
              <button
                className="button-style"
                onClick={() => this.bubbleSort()}
              >
                Bubble Sort
              </button>
              <button
                className="button-style"
                onClick={() => this.selectionSort()}
              >
                Selection Sort
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    );
  }

  mergeSort() {
    const bars = document.getElementsByClassName("array-bar");
    bars[0].style.backgroundColor = "red";
    bars[1].style.backgroundColor = "red";
    setTimeout(() => {
      bars[0].style.backgroundColor = "black";
      bars[1].style.backgroundColor = "black";
    }, 1000);
    setTimeout(() => {
      var x = bars[0].style.height;
      x = `${x}`;
      var y = bars[1].style.height;
      y = `${y}`;
      console.log("## ", x, " ", y);
      bars[0].style.height = y;
      bars[1].style.height = x;
      console.log(bars[0].style.height, bars[1].style.height);
    }, 1000);
  }

  // the function to sort the array using bubble osrt
  bubbleSort() {
    var sortedArray = this.props.array.slice().sort((a, b) => a - b);
    var checker = this.props.array.slice();
    var arr = this.props.array.slice();
    this.isSorted = true;

    //console.log("check 1", areEqualArrays(sortedArray, arr));
    var animations = bubbleSortAnimations(arr);
    //this.props.onArrayChange(arr);
    //console.log("check 2", areEqualArrays(sortedArray, arr));
    var speed = this.props.speed;
    var swapList = animations["swapList"];
    var bars = document.getElementsByClassName("array-bar");
    let i = 0;
    for (i = 0; i < swapList.length; i++) {
      this.sortHelper(i, swapList, speed, bars);
    }
  }
  insertionSort() {
    var sortedArray = this.props.array.slice().sort((a, b) => a - b);
    var arr = this.props.array.slice();

    console.log("insertion check 1", areEqualArrays(sortedArray, arr));
    var animations = insertionSortAnimations(arr);
    console.log("insertion check 2", areEqualArrays(sortedArray, arr));
    var speed = this.props.speed;
    var swapList = animations["swapList"];
    console.log("swapList", swapList);
    var bars = document.getElementsByClassName("array-bar");
    let i = 0;
    speed = 0;
    for (i = 0; i < swapList.length; i++) {
      setTimeout(() => {
        var key = swapList[i]["key"];
        var predecessors = swapList[i]["predecessors"];
        var keyInitialPosition = key[0][0];
        var keyFinalPosition = key[0][1];
        var keyHeight = bars[keyInitialPosition].style.height;
        keyHeight = `${keyHeight}`;
        bars[keyInitialPosition].style.height = `${0}`;
        for (var j = 0; j < predecessors.length; j++) {
          var predecessorInitial = key[j][0];
          var predecessorFinal = key[j][1];
          bars[predecessorInitial].style.height = 0;
          bars[predecessorInitial].style.backgroundColor = "red";

          bars[predecessorFinal].style.backgroundColor = "black";
        }
      }, i * speed);
    }
  }

  selectionSort() {
    var sortedArray = this.props.array.slice().sort((a, b) => a - b);
    var checker = this.props.array.slice();
    var arr = this.props.array.slice();
    var speed = this.props.speed;
    var animations = bubbleSortAnimations(arr);
    var swapList = animations["swapList"];

    var bars = document.getElementsByClassName("array-bar");
    let i = 0;
    for (i = 0; i < swapList.length; i++) {
      this.sortHelper(i, swapList, speed, bars);
    }
    //this.currentArray = this.props.array.slice().sort();
  }

  // Handles the animation and the swapping
  sortHelper(i, swapList, speed, bars) {
    setTimeout(() => {
      //var bars = document.getElementsByClassName("array-bar");
      var strip1 = swapList[i][0];
      var strip2 = swapList[i][1];
      // console.log(strip1, " <--->", strip2)
      // changing the color to red of the bars to be swapped
      //console.log(
      //  speed * i,
      //  speed * i + speed / 4.0,
      //  speed * i + (2 * speed) / 4.0,
      //  speed * i + (3 * speed) / 4.0
      //);
      setTimeout(() => {
        bars[strip1].style.backgroundColor = "red";
        bars[strip2].style.backgroundColor = "red";
      }, speed * i + speed / 4.0);

      // changing the swapped bars to black
      setTimeout(() => {
        bars[strip1].style.backgroundColor = "turquoise";
        bars[strip2].style.backgroundColor = "turquoise";
      }, speed * i + (2 * speed) / 4.0);
      // the swapping animation
      setTimeout(() => {
        var x = bars[strip1].style.height;
        var y = bars[strip2].style.height;
        x = `${x}`;
        y = `${y}`;
        //console.log(strip1, "***",strip2)
        //console.log(x, "##",y)
        bars[strip1].style.height = y;
        bars[strip2].style.height = x;
      }, speed * i + (3 * speed) / 4.0);
    }, speed * i);
  }
}
// function testAlgorithms
// checks if 2 arrays are equal
// return true if they are otherwise false
function testAlgorithms(arr1, arr2) {
  console.log(
    areEqualArrays(
      arr1,
      arr2.slice().sort((a, b) => a - b)
    )
  );
  console.log(arr1);
  console.log(arr2.slice().sort((a, b) => a - b));
}

// to generate radnom numbers provided between  values
function generateRandomNumberBetween(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

// to check if 2 arrays are the same
function areEqualArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
