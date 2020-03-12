[TOC]





# 화살표 함수와 일반함수의 차이점

1. 선언 방법이 다르다. 
   1. return 부분을 확인해보자 
2. 화살표, 일반함수에서 this의 scope영역이 다르다. 
   1. 화살표 함수는 상위 this scope을 가르킨다.
3. 화살표 함수를 사용하지 말아야할 4가지 케이스가 있따. 
   - 메소드, prototype, 생성자함수, addEventListener

# 1. 화살표 함수의 선언

- 화살표 함수(Arrow function)는 function 키워드 대신 화살표(=>)를 사용하여 보다 간략한 방법으로 함수를 선언
- 하지만 모든 경우 화살표 함수를 사용할 수 있는 것은 아니다.
- 화살표 함수의 기본 문법은 아래와 같다.

```js
// 매개변수 지정 방법
    () => { ... } // 매개변수가 없을 경우
     x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.

// 함수 몸체 지정 방법
x => { return x * x }  // single line block
x => x * x             // 함수 몸체가 한줄의 구문이라면 중괄호를 생략할 수 있으며 암묵적으로 return된다. 위 표현과 동일하다.

() => { return { a: 1 }; }
() => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.
(a) => (a *= a, a)	// 중요!!! 
/*
	(a) => (a *= a, a) 
	==
	(a) => {
		a *= a 
    	return a
    }
*/

() => {           // multi line block.
  const x = 10;
  return x * x;
};
           
// 콜백합수에서 사용하는 경우 
const arr = [1, 2, 3];
const pow = arr.map(x => x * x);

console.log(pow); // [ 1, 4, 9 ]

```



# 2. 화살표 함수의 호출

- 화살표 함수는 익명 함수로만 사용할 수 있다. 
- 따라서 화살표 함수를 호출하기 위해서는 함수 표현식을 사용한다.

```javascript
// ES5
var pow = function (x) { return x * x; };
console.log(pow(10)); // 100
// ES6
const pow = x => x * x;
console.log(pow(10)); // 100
```

- 콜백 함수로 사용할 수 있다. 
- 이 경우 일반적인 함수 표현식보다 표현이 간결하다.

```javascript
// ES5
var arr = [1, 2, 3];
var pow = arr.map(function (x) { // x는 요소값
  return x * x;
});
console.log(pow); // [ 1, 4, 9 ]

// ES6
const arr = [1, 2, 3];
const pow = arr.map(x => x * x);

console.log(pow); // [ 1, 4, 9 ]
```



# 3. this

## 3.1 일반 함수의 this

- [중요]자바스크립트의 경우 함수 <u>호출 방식에 의해 [this](https://poiemaweb.com/js-this)에 바인딩할 어떤 객체가 동적으로 결정된다</u>. 
  다시 말해, 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, **함수를 호출할 때 함수가 어떻게 호출되었는지에 따라** this에 바인딩할 객체가 동적으로 결정된다.
- 콜백 함수 내부의 this는 전역 객체 window를 가리킨다.

```JS
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // (A)
  return arr.map(function (x) {
    return this.prefix + ' ' + x; // (B)
  });
};

var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```



- [중요] 콜백 함수 내부의 this가 메소드를 호출한 객체(생성자 함수의 인스턴스)를 가리키게 하려면 아래의 3가지 방법이 있다.
  (Arrow Function 제외)

1. **that = this**
2. **map(func, this)**
3. **bind(this)**

```js
// Solution 1: that = this
function Prefixer(prefix) {
  this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) {
  var that = this;  // this: Prefixer 생성자 함수의 인스턴스
  return arr.map(function (x) {
    return that.prefix + ' ' + x;
  });
};
var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));



// Solution 2: map(func, this)
function Prefixer(prefix) {
  this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + ' ' + x;
  }, this); // this: Prefixer 생성자 함수의 인스턴스
};
var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));


// Solution 3: bind(this)
function Prefixer(prefix) {
  this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    return this.prefix + ' ' + x;
  }.bind(this)); // this: Prefixer 생성자 함수의 인스턴스
};
var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));

```



## 3.2 화살표 함수의 this ( Lexical this ! )

- **일반 함수는** 함수를 선언할 때 **this에 바인딩할 객체가 정적으로 결정되는 것이 아니고**, 
  함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 **this에 바인딩할 객체가 동적으로 결정**된다고 하였다.
- **화살표 함수는 함수를 선언할 때 <u>this에 바인딩할 객체가 정적으로 결정</u>된다.** 
  동적으로 결정되는 일반 함수와는 달리 **화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다.** 
  이를 **Lexical this**라 한다. 화살표 함수는 앞서 살펴본 Solution 3의 Syntactic sugar이다.

```js
function Prefixer(prefix) {
  this.prefix = prefix;
}
Prefixer.prototype.prefixArray = function (arr) {
  // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
  return arr.map(x => `${this.prefix}  ${x}`);
};
const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
```



**화살표 함수는 call, applay, bind 메소드를 사용하여 this를 변경할 수 없다.**

```js
window.x = 1;
const normal = function () { return this.x; };
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 }));  // 1
```



# 4. 화살표 함수를 사용해서는 안되는 경우

화살표 함수는 Lexical this를 지원하므로 콜백 함수로 사용하기 편리하다. 하지만 화살표 함수를 사용하는 것이 오히려 혼란을 불러오는 경우도 있으므로 주의하여야 한다.

## 4.1 메소드

```js
// Bad
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`)
};

