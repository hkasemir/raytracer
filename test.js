function dotP(arr1, arr2){
	var productSum = 0;
	for(var i = 0; i < arr1.length; i++){
		productSum += arr1[i]*arr2[i];
	}
	return productSum
}
function addVector(x, y){
	return [x[0] + y[0], x[1] + y[1], x[2] + y[2]];
}
function minus(x, y){
	return [x[0] - y[0], x[1] - y[1], x[2] - y[2]];
}
function magnitude(array){
	return Math.sqrt(array[0]*array[0] + array[1]*array[1] + array[2]*array[2])
}
function normalizeVector(array){
	var m = magnitude(array);
	return [array[0]/m, array[1]/m, array[2]/m];
}
function createVectors(width, height){
	var arrays = [];
	for(var i = -1; i < 1; i += 2/width){
		var latestArray = [];
		for(var j = -1; j < 1; j += 2/height){
			latestArray.push(normalizeVector([j, 10, i]));
		}
			arrays.push(latestArray);
	}
	return arrays;
}

function intersects(lin, sph){
	var a = 1;
	var b = 2*(dotP(lin, minus([0,0,0], [sph.x, sph.y, sph.z])));
	var c = dotP(minus([0,0,0], [sph.x, sph.y, sph.z]), minus([0,0,0], [sph.x, sph.y, sph.z])) - sph.r*sph.r;
	var radicand = b*b - 4*a*c;
	return radicand >= 0;
}

function checkIntersection(arrays, sph){
	var intersectionRows = [];
	for(var i = 0; i < arrays.length; i++){
		var intersectionRow = [];
		for(var j = 0; j < arrays[i].length; j++){
			if(intersects(arrays[i][j], sph)){
				intersectionRow.push('x')
			} else {
				intersectionRow.push(' ')
			}
		}
		intersectionRows.push(intersectionRow)
	}
	return intersectionRows
}

var sphere = {x:0, y:100, z:0, r:5};
var line1 = [1,0,0];
var line2 = [0,1,0];
var array1 = [1,2,3];
var array2 = [3,2,1];

console.log(addVector(array1, array2));
console.log(magnitude(array1));
console.log(minus(array1, array2));
console.log(dotP(array1, array2) === 10);
console.log(checkIntersection(createVectors(10,10),sphere));
console.log(intersects(line1, sphere) === false);
console.log(intersects(line2, sphere) === true);
