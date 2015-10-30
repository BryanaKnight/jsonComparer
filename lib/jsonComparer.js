export const JsonComparer = {
  check (current, expected) {
    console.log(Object.keys(current).sort());
    console.log(Object.keys(expected).sort());
    if(Object.keys(current).sort().toString() == Object.keys(expected).sort().toString()) {
      return true;
    } else {
      return false;
    }
  }
}
