import {JsonComparer} from '../lib/jsonComparer';
var chai = require('chai');
var expect = chai.expect;

describe('JsonComparer', () => {
  describe('#check()', () => {
    describe('same level, key order swapped', () => {
      describe('matches', () => {
        let apiContract =
          {
            "text": "Acne",
            "category": "procedure",
            "id": 273
          }

        let sampleResponse =
          {
            "text": "Acne",
            "id": 273,
            "category": "procedure"
          }

        it('compares json hashes', () => {
          expect(JsonComparer.check(sampleResponse, apiContract)).to.be.true;
        });
      });

      describe('does not match', () => {
        let apiContract =
          {
            "text": "Acne",
            "category": "procedure",
            "id": 273
          }

        let sampleResponse =
          {
            "text": "hi",
            "id": 22,
            "cheese": "procedure"
          }

        it('compares json hashes', () => {
          expect(JsonComparer.check(sampleResponse, apiContract)).to.not.be.true;
        });
      });
    });

    describe('one level nested key', () => {
      describe('nested key does not match', () => {
        describe('nested key matches', () => {
          let apiContract =
            {
              "text": "Acne",
              "category": { "cardio" : "surgery" },
              "id": 273
            }

          let sampleResponse =
            {
              "text": "hi",
              "id": 33,
              "category": { "cardio" : "something" },
            }

          it('compares json hashes', () => {
            expect(JsonComparer.check(sampleResponse, apiContract)).to.be.true;
          });
        });

        describe('nested hash key does not match', () => {
          let apiContract =
            {
              "text": "Acne",
              "category": { "cardio" : "surgery", "potato": {'hi': "hello" }},
              "id": 273
            }

          let sampleResponse =
            {
              "text": "hi",
              "id": 33,
              "category": { "xcardio" : "surgery", "potato": {'hi': "hello" }},
            }

          it('compares json hashes', () => {
            expect(JsonComparer.check(sampleResponse, apiContract)).to.not.be.true;
          });
        });

        describe('nested array key does not match', () => {
          let apiContract =
            {
              "text": [{"hi": "there"}, {"hello": "theeses"}],
              "category": { "cardio" : "surgery" },
              "id": 273
            }

          let sampleResponse =
            {
              "text": [{"hih": "there"}, {"hello": "theeses"}],
              "id": 33,
              "category": { "cardio" : "surgery" },
            }

          it('compares json hashes', () => {
            expect(JsonComparer.check(sampleResponse, apiContract)).to.not.be.true;
          });
        });
        describe('nested non-array non-hash key do match', () => {
          let apiContract =
            {
              "text": [{"hi": "there"}, {"hello": "theeses"}],
              "category": { "cardio" : "surgery" },
              "id": 273
            }

          let sampleResponse =
            {
              "text": [{"hi": "theres"}, {"hello": "theeses"}],
              "id": 33,
              "category": { "cardio" : "something" },
            }

          it('compares json hashes', () => {
            expect(JsonComparer.check(sampleResponse, apiContract)).to.be.true;
          });
        });
      });
    });
  });
});
