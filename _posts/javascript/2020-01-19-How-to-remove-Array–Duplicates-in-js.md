---
title: ES6로 배열을 제거 할 수 있는 3가지 방법
date: 2020-01-20
tags:
  - Javascript
  - ES6
keywords:
  - 배열
  - 중복 제거 
---


# 요약

```js

const array = [1, 2, 300, 300, 300];

//1
[...new Set(array)];

//2
array.filter((item,index) => array.indexOf(item) === index);

//3
aray.reduce((unique, item) => unique.include(item) ? unique : [...unique, item], []);

```

## 1. Set
* Set Ojbect는 unique한 값만 저장한다. (primitive values, obejct references 구분 없이)

* return value
  - A new Set object.

* Set Object를 array로 반드는 방법 2가지 
  - spread opertator
  - Array.from

```js
const array = [1, 2, 300, 300, 300];

const uniqueSet = new Set(array);
//Set {1, 2, 300}

const delDuplArr = [...uniqueSet];
const delDuplArr2 = Array.from(uniqueSet);
//[1, 2, 300]
```


## 2. filter
* 배열의 indexOf 메소드를 사용해서 반복문을 돌면서 각 요소의 인덱스가 아닌 다른 인덱스를 가르키면 중복된다는 개념을 이용
* filter의 return 조건을 반대로 하면 중복되는 배열 요소를 반환할 수 있다. 

```js
var array = [1, 2, 300, 300, 300];
array.filter((val, idx) => {
  console.log({ val, idx, indexOf: array.indexOf(val) });
  return array.indexOf(val) === idx;
});

/**
 * # console.log({ val, idx, indexOf: array.indexOf(val) });
 *  {val: 1, idx: 0, indexOf: 0}
 *  {val: 2, idx: 1, indexOf: 1}
 *  {val: 300, idx: 2, indexOf: 2}
 *  {val: 300, idx: 3, indexOf: 2}
 *  {val: 300, idx: 4, indexOf: 2}
 * /
```


## 3. reduce


```js
var array = [1, 2, 300, 300, 300];
array.reduce((unique, item) => {
  console.log({ 
    item,
    unique,
    'unique.includes(item)': unique.includes(item),
    'return unique val': unique.includes(item) ? unique: [...unique, item]})
  return unique.includes(item) ? unique: [...unique, item];
}, []);


/*
  # console.log 
  => 
  {item: 1,   unique: Array(0), unique.includes(item): false,    return unique val: Array(1)}
  {item: 2,   unique: Array(1), unique.includes(item): false,    return unique val: Array(2)}
  {item: 300, unique: Array(2), unique.includes(item): false,    return unique val: Array(3)}
  {item: 300, unique: Array(3), unique.includes(item): **true**, return unique val: Array(3)}
  {item: 300, unique: Array(3), unique.includes(item): **true**, return unique val: Array(3)}

*/
```