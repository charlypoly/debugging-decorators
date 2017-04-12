import { log } from '../lib/';
import * as chai from 'chai';
import * as spies from 'chai-spies';

chai.use(spies);

describe('@log', () => {

    describe('with default pattern', () => {
        let logger = chai.spy();

        class TestLog {

            @log({ logger: <Function>logger })
            myMethod(who: string) {
                // console.log(`Hello ${who}!`);
            }
        }

        it('should call logger before method', () => {
            (new TestLog).myMethod('Charly');
            chai.expect(logger).to.have.been.called.with('TestLog.myMethod: Charly');
        });
    });

    describe('with a custom pattern', () => {
        let logger = chai.spy();

        class TestLog {

            @log({ logger: <Function>logger, pattern: '{methodName} called' })
            myMethod(who: string) {
                // console.log(`Hello ${who}!`);
            }
        }

        it('should call logger before method', () => {
            (new TestLog).myMethod('Charly');
            chai.expect(logger).to.have.been.called.with('myMethod called');
        });
    });

});
