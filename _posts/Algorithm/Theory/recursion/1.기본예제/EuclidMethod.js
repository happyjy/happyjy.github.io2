//최대공약수: Euclid Method

function gcd(m, n){
  if(m<n){
    var tem = m; m=n; n=temp;
  }
  if(m%n==0){
    return n;

  }else{
    return gcd(n, m%n);

  } 
}


console.log(gcd(4,2));