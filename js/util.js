/**
 * Utils Namespace
 */
var util = {};

/**
 * @param element
 * @returns {*}
 */
util.getBlockClass = function(element) {
  var className = element.attr('class');
  var regexp = /(b_\S*)+/;
  var m = [];   
  m = regexp.exec(className);
  return m[0];
};

