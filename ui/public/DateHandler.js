"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonDateReviver = jsonDateReviver;
var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
//# sourceMappingURL=DateHandler.js.map