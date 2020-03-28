function solution(numbers) {
    var answer = 0;


    // #숫자 모든 조합 - 중복제거 필요/ 재귀호출 사용
    // [고민해보기] 모든 조합 만들기 && 중복 제거 
    /**
     * 확실히 고른 문자들과 고르지 않은 문자들을 구별할 정수(m)를 지정해줍니다.
       (m)인덱스 전의 문자는 바꾸지 않습니다.
       문자를 추가한뒤 재귀함수를 콜할 때 이 정수(m)를 +1 해줍니다.

      각 문자를 바꾸려면 substring(str, m, n) 사이에서 m 포지션의 문자를 m 부터 n 까지의 문자와 바꾸어 주며 재귀함수를 콜해줍니다.
      이때 중요한건 재귀함수가 끝나면 바꾸었던 문자를 되돌려놓아야합니다.
      그래야 재귀함수 안의 함수가 끝났을때 이어서 다른 재귀함수를 제대로된 문자열로 콜 할수 있습니다.
     */

    /**
     * # 모든 문자열 조합 재귀호출을
     *   * 모든 문자열 조합 재귀호을 확인하기 위해서 아래 주석 명으로 주석을 달아 놓았다.
     *     - //모든 문자열 조합 재귀호출 확인용 log
     *   * 참고 사이트 
     *     - https://mailprogramming.com/sample_question_recursion
     * 
     */

    // debugger;
    var numbersArr = numbers.toString().split('');
    var a = makeAllAssemble(numbersArr, 0, numbersArr.length - 1);
    console.log(a);

    //중복제거 - 숫자 모든 조합중
    // * allAssembleStr : 이차 배열이라 바로 filter에서 중복 하는 것을 피할 수 없다.
    //[STUDY] allAssembleStr이 filter안에서도 사용된다.
    //[STUDY] allAssembleStr.indexOf(v): allAssembleStr 배열 안에서 원하는 배열 인자 값이 몇번째에 있는가?
    //[STUDY] allAseembleStr.indexOf(v) === i : i는 allSeembleStr의 배열 index value 
    // debugger;
    // var delDuplStr = allAssembleStr.filter((v,i) => allAssembleStr.indexOf(v) === i)

    var arrJoined = allAssembleStr.map((v, i) => v.join(""));
    var delDuplArr = arrJoined.filter((v, i) => arrJoined.indexOf(v) === i);

    console.log("###delDuplStr", delDuplArr);

    return answer;
}

var allAssembleStr = [];

function makeAllAssemble(str, m, n) {

    if (m === n) {
        //모든 문자열 조합 재귀호출 확인용 log
        // console.log({m, n})
        console.log("### l === n", str);
        allAssembleStr.push(str);
    } else {
        for (var i = m; i <= n; i++) {
            //모든 문자열 조합 재귀호출 확인용 log 
            // console.log({m, n, i})
            str = swap(str, m, i);
            makeAllAssemble(str, m + 1, n);
            str = swap(str, m, i);
            // console.log("------------");
        }
    }

    return allAssembleStr;
}

function swap(str, i, j) {
    var temp = str[i];
    str[i] = str[j];
    str[j] = temp;

    return str;
}

// #소수 찾기
function isPrime1(n) {
    const divisor = 2;
    while (n > divisor) {
        if (n % divisor == 0) {
            return false;
        } else {
            divisor++;
        }
        return true;
    }
}

// console.log(solution('17'));
// console.log(solution('1234'));