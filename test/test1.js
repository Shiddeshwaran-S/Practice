async function test() {
  let res = 0;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         res = 10;
//         resolve(res);
//       }, 2000);
//   });
    setTimeout(() => {
        res = 10;
    }, 2000);

    return res;
}


async function runner(){
    let val = test();
    console.log(val);
}

runner();
