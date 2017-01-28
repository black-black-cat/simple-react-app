import chai from 'chai';
import { stub, spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it } from 'mocha';
import Dog from '../../shared/Dog';

chai.should();
chai.use(sinonChai);

describe('Shared', () => {
    describe('Dog', () => {
        var toby = new Dog('Test Toby');
        describe('name', () => {
            it('should be a string type', () => {
                toby.name.should.be.string;
            })
        });

        describe('bark', () => {
            it('should bark a string with its name', () => {
                toby.bark().should.equal('Wah wah, I am Test Toby');
            })
        });

        describe('barkInConsole stub', () => {
            it('should print a bark string with its name', () => {
                stub(console, 'log', function (input) {
                    return input;
                });
                // var toby = new Dog('Test Toby');
                // console.log(toby.name);
                toby.barkInConsole();
                console.log.should.have.been
                    .calledWith('Wah wah, I am Test Toby');
                // console.log 已经被替换
                console.log(toby.bark()).should.equal('Wah wah, I am Test Toby');
                console.log.restore();
            });
        });

        describe('barkInConsole spy', () => {
            it('log a string with its name', () => {
                var logSpy = spy(console, 'log');
                toby.barkInConsole.should.be.function;
                toby.barkInConsole();
                console.log.should.have.been
                    .calledWith('Wah wah, I am Test Toby');
                console.log.restore();
            })
        })
    });
});
