
//define functions

let af = function(){
    console.log("a function")
}
function bf(){
    console.log("b function")
}

let cf = () => console.log("c function")


export function variables(){

    console.log(a)
    // undefined
    // warning: 'a' was used before it was defined 

    // console.log(b) 
    //it would throw an error : ReferenceError: Cannot access 'b' before initialization

    //console.log(c)
    // same

    var a = 3;
    let b = 4;
    const c = 5;

    console.dir(a)
    console.dir(b)
    console.dir(c)

    af();
    bf();
    cf();

}


export function practice(){

    //The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.

    const arr = [1,2,3,4,5,6]

    const arr2 = arr.map((item, index) => item*index)
    console.log(arr2)

    //The forEach() method executes a provided function once for each array element.
    
    arr.forEach(x => console.log(x))

    
}