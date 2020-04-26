---
title: react-redux
date: 2020-04-26
tags:
  - react
keywords:
  - react-redux
---

이번에는 react-redux 라이브러리를 사용해서 react에서 어떻게 redux로 컴포넌트 관리를 하는지 알아 보겠습니다.  


# Component 구조/용어 
* Provider 컴포넌트에 store 설정
* connect 첫번째, 두번째 인자에 mapStateToProps, mapDispatchToProps function 설정
  - 설정된 두 인자는 connect를 설정한 컴포넌트에 props로 사용된다.
* mapStateToProps
  - 컴포넌트 props로 state를 전달받아 넘기는 기능을 합니다. 
* mapDispatchToProps
  - 컴로넌트 props로 dispatch기능을 넘기는 기능을 합니다.
```
index.js 
: <Provider store={store}></Provider>
  ㄴ App.js
  : <Router>, <Route>
      ㄴHome.js
      : connect(mapStateToProps, mapDispatchToProps)(Home);
        ㄴ ToDo.js
        : connect(null, mapDispatchToProps)(ToDo);
      ㄴDetail.js
      : connect(mapStateToProps)(Detail);
  ```

# Provivder 설정
* Provider(react-redux)에 생성한 "store"를 설정함으로 store가 변경될때 App에서 store를 사용할 수 있다. 
  - Provider 설정 위치: store를 사요알 component에 컴포넌트 형식으로 감싸면 된다. 
  - [Study list]태그를 감싸는 형태로 어떻게 하위 컴포넌트에 store를 사용하는건지 확인해보자!

   ```js
    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./component/App";
    import { Provider } from "react-redux";
    import store from "./store";

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root"),
    );
  ```

# 2. Router에 생성한 컴포넌트 Route에 설정
  * app.js
  ```js
      import React from "react";
      import { HashRouter as Router, Route } from "react-router-dom";
      import Home from "../routes/Home";
      import Detail from "../routes/Detail";

      function App() {
        return (
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/:id" exact component={Detail} />
          </Router>
        );
      }

      export default App;
  ```
  
# 3. connect에 대해서 
  * react-redux 라이브러리 함수 입니다. 
    - import { connect } from "react-redux";
  * 사용 모습을 보면 '커링'기법이 사용됨을 알수 있다. 
    - connect(mapStateToProps, mapDispatchToProps)(Home);
    - 커링 예제 
    ```js
      var curryFuncTest = function (func){
          return function(a){
              return function(b){ // getMaxWith10, getMinWith10 funciton
                  return func(a,b);
              };
          };
      };


      var getMaxWith10 = curryFuncTest(Math.max)(10);
      console.log(getMaxWith10(8));
      console.log(getMaxWith10(25));

      var getMinWith10 = curryFuncTest(Math.min)(10);;
      console.log(getMinWith10(8));
      console.log(getMinWith10(25));
    ```


## 3.1 connect fucntion의 첫번째 arguments
  * 공식문서: https://react-redux.js.org/using-react-redux/connect-mapstate
  * component와 store를 연결해주는 react-redux function
  * 아래와 같이 써주게 되면 Home component에 mapStateToProps 함수에서 반환한 객체를 사용 할 수 있다.
    - connect(mapStateToProps)(Home);
    - store.getState()라고 보면 되겠다.
  
## 3.2 connect function의 두번째 arguments
  * 공식문서: https://react-redux.js.org/using-react-redux/connect-mapdispatch
  * store.dispatch()를 구현하기 위한 것 
  * 아래와 같이 mapDispatchToProps function을 작성해 connect 두번째 파라미터로 넘기면 component에 dispatch를 사용해 store에 있는 action을 사용해서 store state를 변경합니다.
  * mapDispatchToProps에서 반환한 function을 수행하면 dispatch가 수행되어 state가 변경 됩니다.
    - connect(mapStateToProps, mapDispatchToProps)(Home);

  ```js
    import React, { useState } from "react";
    import { connect } from "react-redux";
    import { actionCreators } from "../store";
    import ToDo from "../component/ToDo";

    function Home({ toDos, addToDo, dispatch }) {
      console.log("### Home > component: ", { toDos, addToDo, dispatch });
      const [text, setText] = useState("");

      function onChange(e) {
        setText(e.target.value);
      }

      function onSubmit(e) {
        console.log("### Home > onSubmit: ", text);
        e.preventDefault();
        setText("");

        // #dispatch 하는 방법
        // dispatch(actionCreators.addTodo(text));
        addToDo(text);
      }
      return (
        <>
          <h1>To Do</h1>
          <form onSubmit={onSubmit}>
            <input type="input" value={text} onChange={onChange}></input>
            <button>Add</button>
          </form>
          <ul>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </>
      );
    }

    //connect를 사용해서 Home으로 보내주는 props에 추가 될 수 있도록 허용
    //mapStateToProps return에 보내주는 값은 Home props로 받을 수 있다.
    function mapStateToProps(state, ownProps) {
      console.log("### Home > mapStateToProps: ", { state, ownProps });
      return { toDos: state };
    }

    function mapDispatchToProps(dispatch, ownProps) {
      console.log("### Home > mapDispatchToProps: ", { dispatch, ownProps });
      return {
        dispatch,
        addToDo: (text) => dispatch(actionCreators.addToDo(text)), //disaptch에 action을 넣어준 것이다.
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Home);
  ```
 
