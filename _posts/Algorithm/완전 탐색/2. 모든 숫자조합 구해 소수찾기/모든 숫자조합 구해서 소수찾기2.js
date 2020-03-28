const isPrime = (n) => {
    if (n < 2) return false;
    const sqrt = Math.sqrt(n);
    for (let i = 2; i <= sqrt; i++)
        if (n % i === 0) return false;
    return true;
}

/* 
  * 이렇게 ES6로 function을 선언하면 arguments를 사용 할 수 없음. 
    - const makeAllNumber = (number = null, numbers) => {}
    - 이런 error 문구를 띄움 -> 'arguments is not defined'
*/
window.countMakeAllNumber = 0;
const makeAllNumber = (number = null, ...numbers) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("===============RF START: " + countMakeAllNumber++ + ": " + number, numbers)
    // const makeAllNumber = function(number = null, numbers){
    // console.log(arguments);
    debugger;
    if (number === null) return [];
    if (numbers.length === 0) return [number];

    let arr = [number]; // arr : 조합된 숫자
    // console.log("### arr : ", arr);
    debugger;
    for (const idx in numbers) {
        // * rest : numbers에 idx 요소를 제외한 나머지 index 요소
        const rest = numbers.filter((v, i) => i !== parseInt(idx, 10));
        const idxNum = numbers[idx];

        // * number, idxNum type : string ""+"1" = "1"/ "1" + "2" = "12"
        //   - parseInt("1") -> 1

        // * rest가 빈배열 일때 까지 '재귀함수가' 반복 (위 filter return type은 array)

        //STUDY3
        console.log(`######## BEFORE1: arr, number, idxNum, rest - ${idx}` + arr, number, idxNum, rest );
        // console.log();
        arr = [...arr, ...makeAllNumber(number + idxNum, ...rest)];
        console.log(`# After mAN1 ${arr}` );

        console.log(`######## BEFORE mAN2: arr, idxNum, number, rest - ${idx}` + arr, idxNum, number, rest);
        arr = [...arr, ...makeAllNumber(idxNum + number, ...rest)];
        console.log(`# After mAN2 ${arr}` );

        arr = [...new Set(arr)]; //#STUDY2
    }

    return arr;
}

function solutions(numbers) {
    // debugger;
    numbers = numbers.split('');
    //#STUDY1
    debugger;
    // let makedNumbers = makeAllNumber("", ...numbers);
    let makedNumbers = makeAllNumber("", ...numbers).filter(v => v !== '')
        .map(v => parseInt(v));
    makedNumbers = [...new Set(makedNumbers)]; //중복숫자제거
    console.log("#모든숫자: ", makedNumbers);

    return makedNumbers.map(isPrime).filter(v => v === true).length;
}

console.log(solutions("123"))

/*
  # STUDY1
  # SUTDY2
  # STUDY3
  
  # STUDY1 - spread syntax
    - var newArr = numbers.unshift("");  makeAllnumber.apply(null, newArr);
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  # STUDY2 - Set
    * set으로 중복제거하기 
    -       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Remove_duplicate_elements_from_the_array
    - 다음 세가지 방법으로 중복 제거 하는 방법 설명 - new Set, filter(), forEach()
    https://wsvincent.com/javascript-remove-duplicates-array/

  # STUDY3 - 모든 문자열 찾는 방법
    * 
 */