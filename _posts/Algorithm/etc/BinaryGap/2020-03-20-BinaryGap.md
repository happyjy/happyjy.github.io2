---
title: BinaryGap
date: 2020-03-20
tags:
  - algorithm
keywords:
  - 2진수
---

# 문제 
* 주어진 10진수를 2진수로 바꾸고 1과 1사이에 0이 가장 많을때 0의 개수를 구하는 문제
        
# 해결 방법 
1. 10진수 2진수로 만들기  
    * 나누기, 나머지 연산자: %, /연산자
    * Math.floor: 소수점 버리기 
2. 2진수 순회하면서 1과 1사이 0이 제일 많은 숫자 구하기
    * 반복문 -> for, reduce
    * 변수 하나 추가해서 0 숫자 카운트 
        기존에 저장한 숫자보다 크면 제일 큰 숫자 변환하기
    2.1 없으면 0

# 추가 시도할 항목
* reduce 사용해보기! 현재 for문으로 순회하고 있다.  
    - 코드스피츠 객체지향 자바스크립트에서 3회차에서 observer pattern 적용시 Object.setProperty에서 reduce를 사용해서 
    - [!] reduce를 사용해서 reutrn 값으로 BinaryGap중 가장 큰것을 구할 수 있을 것이라고 생각했으나 1과 1사이에 있는 0의 개수를 reduce callback function 로직으로만 해결 할 수 없었다.  
    가장큰 BinaryGap을 비교할 수 있느 변수 하나, countFlag(0 카운트 여부)를 확인하는 변수 하나 두개가 더 필요했다.
    이럴거면 일반 반복문으로 순회하면서 원하는 값을 구하는데 추가 변수(가장큰 BinaryGap, countingFlag)를 사용해서 구하는게 더 좋을 것같다.
    - reduce는 일반 배열을 사용해서 안에 로직을 만들때 개발자가 실수할까봐 만든 함수라고 알고 있다. 

# CODE1 - 가장 큰 BinaryGap 찾을 때 "일반 배열" 사용
```js
    function getLargestBinaryGap(n){
        
        var binaryNum=[];
        while(n >= 1){
            binaryNum.push(n%2);
            n = Math.floor(n/2);
        }
        
        binaryNum = binaryNum.reverse();
        var largestBinaryGap = 0;
        var countingBinaryGap = 0;
        for(var i=0; i<binaryNum.length; i++){
            var num = binaryNum[i];
                if(num === 0){
                countingBinaryGap++;
            } else if(num === 1){
                if(countingBinaryGap > largestBinaryGap) largestBinaryGap = countingBinaryGap; 
                countingBinaryGap = 0;
            }
        }
        return largestBinaryGap;
    }

    //10 -> 1010(2)
    //5  -> 0101(2)
    console.log(getLargestBinaryGap(10));   //1
    console.log(getLargestBinaryGap(5));    //1
```

# CODE2 - 가장 큰 BinaryGap 찾을 "reduce" 사용
```js
    function getLargestBinaryGapByReduce(n){
        let binaryNum=[];
        while(n >= 1){
            binaryNum.push(n%2);
            n = Math.floor(n/2);
        }
        
        //100110001
        binaryNum = binaryNum.reverse();
        let largestBinaryGap = 0;
        let countFlag = false;
        binaryNum.reduce((p, c) => {
            console.log(p,c)
            if (c === 1 && !countFlag){
                countFlag = true;
                return p;
            } else if (c === 0 && countFlag){
                return ++p;
            } else if (c === 1 && countFlag){
                largestBinaryGap = p > largestBinaryGap ? p : largestBinaryGap;
                return 0;
            }
        }, 0);

        return largestBinaryGap;
    }
    //10 -> 1010(2)
    //5  -> 0101(2)
    console.log(getLargestBinaryGapByReduce(10));    //1
    console.log(getLargestBinaryGapByReduce(5));    //1
```

# 코드스피츠 ViewModel class에서 생성자 함수에서 reduce 예제
```js

var obj = {
    "width": "50%",
    "background": "#ffa",
    "cursor": "pointer"
}

console.log(Object.entries(obj));
/*
[
  ["width","50%"],
  ["background","#ffa"],
  ["cursor","pointer"]
]
*/

var result = Object.entries(obj).reduce(r, [k,v] => {
                console.log({r, k, v});
                r[k] = v;
                return r;
            }, {});
/*
    # console.log
        {} "width" "50%"
        {width: "50%"} "background" "#ffa"
        {width: "50%", background: "#ffa"} "cursor" "pointer"

    # result
        {width: "50%", background: "#ffa", cursor: "pointer"}
*/

Object.defineProperties(
    obj, 
    Object.entries(obj).reduce((r, [k,v]) => {
        console.log({r, k, v});
        r[k] = {    
                enumerable: true,
                get: () => v,
                set(newV) {
                    v = newV;
                }
        }
        return r;
    }, {})
)
/*
    r: {}
    k: "width"
    v: "50%"

    r: {width: {…}}
    k: "background"
    v: "#ffa"

    r: {width: {…}, background: {…}}
    k: "cursor"
    v: "pointer"

    # 최종결과 
    obj = {width: {…}, background: {…}, cursor: {…}}
    > {width: {…}, background: {…}, cursor: {…}} 이 값을 펼치면 아래와 같다.
    width: "50%"
    background: "#ffa"
    cursor: "pointer"
    get width: () => v
    set width: ƒ set(newV)
    get background: () => v
    set background: ƒ set(newV)
    get cursor: () => v
    set cursor: ƒ set(newV)
    __proto__: Object
*/

```
