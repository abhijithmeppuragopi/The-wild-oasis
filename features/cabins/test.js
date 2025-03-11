
let numbers=[3,5,7,9,1,0,6];
// console.log( Math.max(...numbers));
// console.log(numbers.sort((b,a)=>a - b));


// function reverseString(name){
//     let reversed="";
//     for(let i=name.length-1;i>=0;i--){
//         reversed=reversed + name[i];
//     }
//     console.log(reversed)
//     return reversed

// }
// reverseString('Abhijith');
let numbers=[3,5,7,9,1,0,6];
function maxNum(numbers){
 let val=numbers[0];
  console.log( numbers.reduce((preVal,value)=> preVal < value ? value :preVal  ,val))
}

maxNum(numbers);
numbers.reduc
[3,5,7,9,1,0,6].reduce((preVal,value)=> preVal < value ? value :preVal  ,3);
let numbers=[3,5,7,9,1,0,6];
function maxn(numbers){
    let max=numbers[0];
    for(let i=1;i< numbers.length;i++ ){
        if(numbers[i] > max){
            max= numbers[i];
        }
    }
    return max;
    
}
console.log(maxn(numbers));
const sliced = numbers.slice(1,4);
let numbers=[3,5,7,9,1,0,6,3,9];
function Duplicate(numbers){
  const val= [...new Set(numbers)];
//   const dupli=[...val];
  return val
}
console.log(Duplicate(numbers));
let numbers=[3,5,7,9,1,0,6,3,9];
function dupli(numbers){
    const num=numbers;
    return num.filter((a,b)=>a!==b)
}