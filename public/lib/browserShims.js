Array.max = function (array) {
    return Math.max.apply(Math, array);
  };
  Array.min = function (array) {
    return Math.min.apply(Math, array);
  };
  /**
   * Test if an array is equal to another one
   * (if they have the same length and are elementwise equal)
   */
  Array.prototype.isEqualTo = function (a2) {
    return (this.length === a2.length) && this.every((el, i) => el === a2[i]);
  };