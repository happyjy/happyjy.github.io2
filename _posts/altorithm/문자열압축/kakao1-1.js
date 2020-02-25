 /*

      # 압축
        * 압축 방법
        * 연속하는 문자를 숫자로 표현하기
        * 연속하는 문자앞에 반복하는 횟수를 문자 앞에 붙인다.
        * 압축할 문자열 s가 매개변수로 주어질 때,
          위에 설명한 방법으로 1개 이상 단위로 문자열을 잘라
          압축하여 표현한 문자열 중 가장 짧은 것의 길이를 return 하도록 solution 함수를 완성해주세요.

        "aabbaccc"	7
        "ababcdcdababcdcd"	9
        "abcabcdede"	8
        "abcabcabcabcdededededede"	14
        "xababcdcdababcdcd"	17
    */

   var arr1 = "aabbaccc";
   var arr2 = "ababcdcdababcdcd";
   var arr3 = "abcabcdede";
   var arr4 = "abcabcabcabcdededededede";
   var arr5 = "xababcdcdababcdcd";


   /*
       1. 문자열 비교 자를 길이 구하기(cmpChrLength)
         - 1 <= cmpChrLength < 문자열 길이
       2. 비교 횟수
         - 1부터 문자열 길이
       3. '문자열 비교 길이 단위' 만큼 압축하기
         - 문자열 비교 길이 단위 만큼 문자열을 잘라서
         - 자른 문자열 그 다음 idx부터 문자열 비교 길이 단위만큼 끊어서 비교(문자열 idx를 이용해서)
           - 같으면 '중복한다는 변수' +1
           - 같지 않으면 그다음 자른 문자열 길이만큼 끊어서 비교
           - 확인할것 문자열의 끝

   */

  /**
   * s의 길이는 1 이상 1,000 이하입니다.
   * s는 알파벳 소문자로만 이루어져 있습니다.
  */
  function solution(s) {
    var answer = 0;

    //1. 문자열을 비교문자열 길이 단위로 잘라 새로운 배열을 만든다.
    //2. 반복문으로 새로운 배열을 비교해 문자열을 압축해 길이를 보관.
    //3. 2번 배열을 비교문자열 길이 단위(1,2,3...문자열 길이) 반큼 반복한다.
    //4. 3번을 반복해 압축한 가장 짧은 길이를 return

    //3.
    const zipStr = [];
    for(var i=0; i<s.length; i++){
      // 비교 문자열 길이
      var cmpChrLength = i+1;
      //1.
      var tempArr = [];
      for(var j=0; j<s.length/cmpChrLength; j++){ 
        var start = cmpChrLength*j;
        var end = cmpChrLength*j + cmpChrLength;1
        //2.
        tempArr.push(s.slice(start, end));
        //tempArr에 넣으면서 zpingStr을 바로 만들려고 했는데 기능별로 로직을 나누자 ^^
        // if(tempArr.length > 0){
          //   if(tempArr[0] === tempArr[1]){
            //     zipingStr += tempArr[0]
            //   }
            // }
      }
      // console.log("### tempArr: ", tempArr);


      var zipingStr = '';
      var k=0;
      var l=0;

      //3. 
      for(k; k<tempArr.length; k++){
        var duplChrNum = 1;
        var duplChr = '';
        var nextIteratorKIdx = 0;
        var continueCompare = true;

        // debugger;
        for(l=k+1; l<tempArr.length+1; l++){
          if (continueCompare && tempArr[k] === tempArr[l]) {
            ++duplChrNum;
            duplChr = tempArr[k];
            nextIteratorKIdx = l;
          } else {
            if(duplChr === ''){
              duplChr = tempArr[k];
              nextIteratorKIdx = k;
            }
            continueCompare = false;s
          }
        }
        //이부분이 앞축하는데 부가적인 정보를 세팅하는 부분
        k = nextIteratorKIdx;
        zipingStr += (duplChrNum === 1 ? '' : duplChrNum) + duplChr;
        continueCompare = true
        // debugger;
      }

      //압출한 string 보관 arr에 push
      zipStr.push(zipingStr);
    }

    //압축한 string 길이확인 -> 제일 짧은 길이 확인 -> 제일 짧은 길이 string 찾기
    let zipStrLength = zipStr.map(item => {
      return item.length
    })

    zipStrLength.sort((a,b) => a-b);

    let shortestZipStrLenth = zipStrLength[0];

    let shortestZipStr = zipStr.filter(item => {
      if( item.length === shortestZipStrLenth){
        return item;
      }
    })

    // console.log("### shortesZipStr: ", shortestZipStr);
    return shortestZipStr;
  }

  console.log(solution(arr1));
  console.log(solution(arr2));
  console.log(solution(arr3));
  console.log(solution(arr4));
  console.log(solution(arr5));