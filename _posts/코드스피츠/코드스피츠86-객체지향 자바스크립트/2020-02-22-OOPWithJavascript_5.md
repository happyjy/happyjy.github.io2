---
title: 객체지향 자바스크립트 5회차(MVVM pattern 개선2)
date: 2020-03-15
tags:
  - 코드스피츠
  - 객제지향 자바스크립트
keywords:
  - 객체지향
  - MVVM
---

 # https://youtu.be/5UUISCK6CL4
 * VMSubject > notify에서 this.notifyTarget은 hook으로 상속받은 애가 결정하도록 되어 있다. 
 * [ ] 이게 뭐때문에 설명한것지 찾아보기 



# Processor

* https://youtu.be/5UUISCK6CL4
    - binder에다가 addProcessor로 원하는 Process를 만들어 끼워 넣어주는 형태로 되어 있다. 

* https://youtu.be/5UUISCK6CL4
    - ViewModel에 "style, attributes, propeties"를 명시하고 있다! 
    - 일반화 하는것을 배울 예정 

Processor가 독립되어서 ViewModel에서 원하는 key값을 target에서 parsing해올 수 있지만 
ViewModel을 보니 key값이 하드코딩되어 있어 확장가능하지 않다! -> 개선예정(데이터 구조를 동적으로 바꾸는 일)

* https://youtu.be/5UUISCK6CL4?t=788
    - Object.entires(data).forEach(()=>{}) 코드 설명 


* https://youtu.be/5UUISCK6CL4?t=1021
    - parser를 짜보자! 
    - json에대한 재귀 parser를 짜본다.
    - define 함수를 재귀호출하면서 모든 키들을 getter, setter로 만든다 
    - JSON.stringify, JSON.parser를 꼭 만들어 보라고 하심
    - ViewModel > Symbol 설명 
    - parsting 하면 getter, setter를 만들면서 obseverable한 객체를 만들어서 넘겨준다. (객체를 변경하면 변화를 알 수 있다.)
    - 그래서 결론은 binder, viewmodel에도 더이상 특수한 키가 등장하지 않고 특정키를 지정해주는 것은 Processor 밖에 없다. 
    우리는 Proessor에 특정키를 주면 그에 해당하는 ViewModel이 유무에 따라서 동작한다. 그래서 ViewModel에 작성할때 참조해야 한건 ViewModel이 어떤 데이터를 원하냐가 아닌 내가 사용할 Processor가 어떤 키를 원하는게 더 중요하다. 그래서 OCP가 완저하게 보장
        - ViewModel은 아무런 spec을 강요하지 않는데 내가 A,B,C Processor를 쓸꺼니까 A,B,C Processor가 원하는 Key를 갖춘 ViewModel을 필요로 한다.  

* https://youtu.be/5UUISCK6CL4?t=2528 - setDomProcesor function (42:08/ 1:56:44 )
    * 매번 Processor Set를 만들수 없기 때문에 만들어준다 
    * decorator pattern
        - 자기 일하고 다음아이에게 추가적으로 시키는 것 
        - binder에게 baseProcessors.forEach(v=>binder.addProcessor(v)) 이 만큼을 binding해준다. 
        - 이것은 "collection": 한놈 사고치면 다 망가짐
    * chain of responsibility pattern
        - linked list로 처리기를 연결해켜 놓은 것/ 다음 아이에게 일을 시킬 때 일을 시킬지 말지 결정할 수 있는 구조
        - binder에 대한 동작을 설명하면서 binder의 동작이 decorator이다. (Binder class > render의 this.#items 반복문)
        
    * Processor class에 link list를 구현해본다
        - 아래 코드 적다가 강의 듣느라 안적음. 
        - decorator pattern, chain of responsibility pattenr을 쓰는이유? 
            : 게를 소유하는 애와 격리시켜 구조화를 시킬 수 있다. 
        ```js
            #next = null;

            next(process){
                this.#next = process;
            }

            process(...){
                if(this.#next) this.#next.process(vm, el, k, v);
            }

            const Binder = class extends ViewModelListener{
                addProcessor(v){
                    this.#processors[v.cat] = v;
                }
                //=> linked list로 구현 하면 다음과같이 바뀐다. 
                set processor(v){
                    this.#processor = v;
                }
            }
        ```
        ```js
            //? 쓰는게 optional이라고 말하고 있음요. 
         this.#processor?.cat === pk... 
        ```
        - 배열, set사용 구분에 대한 설명
        - 객체 안에 collection을 피해야한다 linked list를 사용해야한다. 이게 함수형 자료구조의 핵심 
            - linked list를 돌면 다음 아이를 순회할때 조건을 추가할 수 있다. 이게 장점, 유리함입니다.

        - 배열을 사용해야할 때는? 
            - 요소에 값만 들어 있을 경우에(행위가 없을때)는 배열을 사용해도 괜찮다. 
            - 그러나 process안에는 행위가 있다. 
            - decorator pattern은 필수다. 그래서 decorator의 chain of responsibility 핵심은? -> linked list 이다.
            - 코드 -> 객체 -> 의존성이생긴다. ocp를 생길 수 없다.


    
* https://youtu.be/5UUISCK6CL4?t=4048 - const Binder = class extends ViewModelListener{}
    - v.cat.split(".").pop() 에 대해서 설명 다시 시작
    - binder, baseProcessors > _process에 대해서 설명 중...
    - 제어권을 코어, 확장된 객체 이 둘중 어디에 둘까 고민중 
 

 * https://youtu.be/5UUISCK6CL4?t=4529 - html 화면  
    - setDomProcessor > "template" process 구현 설명 

    - static, 클래스를 언제 사용해야 할까의 구분
        - 한번, 여러번 사용할 수 잇는 것에 대한 차이 
        - 클래스는 상속을 할 수 있습니다. 

    - shield? 쉴드 패턴 
        - balck list, white list : 정확성 코드, 처리하는 코드를 나눠라. 
    
    - https://youtu.be/5UUISCK6CL4?t=5531 visitor.visit(el=>{}) 설명 시작