---
title: 객체지향 자바스크립트 4회차(MVVM pattern 개선2)
date: 2020-03-15
tags:
  - 코드스피츠
  - 객제지향 자바스크립트
keywords:
  - 객체지향
  - MVVM
---

# TODO
[ ] class diagram 그리기




객체지향 프로그램이란 처음에 이루고자하는 목표에서부터 덩어리진 것을 차근차근 분리하고 깍아내는 과정 
어떻게 깍을지 기준정하는 방법은? "역할"
덩어리진 코드를 클래스로 나누려고 할때 "역할, 기준"이 필요하다. 객체지향에서 "역할, 기준"은 역할, 책임 모델이라고 하는 것입니다.

"역할, 책임"은 비슷해보이지만 동전의 양면을 가지고 있다. 
책임을 가지고 있다는건? 그 책임에 대한 권한도 가지고 있다.
권한이 있다는건? 권한에 대한 책임이 있다.
그래서 역할을 정의하려면 어떤 권한을 주입 받고, 그 권한으로 부터 무슨 일을 수행하는 권한을 양도 받기위해서는 어떤 책임까지 가져야 하는지 한번에 정의해야 한다. 

# 1. ISP
> SOLID 원칙 중 하나 
> Interface Segregation
> 인터페이스 분리하는 원칙(이 원칙으로 덩어리진 코드들을 나눌 수 있다.)

* 한코드에 여러개가 들어가 있으면 이것들을 인터페이스별로 잘라서 분리 할 수 있다. 
    - 역기서 인터페이스는 역할을 얘기합니다.(실제 물리적인 인터페이스를 말하는 것이 아님)
* 객체지향에서 코드 분리할때 가장 기본적인 방법이다. 

* ViewModel을 이 법칙을 적용해보려고 한다. 
 

## 1.1 옵저버 서브젝트 파일 리팩토링 하기
* pdf4, 5, 6
    - 뷰모델에는 어울리지 않다고 보인다 
    - 옵저버패턴에 서브젝트 역할 -> 분리하자!
        * 메소드 코드를 분리할때 변수도 같이 이동해야한다.
        * 메소드 설계시 의존하고 있는 필드를 역할별로 필드를 같이 쓰지 않게 잘 설계해야 한다.  

* pdf7
    - SOLID원칙 보고 어떻게 뷰모델에서 옵저버 서브젝트 파일을 빼낼까 고민 중...
    - 상속모델을 사용할 것이다 우측 하단과 비슷한 모델을 사용
    - 서브젝트모델 === 인터페이스A/   
    뷰모델 === 객체 === 서브젝트모델을 상속받은 모델

```js
    //설명1
    const ViewModelSubject = class extends ViewModelListener{ 
        #info = new Set; #listeners = new Set;
        //설명2 add, clear
        add(v, _=type(v, ViewModelValue)){this.#info.add(v);} 
        clear(){this.#info.clear();}
        addListener(v, _=type(v, ViewModelListener)){ 
            this.#listeners.add(v); 
            //설명3
            ViewModelSubject.watch(this);
        }
        removeListener(v, _=type(v, ViewModelListener)){
            this.#listeners.delete(v);
            //설명4
            if(!this.#listeners.size) ViewModelSubject.unwatch(this); 
        }
        notify(){
            this.#listeners.forEach(v=>v.viewmodelUpdated(this.#info));
        }
    };
```
* pdf8, 9
    - 설명1 상속
        - 3강에서 ViewModel은 ViewModelListener을 상속는데 여기서 ViewModelSubject에 ViewModelListener을 상속 받는 이유는 뭘까? 
            - Javascript는 다중 상속이 안돼서 어쩔 수 없이 ViewModelSubject가 ViewModelListener을 상속받고 ViewModel이 ViewModelSubject를 상속받는다 
        ```
        3장 ViewModel ->                     ViewModelListener
        4장 ViewModel -> ViewModelSubject -> ViewModelListener
        ```
    - 설명2 add, clear추가 
        - `#isUpdated -> #info
        - `#info는 부모에 있는 private 속성이다. 자식이 못건드리기 때문에 부모에 속성 #info private 속성을 제거, 추가할때는 부모쪽에서 서비스를 내려줘야한다. 그래서 내가 ViewModel #info를 변경하고 싶을때는 부모쪽 메소드에서 ViewModel Value를 직접 넘겨 ViewModel를 직접 넘겨서 ViewModel Value를 부모인 서브젝트가 직접 추가하도록 위임해서 동작하게 해야한다. clear도 부모에게 직접 요청해서 추가해야 한다.
    - 설명3 watch
        - 이전에는 addListener를 하고 ViewModel이 생성되는 시점에 바로 전체 서브젝트 리스트에 등록했다. 
        - 지금은 Listener가 들어온순간 서브젝트를 watch로 보낼 것이다.
        뷰모델 생성했다고 바로 requestAnimationFrame 넣어서 감시할 필요가 없다. 
        Listener가 하나라도 생겼을때 감시하면 된다!(뷰모델을 감사하는 사람이 없어 변화를 추적할 필요가 없다.)
    - 설명4 unwatch
        - 뮤보델은 구독하는 listener가 없을때 unwatch를 하자!


