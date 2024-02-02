var list = [1,2,3];

justAFunction = function () {
  console.log(0," Hai");
  let tmp = 1;

  function innerfun() {
    tmp += 1;
    console.log(tmp);
  }
  
  console.log("bye....");
  innerfun();
  return innerfun;
}

const fun1 = justAFunction();
const fun2 = justAFunction();

fun1()
fun2()