export function bubbleSortAnimations(array) {
  var animations = {};
  if (array.length < 2) {
    return array;
  }
  animations["swapList"] = [];
  animations = bubbleSortHelper(array, animations);
  return animations;
}

// sorts the array using bubble sort
function bubbleSortHelper(array, animations) {
  for (var i = 0; i < array.length - 1; i++) {
    for (var j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        animations["swapList"].push([j, j + 1]);
      }
    }
  }
  return animations;
}

export function selectionSortAnimations(array) {
  var animations = {};
  if (array.length < 2) {
    return array;
  }
  animations["swapList"] = [];
  animations = selectionSortHelper(array, animations);
  return animations;
}

// sorts the array using bubble sort
function selectionSortHelper(array, animations) {
  for (var i = 0; i < array.length - 1; i++) {
    var min_index = i;

    // finding the minimumn index from[i,...,length]
    for (var j = i + 1; j < array.length; j++) {
      if (array[j] < array[min_index]) {
        min_index = j;
      }
    }
    // swapping i and element at minimum index;
    var temp = array[i];
    array[i] = array[min_index];
    array[min_index] = temp;
    animations["swapList"].push([i, min_index]);
  }
  return animations;
}
export function insertionSortAnimations(array) {
  var animations = {};
  if (array.length < 2) {
    return array;
  }
  animations["swapList"] = [];
  animations = insertionSortHelper(array, animations);
  return animations;
}
// sorts the array using insertion sort
function insertionSortHelper(array, animations) {
  for (var i = 1; i < array.length; i++) {
    var key = array[i];
    var j = i - 1;
    var m = {};
    m["key"] = [];
    m["predecessors"] = [];
    while (j >= 0 && key < array[j]) {
      array[j + 1] = array[j];
      m["predecessors"].push([j, j + 1]);
      j--;
    }
    array[j + 1] = key;
    m["key"].push([i, j + 1]);
    animations["swapList"].push(m);
  }
  return animations;
}
