---
title: Recursion 개념과 기본예제, 응용 배우기
date: 2020-04-10
tags:
  - algorithm
keywords:
  - recursion
  - 동적프로그래밍
---

# 1. 순환이란? (what is Recursion?)

https://www.youtube.com/watch?v=YZcO_jRhvxs

## 수학적 문제를 recursion으로 풀어보기

1. Fibonacci Number
2. 최대 공약수
   2.1 Euclid Method(최대공약수)
   2.2 좀더 단순한 버전

# 2. Recursive Thinking

## 수학 함수 뿐 아니라 다른 많은 문제들을 recursion으로 해결할 수 있다.

https://www.youtube.com/watch?v=tuzf1yLPgRI&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=2

1. 문자열 길이 계산
2. 문자열 프린트
3. 문자열 뒤집어 프린트
4. 2진수로 변환하여 출력
5. 배열 합 구하기

## Recursion VS Iteration

- 모든 순환함수는 반복문(iteration)으로 변경가능
- 그 역도 성립! 즉 모든 반목분은 recursion으로 표현 가능
- 순환함수는 복잡한 알고리즘을 단순, 알기 쉽게 표현하는 것을 가능하게 함
- 하지만 함수 호출에 따른 오버헤드가 있음( 매개변수 전달, 액티베이션 프레임 생성 등 )
  - 순환에 비해 속도가 손해를 볼 수 있다.

# 3. Designing Recursion(순환적 알고리즘 설계)

https://www.youtube.com/watch?v=Vwfo_hrxuzg&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=3

- 적어도 하나의 base case, 즉 순환되지 않고 종료되는 case가 있어야 함
- 모든 case는 결국 base case로 수렴해야함
- 암시적(implicit) 매개변수를 명시적(explicit) 매개변수로 바꿔야 함

## Recursion 기본예제

- 순차탐색 - Iteration
- 매개변수의 명시화: 순차탐색 - Recursion
- 순차탐색: 다른 버전 - Recursion
- 매개변수의 명시화: 최대값 찾기 - Recursion
- 최대값 찾기: 다른 버전 - Recursion
- Binary Search
  - https://www.geeksforgeeks.org/binary-search-in-javascript/

# 4. Recursion 응용

- Recursion 응용1: findMaze
  https://www.youtube.com/watch?v=m6lXDsx7oCk&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=4
- Recursion 응용2: Counting Cells in a Blob
  https://www.youtube.com/watch?v=HHJFlVT1tBw&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=5
- Recursion 응용3: n queens problem
  https://www.youtube.com/watch?v=xKGbWC-DPT4&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=6

# 참고

- What Is Recursion - Recursion Explained In 3 Minutes
  https://www.youtube.com/watch?v=YZcO_jRhvxs

- 권오흠 교수님 강의
  - what is Recursion
    https://www.youtube.com/watch?v=ln7AfppN7mY&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=1
  - Recursive Thinking
    https://www.youtube.com/watch?v=tuzf1yLPgRI&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=2
  - Designing Recursion(순환적 알고리즘 설계)
    https://www.youtube.com/watch?v=Vwfo_hrxuzg&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=3
  - Recursion 응용1: findMaze
    https://www.youtube.com/watch?v=m6lXDsx7oCk&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=4
  - Recursion 응용2: Counting Cells in a Blob
    https://www.youtube.com/watch?v=HHJFlVT1tBw&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=5
  - Recursion 응용3: n queens problem
    https://www.youtube.com/watch?v=xKGbWC-DPT4&list=PL52K_8WQO5oUuH06MLOrah4h05TZ4n38l&index=6