## 1.2 notify 리팩토링
* pdf10
requestAnimationFrame에 의해서 subject돌면서 뷰모델에 notify해준다. 

```js

const ViewModelSubject = class extends ViewModelListener{ 

    //... 위 코드 참고

    static #subjects = new Set; static #inited = false; 
    static notify(){
        const f =_=>{ 
            this.#subjects.forEach(v=>{
                if(v.#info.size){ 
                    v.notify();
                    v.clear(); 
                }
            });
            //설명1
            if(this.#inited) requestAnimationFrame(f); 
        };
        requestAnimationFrame(f); 
    }

    //설명2
    static watch(vm, _=type(vm, ViewModelListener)){
        this.#subjects.add(vm); //set에 add해도 변화 x
        if(!this.#inited){
            this.#inited = true;
            this.notify(); 
        }
    }

    //설명3
    static unwatch(vm, _=type(vm, ViewModelListener)){
        this.#subjects.delete(vm);
        if(!this.#subjects.size) this.#inited = false; 
    }
}    
```

* pdf11
    - notify가 무조건 돈다. 
    - 설명1 flag를 통한 Animation 제어
        - requsetAnimationFrame를 동작 여부를 결정하는 flag "#inited"를 사용하고 있다. 
    - 설명2, 설명3 flag를 통한 Animation 제어
        - 리스너가 없는 뷰모델을 여러개 만들어도 requestAnimationFrame은 돌지 않는다. 뷰모델에 리스너를 등록해야지 그 뷰모델을 감시하기 시작하고 리스너를 다 빼서 하나도 없다면 requestAnimation도 멈추게 된다. 
        - 기존 notify함수에 this.#subjects.add(vm); 코드로 subject를 관리했는데 이렇게 하면 외부에서는 notify에 #subject에 add한다는 사실을 모른다. 그래서 외부에서 알 수 있도록 watch, unwatch함수 #subject.add, #subject.delete를 통해서 관리해주고 있다. 

    - 추가 정보: 플래그변수, 싱글스레드, 멀티스레드 
        - Javascript는 싱글스레드이기 때문에 플래그 변수로 제어하기 쉽다. 다른 언어는 멀시스레드이기 때문에 플래그 제어가 안된다. 
        - 플래그 기만에 효율적인 알고리즘짜는것을 계속해서 연습해야 한다. 
        - 멀티 스레드에서 작업할때는 플래그 기만이 아니라 멀티스레드에서 안정성을 확보하고 효율성을 확보하는 패턴을 배워야한다.

    - 추가 정보: static method
        - notify static private method로 설정해야하는데 Javascript에는 static method를 지원하지 않아서 공개적으로 되어 있다. 
        - watch, unwatch도 외부에 공개 되어야 하지만 public은 아니다. 내부 Framework안에서 돌기 때문에 


# 2. 섬세한 권한 조정
> 위 ISP방법을 통해서 ViewModel이 가벼워 졌는데 이제는 섬세한 권한 조정을 하려고 한다. 

* 권한 조정이 필요한 이유 
    * 권한제어자가 기본적으로 제공되는 언어 java, 코틀린 private, internal, public 
    * Java의 기본 권한 private, Javascript 기본권한 public
    * 그래서 생기는 문제는 getter, setter외부에 노출이 되면 코드 조작이 가능해서 문제가 생긴다. 

