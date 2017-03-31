import { time, log } from './index';

class Test {

    @time
    @log
    myMethod(who: string) {
        console.log(`Hello ${who}!`);
    }
}

(new Test).myMethod('word');
(new Test).myMethod('word');
(new Test).myMethod('word');