person.sayHi(); // Hi undefined
```

<u>위 예제의 경우, 메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 상위 컨택스트인 전역 객체 window를 가리킨다. 따라서 화살표 함수로 메소드를 정의하는 것은 바람직하지 않다.</u>

이와 같은 경우는 메소드를 위한 단축 표기법인 [ES6의 축약 메소드 표현](https://poiemaweb.com/es6-enhanced-object-property#3-메소드-축약-표현)을 사용하는 것이 좋다.

```js
// Good
const person = {
  name: 'Lee',
  sayHi() { 	// === sayHi: function() {
    console.log(`Hi ${this.name}`);
  }
};

person.sayHi(); // Hi Lee
```



### 4.1.1추가 확인 

- 화살표 함수가 상위의 scope을 this를 가르키는지 확인 

```js
var person = {
  name: 'Lee',
  sayHi: function(){        
        return () => {
            console.log(this);	//{name: "Lee", sayHi: ƒ} === person 객체
            console.log(`Hi ${this.name}`);
        }
    }
};

person.sayHi()(); // Hi Lee
```



## 4.2 prototype

화살표 함수로 정의된 메소드를 prototype에 할당하는 경우도 동일한 문제가 발생한다. 

 prototype에 메소드를 할당하는 경우, 일반 함수를 할당한다.

```js
// Bad (화살표함수)
const person = {
  name: 'Lee',
};
Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);
person.sayHi(); // Hi undefined


// Good (일반함수)
const person = {
  name: 'Lee',
};
Object.prototype.sayHi = function() {
  console.log(`Hi ${this.name}`);
};
person.sayHi(); // Hi Lee
```



## 4.3 생성자 함수

- <u>화살표 함수는 prototype 프로퍼티를 가지고 있지 않아 생성자 함수로 사용할 수 없다.</u> 
- 생성자 함수는 prototype 프로퍼티를 가지며 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor를 사용한다. 

```javascript
const Foo = () => {};
// 화살표 함수는 prototype 프로퍼티가 없다
console.log(Foo.hasOwnProperty('prototype')); // false
const foo = new Foo(); // TypeError: Foo is not a constructor
```



## 4.4 addEventListener 함수의 콜백 함수

- addEventListener 함수의 콜백 함수를 **화살표 함수로 정의**
  -  <u>내부 this가 상위 컨택스트인 전역 객체 window를 가리킨다.</u>
- addEventListener 함수의 콜백 함수를 **일반 함수로 정의**
  - <u>내부 this는 이벤트 리스너에 바인딩된 요소(currentTarget)를 가리킨다.</u>

```javascript
// Bad
var button = document.getElementById('myButton');
button.addEventListener('click', () => {
    //this는 화살표 함수는 전역객체를 가르키고 있다.
    console.log(this === window); // => true
    this.innerHTML = 'Clicked button';
});


// Good
var button = document.getElementById('myButton');
button.addEventListener('click', function() {
    //this는 id가 myButton인 dom 객체를 가르키고 있다.
    console.log(this === button); // => true
    this.innerHTML = 'Clicked button';
});
```

