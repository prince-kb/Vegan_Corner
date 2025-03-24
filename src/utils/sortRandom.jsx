const sortList = (arr) => {
  arr.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  return arr;
};

const ascSort = (arr) => {
  arr.sort(function (a, b) {
    return a.id - b.id;
  });
  return arr;
};

const descSort = (arr) => {
  arr.sort(function (a, b) {
    return b.id - a.id;
  });
  return arr;
};

const twoWaySort1 = (arr) => {
  // To store odd numbers
  let odd = [];

  // To store even numbers
  let even = [];

  for (let i = 0; i < arr.length; i++) {
    // If number is even, push it to the even list
    if (arr[i].id % 2 === 0) {
      even.push(arr[i]);
    }
    // If number is odd, push it to the odd list
    else {
      odd.push(arr[i]);
    }
  }

  // Sort the even list in ascending order
  even.sort((a, b) => a - b);

  // Sort the odd list in descending order
  odd.sort((a, b) => b - a);

  let index = 0;

  // First, store the odd numbers in the array
  for (let j = 0; j < odd.length; j++) {
    arr[index] = odd[j];
    index++;
  }

  // Then, store the even numbers in the array
  for (let j = 0; j < even.length; j++) {
    arr[index] = even[j];
    index++;
  }
  return arr;
};

const twoWaySort2 = (arr) => {
  // To store odd numbers
  let odd = [];

  // To store even numbers
  let even = [];

  for (let i = 0; i < arr.length; i++) {
    // If number is even, push it to the even list
    if (arr[i].id % 2 === 0) {
      even.push(arr[i]);
    }
    // If number is odd, push it to the odd list
    else {
      odd.push(arr[i]);
    }
  }

  // Sort the even list in ascending order
  even.sort((a, b) => b - a);
  // Sort the odd list in descending order
  odd.sort((a, b) => a - b);

  let index = 0;

  // Then, store the even numbers in the array
  for (let j = 0; j < even.length; j++) {
    arr[index] = even[j];
    index++;
  }

  // First, store the odd numbers in the array
  for (let j = 0; j < odd.length; j++) {
    arr[index] = odd[j];
    index++;
  }

  return arr;
};

export const sortLocal = (arr)=>{
	let i = localStorage.getItem("sortOrder");
	if(!i){
		i=Math.floor(Math.random()*4);
		localStorage.setItem("sortOrder",i);
	}
	if(i==0) return ascSort(arr);
	else if(i==1) return descSort(arr);
	else if(i==2) return twoWaySort1(arr);
	else return twoWaySort2(arr);
}