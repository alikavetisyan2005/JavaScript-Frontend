const square = (num) => num * num;


function trace(callback){
    const history = [];


    function fn(...args){
        const result = callback(...args);

        history.push({
            in: args,
            out: result
        })

        return result;
    }
    fn.history = history;

    return fn
}


const fn = trace(square);
console.log(fn.history)
console.log(fn(4))
console.log(fn(5))
console.log(fn.history)