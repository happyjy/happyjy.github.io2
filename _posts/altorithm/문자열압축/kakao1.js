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

      //2.비교횟
      for(var i=0; i<s.length-1; i++){
        //1. 문자열 비교 자를 길이 = i;
        var cmpChrLength = i+1;
        //3.
        var completedZipStr = ''; //압축 str
        zip(s, cmpChrLength, completedZipStr);

        console.log(completedZipStr);
        
      }
      return answer;
  }

  /* 
    str: 문자열 
    cmpChrLength: 비교해야할 문자열 길이
  */
  function zip(str, cmpChrLength, completedZipStr){
    var duplNum = str.replace(/[^0-9]+/g, '');
    var str = !duplNum ? str.replace(/[^a-z]+/g,'') : str.replace(/[^a-z]+/g,'').slice(cmpChrLength, str.length);

    // var cmpNum = str.length / cmpChrLength;
    console.log("### completedZipStr: ", completedZipStr);
    debugger;
    // for(var j=1; j<cmpNum; j++){
      //if(s[cmpChrLength])
    var duplChr = 1;
    var cmpChrLastIdx = cmpChrLength;

    //비교할 문자열 길이만큼 비교
    //??? === 기준 좌,우 연산자를 비교할때 중괄호를 하지 않으면 false 왜지? 
    if ( (!!str.slice(0, cmpChrLastIdx) && str.slice(0, cmpChrLastIdx))
          === (!!str.slice(cmpChrLastIdx, (cmpChrLastIdx)*2) && str.slice(cmpChrLastIdx, (cmpChrLastIdx)*2)) ) {
      //aaabb => 3a2b 자를 문자열 단위 1
      //재귀 호출을 사용하다 보니 duplChr scope가 공유가 안되서. 문제 
      //중복 횟수 + 중복문자 + 검사한 idx 이후 (cmpChrLength*2부터 문자길이)
      // var zipTargetStr = duplChr.toString()+str.slice(0,cmpChrLength)+str.slice(cmpChrLength*2, str.length);
      var zipingTargetStr = str.slice(0,cmpChrLength);
      var zipTargetLeftStr = str.slice(cmpChrLength*2, str.length)
      // var zipTargetStr = zipingTargetStr + zipTargetLeftStr;
      console.log("### zipTargetLeftStr: ", zipTargetLeftStr);
      // var duplNum = zipTargetStr.replace(/[^0-9]+/g, '');
      // * 중복 숫자 정하는 과정
      if(completedZipStr.slice(completedZipStr.length-cmpChrLength, completedZipStr.length) ==  zipingTargetStr){
        //2a2b2cc 일경우 cc앞에 있는 2를 잘라서 +1
        duplChr = parseInt(completedZipStr.slice(completedZipStr.length-cmpChrLength-cmpChrLength, completedZipStr.length-cmpChrLength))+1
      }else{
        //2a2bccc 일경우 dupleChr++로 설정 
        //todo 리팩토링으로 duplChr 없애는 로직 추가하기 
        duplChr++;
      }
      
      // completedZipStr += (duplChr).toString() + zipTargetStr.replace(/[^a-z]+/g,'').slice(0, cmpChrLength);
      completedZipStr += (duplChr).toString() + zipingTargetStr;

      debugger;        
      zip(zipTargetLeftStr, cmpChrLength, completedZipStr);
    } else {
      if(str.slice(cmpChrLastIdx, (cmpChrLastIdx)*2) === ""){  // zip 끝
        return false;
      }
      // 위 비교에서 다르면 
      // completedZipStr 문자열 맨뒤에서 비교해야할 문자열의 길이 만큼 잘랐을 때 숫자가 있을 경우(중복)는 str.slice(0, cmpChrLength)를 추가해주지 않는다.
      var isDuplNum = completedZipStr.slice(completedZipStr.length-cmpChrLength, completedZipStr.length)
      Number.isInteger(isDuplNum) ? completedZipStr += str.slice(0, cmpChrLength) : completedZipStr;
      
      var zipTargetLeftStr = str.slice(cmpChrLength, str.length);
      console.log("### zipTargetLeftStr: ", zipTargetLeftStr);
      debugger;
      completedZipStr += str.slice(0, cmpChrLength);
      zip(zipTargetLeftStr, cmpChrLength, completedZipStr);
    }
    // }
  }
  //else에서 단독 문자 일때만 추가하기 
  //끝

   console.log(solution(arr1));