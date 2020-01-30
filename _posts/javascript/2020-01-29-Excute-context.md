---
title: 실행 컨텍스트
date: 2020-01-24
tags:
  - javascript  
keywords:
  - excute-context
---

개발을 하다보면 this의 범위가 함수, function, bind, call, apply별로 달라지는 걸볼 수 있는데 왜 이런지에 대해서 다뤄보려고 한다.




---
```
02 실행 컨텍스트 
	2-1 실행 컨텍스트란? 
	2-2 VariableEnvironment
	2-3 LexicalEnvironment
		2-3-1 environmentRecord와 hoisting
			함수 선언문과 함수 표현식
		2-3-2 scope, scope chain, outerEnvironmentReference
			전역변수와 지역변수
	2-4 this
```


---


# 02 실행 컨텍스트 
> * 실행컨텍스트(execution context)는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체  
> * 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는 개념  
> * 어떤 실행 컨텍스트가 활성화되는 시점에 선언된 변수를 위로 끌어 올리고(=호이스팅), 외부환경정보를 구성, this값을 설정  하는 동작 수행  -> 이로인해  다른언어에서는 발견할 수 없는 특이한 현상들이 발생

## 2-1 실행 컨텍스트란? 
* 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
* 동일한 환경에 있느 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성하고 
  - 이를 콜 스택에 쌓아올렸다가, 가장 위에 쌓여있는 컨텍스트와 관련 잇는 코드들을 실행하는 식으로 전체 코드의 환경과 순서를 보장
* 여기서 '동일한 환경'(하나의 실행 컨텍스트)을 구성할 수 있는 방법: 전역공간, evan()함수, 함수 등이 있습니다.
  - eval을 제외하면 우리가 흔히 실행 컨텍스트를 구성하는 방법은 함수를 실행하는 것

* js 엔진
  - 어떤 실행 컨텍스트가 활성화될 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는 데 필요한 환경정보들을 수집해서 실행 컨텍스트 객체에 저장
  - 이 객체는 js엔진이 활용할 목적으로 생성(개발자가 코드를 통해 확인할 수 x)  
  - 담기는 정보 세가지  
    : 목차 2-2, 2-3, 2-4에서 각각 더 자세하게 설명하도록 한다. 
  ```
    * VariableEnvironment : 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 
                        : 선언 시점의 LexicalEnvironment의 스냅샷 
                        : 변경 사항은 반영되지 않음
    * LexicalEnvironment  : 처음에는 VariableEnvironment와 같지만 변경사항이 실시간으로 반영
    * ThisBinding         : this 식별자가 바라봐야 할 객체
  ```
  
## 2-2 VariableEnvironment
* LexicalEnvironment와 같지만 최초 실행 시의 스탭 샷을 유지한다는점이 다름
* 실행 컨텍스트를 생성할 때 VariableEnvironment에 정보를 먼저 담은 다음,  
  이를 그대로 복사해서 Lexical environment를 만들어  LexicalEnvironment를 주로 활용하게 된다.
* Variableenvironment, LexicalEnvironment의 내부는 **environmentRecord와 outerEnvironmentReference**로 구성
  - 초기화 과정 중에는 사실상 완전히 동일, 이후 코드 진행에 따라 서로 달라짐
  - 자세한 내용은 LexicalEnvironment를 통해 설명

## 2-3 LexicalEnvironment
* 컨텍스트를 구성하는 환경 정보들을 사전에서 접하는 느낌으로 모아 놓은 것 

### 2-3-1 environmentRecord와 hoisting
* js engine은 컨텍스트 내부 전체를 처음부터 쭉 훑어나가며 순서대로 수집 = "호이스팅 개념"  
(= 식별자들을 최상단으로 끌어올려놓은 다음 실제코드를 실행-실제로 끌어 올리는 것이 아님, 편의상 끌어올린것으로 간주-)
  - 실행 컨텍스트가 관여할 코드들은 실행되기 전의 상태
  - 코드가 실행되기 전임에도 불구하고 js engine은 이미 해당 환경에 속한 코드의 변수명들으 모두 알고 있게 된다.
  
                                                                
#### 호이스팅 규칙
* environmentRecord에는 매개변수의 이름, 함수선언, 변수명 등이 담긴다
* 예시
```
* 아래 제로코 코드를 살펴보자 
https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0
```

#### 함수 선언문과 함수 표현식
* 함수 선언문: 반드시 함수명이 정의 돼 있어야 함/ hoisiting이 됨
* 함수 표현식: 함수명이 없어도 됨           / hoisiting이 안 됨
* 기명 함수 표현식: 함수명을 정의한 함수 표현식

* 상대적으로 긴 코드 속에서 함수 표현식이 안전한다. 

#### 2-3-2 scope, scope chain, outerEnvironmentReference

* scope: 식별자에 대한 유표범위
* ES5까지의 자바스크립트는 특이하게도 전역 공간을 제외하면 오직 함수에 의해서만 스코프가 생성
```
ES6에서는 어떤지 작성하기 
```
* 스코프체인: 이런 '식별자의 유효범위'를 안에서부터 바깥으로 차례로 검색해나가는 것
* outerEnvironmentReference: 스코프체인을 가능하게 하는 것이 바로 Lexicalenvironment의 두번째 수집자료인 outerEnvironmentReferenece

#### 스코프 체인 
* outerEnvironmentReferenece는 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조  
* 과거 시점인 '선언될 당시'는 행위가 실제로 일어 날 수 있는 시점이란 콜 스택 상에서 어떤 실행 컨텍스트가 활성화된 상태일 때뿐  
* 모든 코드는 실행 컨텍스트가 활성화 상태일 때 실행(어떤 함수를 선언(정의)하는 행위 자체도 하나의 코드에 지나지 않음)


* 예
  - A함수 내부에 B함수 선언, B함수 내에 C함수 선언
  - 함수 C의 outerEnvironmentReferenece는 함수 B의 LexicalEnvironment를 참조 
  - 함수 B의 LexicalEnvironment에 있는 outerEnvironmentReferenece는 다시 함수 B가 선언되던 때 A함수의 LexicalEnvironment를 참조 
  - 이처럼 outerEnvironmentReferenece는 연결리스트 형태를 띤다.  
  - '선언 시점의 LexicalEnvironment'를 계속 찾아 올라가면 마지막엔 전역 컨텍스트의 LexicalEnvironment가 있을 것'  
  - 도한 각 outerEnvironmentReferenece는 오직 자신이 선언된 시점의 LexicalEnvironment만 침조하고 있으므로 가장 가까운 요소부터 차례대로만 접근할 수 있고 다른 순서로 접근하는 것은 불가능  
  - 이런 구조적 특성 덕분에 여러 스코프에서 동일한 식별자를 선언한 경우에는 **무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능** 
#### 전역변수와 지역변수
### 2-4 this


