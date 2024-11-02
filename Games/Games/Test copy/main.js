class Test {
    #func;
    constructor() {
        this.#func = this.func1;
    }

    exe() {
        this.#func();
    }
    setFunc(func) {
        this.#func = func;
    }
}


let test = new Test();
test.setFunc(func1);
test.exe();



function func1() {
    console.log('Hello World');
}
function func2() {
    console.log('Hello You');
}