export const sortList=(arr)=>{
  	arr.sort(function (a, b) {
    	return Math.random() - 0.5;
  	});
    return arr;
}