function solution(answerList) {
  let answer = [];

  const stdPick1 = [1,2,3,4,5];
  const stdPick2 = [2,1,2,3,2,4,2,5];
  const stdPick3 = [3,3,1,1,2,2,4,4,5,5];

  //STUDY POINT2
  //# 정답 비교할 방법 list
  //  * 정답수만큼 pick길이 concat하기 
  //  * pick 배열을 순환할 인자를 하나 더만들어 iterator
  function countAnsewer(pick, answerList){
    return answerList.filter((v,i) => v === pick[i%pick.length]);
  }

  let std1Result = countAnsewer(stdPick1, answerList);
  let std2Result = countAnsewer(stdPick2, answerList);
  let std3Result = countAnsewer(stdPick3, answerList);

  const stdResult = [];
  stdResult.push(std1Result.length);
  stdResult.push(std2Result.length);
  stdResult.push(std3Result.length);

  
  //STUDY POINT1
  //Math.max
  //Math.max에 배열을 피대상자로 넣고 싶을때 spread grammer로 max값을 꺼낼 수 있다.ㄴ
  const maxValue = Math.max(...stdResult);
  if(maxValue === 0){
    answer = [0,0,0];
  } else {
    //STUDY POINT3
    //stdResult Array에 iterator funciton에 대상 array에 접근 당연 안됨
    answer = stdResult.map((v,i) => {return {std: i+1, score: v}})
                      .filter(v=> v.score === maxValue)
                      .map(v=>v.std)
                      .sort();
  }

  return answer;
}

console.log(solution([1,2,3,4,5]));
console.log(solution([1,3,2,4,2]));
console.log(solution([1,5,4,3,2,1,3,4,1,2,3,4,2,4,4,1,2,3,4,1,3]));