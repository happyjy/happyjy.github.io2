---
title: Review Instagram clone
date: 2020-05-04
author: jyoon
category: ToyProj
tags:
  - review
  - Instagram clone coding
  - React
  - redux
---

# component구조 
* app.js  
: router (Explore, Search, Feed)  
: <u>react-router-dom lib의 'Route, Switch' 사용</u>
  * Explore
  * Search
  * Feed
      * Loading
      * FeedPhoto
          * PhotoActions
          * photoComments
          * TimeStamp
          * CommentBox
          * UserList : likes 누르면 나오는 팝업
              * userDisplay

# redux-react 설정
1. src/index.js
  ``` js
    import { Provider } from 'react-redux';

    <Provider store={store}>
      <App/>
    </Provider>
```

2. src/components/App/index.js
  ```js
    import { connect } from 'react-redux';
    import Container from './container';

    const mapStateToProps = (state, ownProps) => {
      ...
    }

    export default connect(mapStateToProps)(Container);
  ```

3. src/components/presentation.js
  ```js
    <Switch>
      <Route> key="1" exact path="/" component={Feed}/>
    </Switch>
  ```

4. src/components/Feed/index.js
  ```js
    import { connect } from 'react-redux';
    import { actionCreators as photoActions } from 'redux/modules/photos';

    const mapStateToProps = (state, ownProps) => {
      const { photos: { feed } } = state;

      return {
        feed
      }
    }

    const mapDispatchToProps = (dispatch, ownProps) => {
      return {
        getFeed: () => {
          dispatch(photoActions.getFeed())
        }
      }
    }

    connect(mapStateToProps, mapDispatchToProps)(Container);
  ```
  
redux 설정
  1. src/index.js
    - reacct-redux 라이브러리 Provider로 store설정
  2. components/App/index.js
    - container.js > presentation.js 호출로 Feed 컴포넌트 호출
  4. src/components/Feed/index.js
    - Feed > index.js react-redux 설정
    - connect: react-redux의 라이브러리에 의해서 props관련 설정/ 설정을 적용할 컴포넌트 설정
    - mapDispatchToProps: redux에서 설정한 api를 세팅
    - mapStateToProps: mapDispatchToProps에 의해서 변경된 state를 connect에 설정된 컴포넌트에 props로 전달

# retrieve - FeedPhoto 컴포넌트 rendering 과정
* 로그인 후 App/presenter.js > Privateroutes component
  * privateRoutes는 Switch로 첫번째 Route는 Feed component 다. 

* Feed Component file  
  : index.js, container.js, presenter.js에서 작업이 이뤄짐
  ```text
  #1. Feed/container.js 
    > componentDidMount
      > this.props.getFeed 호출

  #2. Feed/index.js 
    > mapDispatchToProps function에 getFeed 호출 

  #3. redux/modules/photos.js 
    > getFeed > dispatch(setFeed(json)) : dispatch reducer 호출 
    > reducer : applySetFeed 호출 
    > applySetFeed(reducer function) : return data는 mapStateToProps function 첫번째 param으로 전달

  #4. Feed/index.js 
    > mapStateToProps의 첫번째 parameter로 mapDispatchToProps의 getFeed return value를 받음
    > mapStateToProps function의 return은 component의 props로 사용
  
  #5. Feed/container.js
    > componentWillReceiveProps property
      : props를 받으면 loading을 false로 설정함으로 Loading component를 제거해준다.
    > render proeprty
      : this.props.feed로 전달받아 Feed compoennt rendering 하는데 사용 
  ```
  
