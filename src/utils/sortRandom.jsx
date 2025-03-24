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
  
  let odd = [];
  let even = [];

  for (let i = 0; i < arr.length; i++) {
    
    if (arr[i].id % 2 === 0) even.push(arr[i]);
    else odd.push(arr[i]);
  }

  even.sort((a, b) => a - b);
  even.reverse();
  
  odd.sort((a, b) => b - a);
  odd.reverse();
  let index = 0;
  
  for (let j = 0; j < odd.length; j++) {
    arr[index] = odd[j];
    index++;
  }
  
  for (let j = 0; j < even.length; j++) {
    arr[index] = even[j];
    index++;
  }
  return arr;
};

const twoWaySort2 = (arr) => {
  
  let odd = [];
  let even = [];

  for (let i = 0; i < arr.length; i++) { 
    if (arr[i].id % 2 === 0) even.push(arr[i]);
    else odd.push(arr[i]);
    
  }
  
  even.sort((a, b) => b - a);
  
  odd.sort((a, b) => a - b);

  let index = 0;
  for (let j = 0; j < even.length; j++) {
    arr[index] = even[j];
    index++;
  }

  for (let j = 0; j < odd.length; j++) {
    arr[index] = odd[j];
    index++;
  }
  arr.reverse();
  return arr;
};

export const sortLocal = (arr)=>{
  const i = new Date().getHours()%4;
	if(i===0) return ascSort(arr);
	else if(i===1) return descSort(arr);
	else if(i===2) return twoWaySort1(arr);
	else return twoWaySort2(arr);
}