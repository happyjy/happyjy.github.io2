---
title: callback
date: 2020-02-16
tags:
  - javascript Core
keywords:
  - callback
---



예를 들어 화면 페이지에서 scriptLoad하는 과정이 있는데 페이지에서 load하기 전에 load한 파일에 있는 source를 사용하려면 당연히 사용 할수 없습니다.  
(**스크립트 읽기가 지금 당장 시작되더라도 실행은 함수가 종료되고 난 후에야 실행되므로 스크립트는 ‘비동기적으로’ 실행되었다고 할 수 있습니다.**)

이렇게 비동기 적으로 실행되고 있는 문제를 해결하기위해서 callback기반 비동기 프로그램 방법으로 해결 할 수 있습니다.  
(**무언가를 비동기적으로 처리하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공** -> script load를 보장 하는 loadScript function capter)

하지만 callback기반 비동기 프로그램은 callback hell이라는 단점이 있고 이런 문제를 해결 할 수 있는 방법이 'promise, Async, awiat'fksms 개념이 있습니다. -> callback hell capter



# callback function 
## script load를 보장 할 수 없는 loadScript function
* document객체에 생성한 script객체를 추가해주면 추가한 script 주소를 통해서 원하는 파일을 받을 수 있다.
* `loadScript` 구현
    ```js
    function loadScript(src) {
        // creates a <script> tag and append it to the page
        // this causes the script with given src to start loading and run when complete
        var script = document.createElement('script');
        script.src = src;
        document.head.append(script);
    }
    ```

    ```js
    loadScript('/my/script.js'); // the script has "function newFunction() {…}
    newFunction(); // no such function!
    ````
* sciprt.js에 newFunction() 이 있다고 하자 loadScript를 통해서 받은 script.js파일에 선언한 newFunction()을 호출 하면 호출하지 못 한다.
* 이유는 브라우저가 script.js 파일을 받기 전에 newFunction을 호출 했기 때문이다.
* 그래서 **파일을 받고 function을 호출 시키는 보장해주는 코드를 추가 해야한다.**

## script load를 보장 하는 loadScript function
* 위 load를 보장하지 못하는 코드와 달라진점은 `callback` function 을 parameter로 전달해주고 loadScript는 전달 받은 param을 script onload property에 추가해줬다.
    ```js
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(script);   // 기능 개선한 부분

        document.head.append(script);
    }
    ```

### script laod를 보장하는 예제
* load를 보장하는 기능이 개선 된 `loadScript`
    ```js
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = () => callback(script);       //POINT
        document.head.append(script);
    }

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
        console.log(`Cool, the script ${script.src} is loaded`);
        console.log( _ ); // function declared in the loaded script
    });
    ```
* 결과 
    - loadScript callback function을 확인해보면 콘솔 로그가 두개 있는데. script.src에 추가한 loadScript 첫번째 param loadash cdn 주소를 포함한 문자열과 load한 lodash lib의 _ 객체를 확인 할 수 있다.
    - **callback function은 받고 싶은 파일을 로드한뒤 사용할 수 있는 공간이다.**(loadScript callback callback function으로 넘어 갔기 때문)

* 정리 
    - **이런 방식을 `콜백 기반(callback-based)` 비동기 프로그래밍이라고 합니다. 무언가를 비동기적으로 처리하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야 합니다.**

# callback in callback 
* 위 예제 처럼 callback으로 하나의 파일만 로드할 뿐만 아니라 여러개도 load하고 싶을 것이다. 
* 아래 예제와 같이 구현 할 수 있을 것이다.
    ```js
    loadScript('/my/script.js', function(script) {

        loadScript('/my/script2.js', function(script) {

            loadScript('/my/script3.js', function(script) {
            // ...continue after all scripts are loaded
            });

        })

    });
    ```

# Handling errors 
* error 처리를 할 수 있는 기능이 개선된 `loadScript`
    ```js
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));

        document.head.append(script);
    }
    ```
* 에러 처리 기능이 개선된 laodScript 를 사용하는 방법
    - callback function에 2개의 param을 설정한다.
        - 첫번째 parameter: error 객체
        - 두번째 parameter: loadScript로 받고 싶은 script src string 객체
    ```js
    loadScript('/my/script.js', function(error, script) {
                if (error) {
                    // handle error
                } else {
                    // script loaded successfully
                }
    });
    ```

# callback hell
* callback을 사용해서 비동기 처리가 유용해보인다. 하지만 callback in callback capter에서 확인해볼 떄 callback 안에 callback을 사용함으로 아래 코드와 같이 가독성이 떨어지는 결과를 가지고 옵니다.

* callback hell 예제
    ```js
    loadScript('1.js', function(error, script) {        // 첫번째 callback

        if (error) {
            handleError(error);
        } else {
            // ...
            loadScript('2.js', function(error, script) {    // 두번째 callback
                if (error) {
                    handleError(error);
                } else {
                    // ...
                    loadScript('3.js', function(error, script) {    // 세번째 callback
                        if (error) {
                            handleError(error);
                        } else {
                            // ...continue after all scripts are loaded (*)
                        }
                    });

                }
            })
        }
    });
    ```

* 이를 해결하기 위해서 아래와 같이 **중첩하는 callback function**으로 callback hell을 만들지 않고 function을 top-level로 나눠 조금더 가독성이 쉽게 구현 할 수 있습니다. 
    ```js
    loadScript('1.js', step1);

    function step1(error, script) {
        if (error) {
            handleError(error);
        } else {
            // ...
            loadScript('2.js', step2);
        }
    }

    function step2(error, script) {
        if (error) {
            handleError(error);
        } else {
            // ...
            loadScript('3.js', step3);
        }
    }

    function step3(error, script) {
        if (error) {
            handleError(error);
        } else {
            // ...continue after all scripts are loaded (*)
        }
    };
    ```
* 하지만 step1, 2, 3과 같은 function은 연쇄 작용하는 코드 밖에서 사용할 수 없는 단점이 있습니다. 그래서 이런 점과 callback hell을 피할 수 있는 "promise, Asynch/await" 개념을 정리해보겠습니다.


# 참고 
- javascript.info  
https://javascript.info/callbacks#callback-in-callback