1. componentDidMount function(in container.js)
    * componentDidMount은 component가 Mount되고 lifeCycle에 의해서 호출 됨
    * componentDidMount에서 this.props.getFeed를 호출 
    * props로 getFeed를 사용할 수 있는 이유
      : “react-redux"의 connect 객체로 인해서 가능
  2. mapDispatchToProps(getFeed 수행)(in index.js)  
    * <u>dispatch에 설정되는 values는 photos.js(redux파일)에 "api actions" 이다.</u>
  3. redux(in photos.js) 작업
    * 2번에 의해서 Photos.js에서 getFeed "api actions"호출 
    * <u>getFeed success 후 'applySetFeed' reducer functions를 호츨 해 api에서 return한 value를 세팅</u>
  4. mapStateToProps function(in index.js)
    * index.js > mapStateToProps에서 api에서 return한 value를 첫번째 arguments로 받을 수 있다. 
    * <u>이 과정으로 container에서 this.props</u>로 값을 받을 수 있다.
  5.1 componentWillReceiveProps function (in container.js)
    * 윗 단계에서 return한 value를 props로 받을 수 있다. 
      - index.js에서 'react-redux'를 사용했기에 가능
    * 여기서 component loading state를 설정
      - Feed > presenter.js에서 LoadingFeed component 제어
  5.2 render function(in container.js)
    * this.props에 feed가 property로 있다.
    

# create - 댓글 달기 과정
* enter 이후 동작 trace를 아래 순서로 설명합니다. 

  1. event 호출 
  2. redux 
  3. component 전달과정
    - component 구조를 잘 알고 있어야 파악하기 쉽다.

## event 호출 
  ```text
    #1. CommentBox/presenter.js
      - Textarea에서 enterEvent 감지
    #2. CommentBox/container.js 
      > _handleKeyPress 함수 동작 
        - this.props.submitComment함수에 작성한글(this.state.comment)넘김 
    #3. CommentBox/index.js 
      > mapDispatchToProp gkatn
        - return에 적용한 submitComment 필드에 설정한 dispatch가 수행
  ```
  
## redux 
  ```
    #1. modules/photos.js (redux)
      > commentPhoto 함수 "api actions" 수행
        - dispatch(addComment(photoId, json))에 의해 5번 호출
    #2. modules/photos.js (redux)
      > commentPhoto 함수 "reducer"를 수행 
        - fetch를 통해 서버 통신 이후
        - applyAddComment 호출
    #3. modules/photos.js (redux)
      > applyAddComment 함수 "reducer function"를 수행
        - 새로운 객체를 만들어 반환
          * state를 변경하지 않는다. 
          * 반환된 객체는 해당 redux를 사용하는 store에 변환된 객체를 변경할 component를 찾아 dom을 update한다.
          (현재는 state의 comments가 변경됐음으로 photoComments 컴포넌트가 update된다.)
  ```

## component 전달과정
1. src/components/App
    ```
    1. index.js     : mapStateToProps function
    2. container.js : <App {...props}/>; 
    3. presenter.js : <Route key='1' exact path='/' component={Feed} />
    ```
  
2. src/components/Feed
    ``` 
    1. index.js     : mapStateToProps function
    2. container.js : componentWillReceiveProps function
    3. container.js : render function > Feed compoennt presenter 호출
    4. presenter.js : renderFeed function > FeedPhoto component index 호출
    ```

3. src/components/FeedPhoto
    ```
    1. index.js     : mapDispatchToProps
    2. container.js : render function > FeedPhoto component presenter 호출
    3. presenter.js : FeedPhoto function
        * Feed 화면에서 rendering 하는 component로 'PhotoComments component'를 re rendering 한다.
    ```
  
4. src/components/PhotoComments
    ```
    1. index.js   : Photo Component > Comment function
        * 이 Component는 보여주는 역할 밖에 없음으로 index.js에 rendering하는 부분만 있다.
    ```


# create, delete - like, unlike
> heart 클릭으로 빨간 heart 제거 동작 trace
> like하는 과정은 unlike하는 과정과 같기때문에 제거하는 것으로 설명

* enter 이후 동작 trace를 아래 순서로 설명합니다. 

1. event 호출 
2. redux 
3. component 전달과정
  - component 구조를 잘 알고 있어야 파악하기 쉽다.
 
