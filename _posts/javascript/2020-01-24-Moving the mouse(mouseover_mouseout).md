---
title: mouseover, mouseout일때 element를 건너뛰는 특징
date: 2020-01-24
tags:
  - Javascript
keywords:
  - mouseover
  - mouseout
  - mouseenter
  - mouseleave
---

> mouseover/out 이벤트 일때마다 특정 동작을 구현하려고 했을때 '계층구조 el인 경우에 이벤트가 element를 건너뛰는 특징'을 파악하지 못해서 시간을 지체한 경우가 있었는데 이후 검색하다 이유를 알게 되서 정리를 하게 됐다.


# mouseover/ mouseout & relatedTarget

* relatedTarget은 null 일수 있다. 
  * window창에서 바로 el로 진입하게 되면 

# element를 건너뛰는 현상
> 브라우저는 마우스가 움직일때 pixel 단위로 이벤트가 일어나는게 아니라 마우스 포지션을 시간별로 체크한다.  
그래서 빠르게 움직일때 dom-elements를 건너뛰 수 있다.

* 아래 링크에서 마우스를 빠르게 이동하면서 textArea를 확인해보자 
  * <https://plnkr.co/edit/S99kMXYRIsDCf4wP4pkD?p=preview>
  * **브라우저가 마우스 포지션을 시간별로 체크하기 때문에   
  el의 경계선이 가까울 수록 모든 el에 visit 하지 않는다.**
  