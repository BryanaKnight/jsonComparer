import {JsonComparer} from '../lib/jsonComparer';
var chai = require('chai');
var expect = chai.expect;

describe('JsonComparer', () => {
  describe('#check()', () => {

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
});