## event 호출 
```
* src/components/PhotoActions
1. presenter.js > onClick
    * container에서 전달된 props에 handleHearClick 호출
2. container.js > presenter 
    * presneter에서 생성한 component에 props 전달(index.js에서 onClick 동작하는 function을 props에 세팅)
3. index.js > mapDispatchToprops
    * handleHeartClick 호출
      - dispatch(photoActions.xxx)에 호출
```

## redux
```
* src/redux/modules/photos.js
1. redux > photos.js > unlikePhoto (api function)
    * dispatch(doUnlikePhoto(photoId))호출 
      - reducer, reducer functions에 의해 state 번환으로 front에서 이미지를 제거 
    * fetch를 통해서 server 작업 
      - then에서 작업이 정상 적으로 처리가 되지 않았다면 다시 doLikePhoto를 해준다. 
```

## component 호출 과정
1. src/components/App
    ```
    1. index.js     : mapStateToProps function
    2. container.js : <App {...props}/>; 
    3. presenter.js : <Route key='1' exact path='/' component={Feed} />
    ```
  
2. src/components/Feed
    ``` 
    1. index.js     : mapStateToProps function
    2. container.js : componentWillReceiveProps function
    3. container.js : render function > Feed compoennt presenter 호출
    4. presenter.js : renderFeed function > FeedPhoto component index 호출
    ```

3. src/components/PhotoActions
    ``` text
    1. index.js    : mapDispatchToProps
    2. container.js: render function > PhotoActions component(in presentation)
    3. presenter.js: PhotoActions function
        * Feed 화면에서 rendering 하는 component로  
          하트 부분을 업데이트 해야 함으로 'PhotoActions component'를 rerendering 한다.
    ```


## index.js에서 mapDispatchToProps 두번째 param(ownProps)에 대해서 
  - 좋아요 세팅, 해제 할때 PhotoActions > index.js에서 ownProps에 props가 다 담겨져 있다. 
  - 이때 'ownProps'의 값은 PhotoActions component에 property로 값을 세팅한 값이다. 
  - 위 PhotoActions component에 property값을 세팅한 곳은 FeedPhoto > presenter.js 이다.


# delete - 댓글 삭제하기
* 서버에서 삭제하는 작업은 쉽게 마쳤으나 state관리로 화면을 rerendering하게하는 작업중 한 부분에서 걸려 생각보다 쉽지 않았다. 
* 먼저 Phtocomments이 컴포넌트는 기능이 없어 index.js에 화면 rendering하는 소스만 있던 것을  
index.js, container.js, presenter.js으로 나눴다. 
* presneter.js에 x 버튼을 달고  
reducer에서 삭제api를 작성한것을 index.js에서 props로 세팅 후 x버튼 클릭식 이벤트로 등록한다.
* 그리고 <u>**여기서 문제**</u>가 생겼다.   
  api로 component에서 원하는 값(phtoCommentId)을 전달하는 방법을 실습하는 동안에 없어 방법을 고민하다 검색으로 해결 할 수 있었다.   
  ``` js
  render: function () {
    var children = this.state.childrenData.map(function(childData,childIndex) {
        return <Child onClick={this.handleChildClick.bind(null,childData)} text={childData.childText}/>;
    }.bind(this));
    return <div>{children}</div>;
  },
  ```
  - [참고주소](https://stackoverflow.com/questions/22639534/pass-props-to-parent-component-in-react-js)
  * 아래와 같이 컴포넌트 관계가 있다.  
    * Explore > Feed > FeedPhoto > photoComments
    여기서 photoComments에서 삭제하는 photoId, photoCommentId를 전달해야만 했다.  
    * 그래서 photoComments에 photoId를 갖기 위해서 FeedPhotod component에 photoComments컴포넌트에 photoId를 세팅해준다. 
    * photoCommentId는 이미 PhotoComment component에서 세팅해줬다.  
    해줘야 할 것은 api로 전달해야 하는 값을 presneter.js에서 index.js에 reducer api로 전달할 수 있도록 index.js에 전달해줘야 했다. 