
function isPrime(){
    let nonPrimes = new Map();
    let primes = new Map();
    return function primeNumber(num){
        if(primes.has(num)) return true;
        if(nonPrimes.has(num)) return false;
        
        if(num < 2){
            nonPrimes.set(num,false);
            return false;
        }
        for(let i = 2; i <= Math.sqrt(num); i++){
            if(num % i === 0){ 
                nonPrimes.set(num,false);              
                return false;
            }
        }
        primes.set(num,true);
        return true
    }
}


let fn = isPrime();
console.log(fn(8))