## 3.3 connect 정리 ! 
   * component에서 comnnect를 사용해서 store.js에 있는 store에 대해서 dispatch, action Creators를 처리 할 필요가 없다.
   * connect에 두개의 function으로 state와 dispatch 객체들을 컴포넌트 props로 넘겨 사용할 수 있게 됐다.
  
# 4. delete 구현!
  * ToDo component에 del btn이 있다!  
    - 이 버튼에 delete dispatch하는데 필요한 정보 3가지(아래 참고)를 활용해 
    - mapDispatchToProps를 만들어 button click event에서 사용하도록 한다. 
  * dispatch하는데 필요한 정보 3가지
    - store, 
    - actionCreator, 
    - redux dispatch  
    : (connect의 두번째 파라미터 function의 첫번째 파라미터 dispatch === mapDispatchToProps function의 첫번째 파라미터)을 사용해

  ```js
    import React from "react";
    import { connect } from "react-redux";
    import { actionCreators } from "../store";
    import { Link } from "react-router-dom";

    function ToDo({ text, id, onDeleteBtnClick }) {
      console.log("### ToDo > ToDo: ", { text, id, onDeleteBtnClick });
      return (
        <li key={id}>
          <Link to={`/${id}`}>
            {text}
            <button onClick={onDeleteBtnClick}>DEL</button>
          </Link>
        </li>
      );
    }

    function mapDispatchToProps(dispatch, ownProps) {
      console.log("### ToDo > mapDispatchToProps: ", { dispatch, ownProps });
      return {
        onDeleteBtnClick: () =>
          dispatch(actionCreators.deleteToDo(parseInt(ownProps.id))),
      };
    }

    export default connect(null, mapDispatchToProps)(ToDo);
  ```
  
# 5. Detail Page
  * Home에서 todo list를 작성하고 Link를 통해서 Detail로 넘어길 때 
    - Detail component 화면로드 시 mapStateToProps에서 state는 현재 입력한 toDos 배열이다.
    - mapStateToProps 첫, 두번째 파람 정보 
      *  state = store.getState();
      *  ownProps - Link(react-router-dome)의 정보( { history, location, match, staticContext }) 

    ```js
    import React from "react";
    import { connect } from "react-redux";
    // import { useParams } from "react-router-dom";

    function Detail({ toDo }) {
      // const id = useParams();
      // console.log(id);
      console.log("### Detail > component: ", { toDo });
      return (
        <>
          <h1>{toDo?.text}</h1>
          <h5>Created at: {toDo?.id}</h5>
        </>
      );
    }

    function mapStateToProps(state, ownProps) {
      console.log("### Detail > mapStateToProps: ", { state, ownProps });
      const {
        match: {
          params: { id },
        },
      } = ownProps;
      return { toDo: state.find((toDo) => toDo.id === parseInt(id)) };
    }

    export default connect(mapStateToProps)(Detail);
    ```


# react-redux, redux 비교
  * react-redux에서 사용하는 다음 두가지는(mapStateToProps, mapDispatchToProps) vanilla redux에서는 아래와 같은 역할을 합니다.
    - mapStateToProps: store.getState()
    - mapDispatchToProps: store. dispatch()



# 참고 
- nomadCoders
  https://academy.nomadcoders.co/p/build-a-timer-app-with-react-native-and-redux