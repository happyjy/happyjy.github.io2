---
title:  Promise chaning
date: 2020-02-16
tags:
  - javascript Core
keywords:
  - Promise chaning
---


promise객체에 then을 연속적으로 사용할 수 있는 promise chaining에 대해서 설명하겠습니다.

# promise chaing 방법 두가지 
## promise chaining 첫번째 방법(1/2)

* promise객체의 하나에 then을 여러개 연속으로 연결해서 사용하는 방법으로 사슬고리처럼 연결되어 있어 다음 then에 value를 넘겨 줄 수 있습니다.
    ```js
        new Promise(function(resolve, reject) {
            setTimeout(() => resolve(1), 1000); // (*)
        }).then(function(result) { // (**)
            alert(result); // 1
            return result * 2;
        }).then(function(result) { // (***)
            alert(result); // 2
            return result * 2;
        }).then(function(result) {
            alert(result); // 4
            return result * 2;
        });
    ```


## promise chaining 두번째 방법(1/2)
* then을 선언할때마다 promise를 사용해서 선언하게 되면 모든 선언한 then에 pomise의 결과가 전달이 됩니다.
    ```js
        var promise = new Promise(function(resolve, reject) {
            setTimeout(() => resolve(1), 1000);
        });

        promise.then(function(result) {
            alert(result); // 1
            return result * 2;
        });

        promise.then(function(result) {
            alert(result); // 1
            return result * 2;
        });

        promise.then(function(result) {
            alert(result); // 1
            return result * 2;
        });
    ```

# 프로미스 반환하기 
* 아래 예제 설명 
    - 예시에서 첫 번째 .then은 1을 출력하고 new Promise(…)를 반환((*))합니다.  
    - 1초 후 이 프라미스가 이행되고 그 결과(resolve의 인수인 result * 2)는 두 번째 .then으로 전달됩니다. 
    - 두 번째 핸들러((**))는 2를 출력하고 동일한 과정을 반복합니다.
* **프라미스를 반환하는 것도 비동기 작업 체인을 만들 수 있다.**

    ```js
    new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 1000);
    }).then(function(result) {
        alert(result); // 1
        return new Promise((resolve, reject) => { // (*)
            setTimeout(() => resolve(result * 2), 1000);
        });
    }).then(function(result) { // (**)
        alert(result); // 2
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        });
    }).then(function(result) {
        alert(result); // 4
    });
    ```

# 예제: loadScript callback function 해결하기 

    ```js
    loadScript("/article/promise-chaining/one.js")
        .then(script => loadScript("/article/promise-chaining/two.js"))
        .then(script => loadScript("/article/promise-chaining/three.js"))
        .then(script => {
            // 스크립트를 정상적으로 불러왔기 때문에, 스크립트 내의 함수를 호출할 수 있습니다.
            one();      //...one.js에 있는 function 
            two();      //...two.js에 있는 function 
            three();    //...three.js에 있는 function
        });
    ```

# fetch와 함께 체이닝 함께 응용하기 

* 프론트 단에선, 네트워크 요청 시 프라미스를 자주 사용합니다. 
* 예시에선 메서드 fetch를 사용해 원격 서버에서 사용자 정보를 가져오겠습니다. 
* fetch는 promise객체를 반환 하기 때문에 fetch로 원하는 정보를 가지고 오고 promise에서 설명한 것 처럼 then을 통해서 후처리를 할 수 있습니다.

    ```js
    fetch('/article/promise-chaining/user.json')
        // 원격 서버가 응답하면 .then 아래 코드가 실행됩니다.
        .then(function(response) {
            // response.text()는 응답 텍스트 전체가 다운로드되면
            // 응답 텍스트를 새로운 이행 프라미스를 만들고, 이를 반환합니다.
            return response.text();
        })
        .then(function(text) {
            // 원격에서 받아온 파일의 내용
            alert(text); // {"name": "iliakan", isAdmin: true}
        });
    ````

# 참고 
- javascript.info  
https://javascript.info/promise-chaining