* 아래 코드에 설명할 부분을 주석으로 6가지를 표시 했으며 아래 설명이 있습니다.
```js
const ViewModel = class extends ViewModelSubject{
    static get(data){return new ViewModel(data);}
    styles = {}; attributes = {}; properties = {}; events = {}; 
    
    //설명1 readonly
    #subKey = "";
    get subKey(){return this.#subKey;}
    #parent = null;
    get parent(){return this.#parent;}
    
    //설명2 [설명6과 관련]Transaction 연산
    setParent(parent, subKey){
        this.#parent = type(parent, ViewModel);
        this.#subKey = subKey;
        this.addListener(parent);
    }
    
    constructor(data, _=type(data, "object")){ 
        super();
        Object.entries(data).forEach(([cat, obj])=>{ 
            if("styles,attributes,properties".includes(cat)) {
                if (!obj || typeof obj != "object") throw `invalid object cat:${cat}, obj:${obj}`; 
                this[cat] = Object.defineProperties({}, Object.entries(obj).reduce((r, [k, v])=>{
                    r[k] = { 
                        enumerable:true, get:_=>v, set:newV=>{
                        v = newV;
                        //설명3 update할 객체 세팅 방법 변경
                        this.add(new ViewModelValue(this.#subKey, cat, k, v)); }
                    };
                    return r; 
                }, {}));
            }else{
                Object.defineProperties(this, { 
                    [cat]: {
                        enumerable: true,
                        get: _ => obj,
                        set: newV => {
                            obj = newV;
                            //설명3 update할 객체 세팅 방법 변경
                            this.add(new ViewModelValue(this.#subKey, "root", cat, obj)); 
                        }
                    } 
                });
                //설명6 [설명2와 관련]트렌젝션으로 setParent로 한번에 처리
                if(obj instanceof ViewModel) obj.setParent(this, cat); 
            }
        });
        //설명4 ViewModel.notify(this); 제거
        //ViewModel.notify(this);
        Object.seal(this); 
    }
    //설명5 viewModel
    viewmodelUpdated(updated){updated.forEach(v=>this.add(v));}
}
```

* 설명1 readonly
    - 외부 공개, 쓰기는 private(public getter, private setter pattern)

* 설명2 Transaction 연산
    - 자바스크립트는 트렌젝션을 따로 지원하지 않기 때문에 함수를 통해서 트렌젝션 연산이라는 것을 알려줘야 한다. 
        - Transaction이란? 코드가 한번에 일어나야 하는 구간이다.   
        그런데 그 구간에서 하나하나 일어나야 하는건지 덩어리로 한번에 일어나는지 아닌지 구별하는 방법이 없다. 그런데 자바스크립트에서는 덩어리로 한번에 일어나게 하는 방법은 "함수"를 통해서 한번에 일어나야 할 코드들을 표시할 수 있다. 
    - 이렇게 setParent 함수로 만든 다른이유는? 
        - 코드로 가져 올때 코드가 아닌 함수로 가지고 오기때문에 '전달인자'를 넘겨줘서 문제 없이 세팅할수 있다. 
        - 함수가 아닌 코드로 클래스에서 있을경우 함수에서 인자로 넘겨주는 변수들이 '지역변수, 클로저'에 설정되어 있기 때문에 문제가 될수있기 때문에   
    - 내부 함수는 "_"를 붙이자.    
    - 이 코드는 parent를 세팅할때 있어야 하는 코드(기존에는 constructor안 dfineProperty하는 로직에 있었던 코드다.)
    - 코드에서 꼭 표현해야 할 것! -> "Transaction"이다    
* 설명3 update할 객체 세팅 방법 변경 
    - 기존에는 뷰모델 #isUpdated에 직접 Set객체에 add통해 설정했지만 현재는 ViewModelSubject 클래스로 이동해 상속받았기 때문에 부모에게 호출하고 있다.(this.add(...))
    ```js
    //기존
        vm.#isUpdated.add(new ViewModelValue(vm.subKey, category, k, v));
    ```
* 설명4 ViewModel.notify(this); 제거
    - 기존에는 뷰모델이 직접 자신에게 notify를 등록했는데 지금은 하지 않는다. 왜? 
        - 생성시점에 등록 안할거고 addListener할때 lazy하게 등록할 것이기 때문!
        - addListener에 lazy하는것도 뷰모델 서브젝트가 알아서 할 것이다. 

* 설명5 ViewModelListener Class viewmodelUpdated 함수 오버라이딩
    - ViewModelListener Class viewmodelUpdated 함수를 ViewModelSubject에서 오버라이딩 하지 않았다.
    그래서 ViewModel에서 오버라이딩 하지 않으면 throw된다.
    - 이번 강의 ViewModel 상속 관계도  
    : ViewModel -> ViewModelSubject -> ViewModelListener
    - 추가적으로 설명3과 같이 this.#isUpdated.add(v) -> this.add(v)로 코드가 변경됐다.

* 설명6 트렌젝션으로 setParent로 한번에 처리
    - 기존에는 아래와 같은 코드를 setPraent 함수로 한번에 처리 했습니다.
    v.parent = this; v.subKey = k;, v.addListener(this); 

