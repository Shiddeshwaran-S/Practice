module.exports = function getCurrentTime(condition){
    console.log(new Date().getTime());
    if(condition){
        console.log('condition is true');
    } else {
        console.log('condition is false');
    }
}