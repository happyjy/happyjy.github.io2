---
title: redux 구현해보기
date: 2020-04-26
tags:
  - react
keywords:
  - redux
---

redux 스터디 후 정리하다 보니 구현 해볼 수 있을 것 같아 구현해봤다.

# 구현 코드

```js
// subscribe에서 사용 할 Observer pattenr
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  unsubscribeAll() {
    this.observers = [];
  }

  notify(data) {
    this.observers.forEach(function(observer) {
      observer(data);
    });
    this.observers.forEach(function(val, idx) {});
  }
}

function createStore(reducerFunction) {
  const reducer = reducerFunction;
  const headingsObserver = new Observable();

  // state 초기화
  let stateObj = {
    stateValue: '',
    get state() {
      return this.stateValue;
    },
    set state(value) {
      this.stateValue = value;
      headingsObserver.notify();
    },
  };

  // #주석1
  //reducerFunction default 단계 return 반환
  stateObj.state = reducerFunction(undefined, {
    type: '',
  });

  // #주석2
  // dispatch는 본인이 받은 type필드가 필수로 포함한 있는 객체를
  // reucerFunction을 callback function으로 호출해주겠지!
  const dispatch = actionObj => {
    stateObj.state = reducer(getState(), actionObj);
  };

  // #주석3
  //setter에 의해서 reducer가 변경될때 subscribe을 호출하도록 구현 되어 있겠지?
  const subscribe = handleFunction => {
    headingsObserver.subscribe(handleFunction);
    return headingsObserver.unsubscribeAll;
  };

  // #주석4
  // stateObj.state 호출
  const getState = () => {
    return stateObj.state;
  };

  // #주석5
  // stateObj.state에 세팅할때 subscribe으로 설정한것 notify 구현
  const setState = state => {
    stateObj.state = state;
    return stateObj.state;
  };

  // Object.defineProperties 을 한번 사용해보고 싶어서
  // Object.defineProperties(stateObj, {
  //   S: {
  //     enumerable: true,
  //     SV: '',
  //     get: state => this.SV,
  //     set: value => {
  //       console.log("# defineProperties: ", this, subscribe);
  //     }
  //   }
  // });

  //const reducer = reducerFunction;
  return {
    dispatch,
    subscribe,
    getState,
    setState,
  };
}

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return count + 1;
      break;
    case 'MINUS':
      return count - 1;
      break;
    default:
      return count;
      break;
  }
};

const store = createStore(countModifier);

store.subscribe(function() {
  console.log('this is subscribe function');
});

console.log('### store.setState(10)');
store.setState(10);
console.log('### getStore: ', store.getState());

console.log("### store.dispatch({type: 'ADD'})");
store.dispatch({
  type: 'ADD',
});
console.log('### getStore: ', store.getState());
```

# 설명

1. createStore에 reducer를 넣어준다.

- createStore에 넣어줄때 reducer의 기본값을 return받아 state에 세팅한다.

2. disaptch

- disaptch할경우 state update되어야 한다.

3. subscribe

- observer pattern 사용
  - subscribe 설정할때 observer pattern으로 생성한 객체에 subsribe함으로 setter에서 notify할수 있다.
- setter 사용
  - setState가 될때 설정한 subscribe가 excute되어야 한다.
  - observer pattern에 설정한것을 notify

4. getState

- stateObj.state 호출

5. setState

- stateObj.state에 세팅할때 subscribe으로 설정한것 notify 구현
