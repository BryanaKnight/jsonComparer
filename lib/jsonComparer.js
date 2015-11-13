import _ from 'lodash';

export const JsonComparer = {
  check(current, expected) {
    let results = [];
    this.iterateDown(current, expected, results);
    return _.all(results, Boolean);
  },

  iterateDown(current, expected, results){
    for(var key of Object.keys(current)) {
      if(typeof(current[key]) === "object") {
        var hsh1 = current[key];
        var hsh2 = expected[key];
        results.push(this.sameKeys(hsh1, hsh2));
        this.iterateDown(current[key], expected[key], results);
      }
    }
    results.push(this.sameKeys(current, expected));
  },

  sameKeys (hash1, hash2) {
    if(Object.keys(hash1).sort().toString() == Object.keys(hash2).sort().toString()) {
      return true;
    } else {
      return false;
    }
  }
}