* 추가 설명
    - 그래서 부모 자식간, 필드 접근 권한, 트렌젝션에 의해 계층 권한이 생기는 경우 직접 변수에 접근한는 이유는 다양하다. 
    - 권한관계라는건 발생하는건 여러가지 인데 물론 직짜 권한때문에 일어나느 경우가 많지만 트렌젝션때문에 일어나는 경우도 비일비재 하다.
    - 코드를 함수로 빼기위해서 코드를 한번 더 정리하기 때문에 코드 부분이 깔금하게 될 수 있다. 
    - 코드가 길다 싶으면 외부함수, 스태틱함수로 변경하는건 좋은 연습니다.  



# 3. Visitor Pattern

* Scanner? 
    - 특정 el 하위를 검색해서 viewmodel대상인 여부를 확인해서 BinderItem을 만들어서 binder에게 넘겨준다. 

## 리팩토링 전 Scanner 소스 설명

```js
const Scanner = class{
    scan(el, _ = type(el, HTMLElement)){
        const binder = new Binder;
        this.checkItem(binder, el);
        
        //설명2 Visitor 패턴 적용 대상
        const stack = [el.firstElementChild]; 
        let target;
        while(target = stack.pop()){
            this.checkItem(binder, target);
            if(target.firstElementChild) stack.push(target.firstElementChild); 
            if(target.nextElementSibling) stack.push(target.nextElementSibling);
        }
        //설명2-end

        return binder;
    }
    checkItem(binder, el){
        //설명1 스캐너 역할
        const vm = el.getAttribute("data-viewmodel"); 
        if(vm) binder.add(new BinderItem(el, vm));
    } 
};

```

* 설명1 스캐너의 역할
    - Binder의 Scanner가 아니라 Scanner Class로 빠진이유. (스캐너를 빼낸 이유) 
    - vuejs el속성들을 쓰고 싶다면 이곳에서 조작 후 아이템에 꽂아 주면 된다. 

* 설명2 Visitor 패턴 
    - dom을 파싱 하는 부분은 Scanner, Binder class역할이라고 보기에 어렵다. 그래서 Visitor 패턴을 사용한다. 
    - Visitor 패턴 등장 인물2개/ care taker(원본데이터, 보살핌을 받는애) - Visitor 패턴 
    - Visitor에게 caretaker를 주면 Visitor가 돌아준다? 

* binder? 
    - 그림을 그릴 대상을 binderItem으로 가지고 있다가 viewmodel에 꽂아 주면 viewmodel에 맞게 그림을 그려주는 역할을 하고 있다. 




## 리팩토링 후 Scanner 소스 설명
```js
const Visitor = class {
    //설명1
    visit(action, target, _0=type(action, "function")) {
        throw "override" 
    }
};

const DomVisitor = class extends Visitor{
    //설명2 Generic
    visit(action, target, _0=type(action, "function"), _1=type(target, HTMLElement)) {
        const stack = [];
        let curr = target.firstElementChild; 
        do {
            action(curr);
            if (curr.firstElementChild) stack.push(curr.firstElementChild); 
            if (curr.nextElementSibling) stack.push(curr.nextElementSibling);
        } while (curr = stack.pop()); 
    }
};

const Scanner = class {
    #visitor
    constructor (visitor, _ = type(visitor, DomVisitor)) {
        this.#visitor = visitor;
    }
    scan (target, _ = type9target, HTMLElement) {
        const binder = new Binder
        const f = el => {
            const vm = el.getAttribute('data-viewmodel')
            if (vm) binder.add(new BinderItem(el, vm))
        }
        f(target)
        this.#visitor.visit(f, target)
        return binder;
    }
}

```

* 설명1 추상인터페이스
    - 추상인터페이스에서 target이 어떤 타입(HTMLElement, JSON 등등)인지 알 필요가 없습니다. 
    - 오버라이드를 하지 않으면 죽기때문에! 즉 오버라이드할때 target의 타입을 지정해줘야 한다. 

* 설명2 Generic
    - 자식에서 구체적인 타입을 알게 되는 것을 Generic이라고 한다. 
    - Generic은 원래 class옆에 표시하는건데 자바스크립트에서는 Generic이 있지 않기 때문에 이렇게 표시해준다. 
    - 언어가 어떤 기능을 지원하는것보단 그 개념을 어떻게 적용하는지가 중요하다. 

# 4. 추상계층 불일치

# 5. 설계 종합