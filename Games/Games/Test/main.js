function polymorph(id, refreshCallback) {
    refreshCallback();
}

function func1() {
    console.log('Hello World');
}
function func2() {
    console.log('Hello You');
}

var f1 = func1;
var f2 = func2;

polymorph(1, f1);
polymorph(1, f2);