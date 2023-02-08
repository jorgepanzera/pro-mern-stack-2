"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
// Array de issues, simulando un fetch de una API o db
var initialIssues = [{
  id: 1,
  status: 'New',
  owner: 'Ravan',
  effort: 5,
  created: new Date('2018-08-15'),
  due: undefined,
  issue_title: 'Error in console when clicking Add'
}, {
  id: 2,
  status: 'Assigned',
  owner: 'Eddie',
  effort: 14,
  created: new Date('2018-08-16'),
  due: new Date('2018-08-30'),
  issue_title: 'Missing bottom border on panel'
}, {
  id: 3,
  status: 'Ready',
  owner: 'Sofi',
  effort: 33,
  created: new Date('2023-09-27'),
  due: new Date('2023-10-30'),
  issue_title: 'Read all book in English'
}];

// Definir props y state para cada componente
var IssueFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(IssueFilter, _React$Component);
  var _super = _createSuper(IssueFilter);
  function IssueFilter() {
    _classCallCheck(this, IssueFilter);
    return _super.apply(this, arguments);
  }
  _createClass(IssueFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the issue filter.");
    }
  }]);
  return IssueFilter;
}(React.Component);
function IssueRow(props, state) {
  var _issue$created;
  var issue = props.issue;
  console.log("Rendering issue ".concat(issue.id));
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, " ", issue.id, " "), /*#__PURE__*/React.createElement("td", null, " ", issue.status, " "), /*#__PURE__*/React.createElement("td", null, " ", issue.owner, " "), /*#__PURE__*/React.createElement("td", null, " ", (_issue$created = issue.created) === null || _issue$created === void 0 ? void 0 : _issue$created.toDateString(), " "), /*#__PURE__*/React.createElement("td", null, " ", issue.due ? issue.due.toDateString() : '', " "), /*#__PURE__*/React.createElement("td", null, " ", issue.issue_title, " "));
}
function IssueTable(props, state) {
  // Iterar con map en el array de issues del state, key para unique id de cada fila
  var issuesRows = props.issues.map(function (issue) {
    return /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    });
  });
  var tableStyle = props.tableStyle;
  return /*#__PURE__*/React.createElement("table", {
    style: tableStyle
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created Date"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issuesRows));
}
var IssueAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(IssueAdd, _React$Component2);
  var _super2 = _createSuper(IssueAdd);
  function IssueAdd(props) {
    var _this;
    _classCallCheck(this, IssueAdd);
    _this = _super2.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (event) {
      var _form$owner, _form$issue_title, _form$owner2, _form$issue_title2;
      event.preventDefault();
      console.log(event.currentTarget);
      var form = document.forms.namedItem("IssueSubmit");
      //const form = event.currentTarget;

      var owner = (_form$owner = form.owner) === null || _form$owner === void 0 ? void 0 : _form$owner.value;
      var title = (_form$issue_title = form.issue_title) === null || _form$issue_title === void 0 ? void 0 : _form$issue_title.value;
      var issue = {
        owner: (_form$owner2 = form.owner) === null || _form$owner2 === void 0 ? void 0 : _form$owner2.value,
        issue_title: (_form$issue_title2 = form.issue_title) === null || _form$issue_title2 === void 0 ? void 0 : _form$issue_title2.value,
        status: "New"
      };
      _this.props.createIssue(issue);
      form.owner.value = "";
      form.issue_title.value = "";
    });
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(IssueAdd, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "IssueSubmit",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "owner",
        placeholder: "Owner"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "issue_title",
        placeholder: "Title"
      }), /*#__PURE__*/React.createElement("button", null, "Add"));
    }
  }]);
  return IssueAdd;
}(React.Component); // clase que usa las otras 3 en un Fragment
var IssueList = /*#__PURE__*/function (_React$Component3) {
  _inherits(IssueList, _React$Component3);
  var _super3 = _createSuper(IssueList);
  function IssueList(props) {
    var _this2;
    _classCallCheck(this, IssueList);
    _this2 = _super3.call(this, props);
    _this2.state = {
      issues: []
    };
    _this2.createIssue = _this2.createIssue.bind(_assertThisInitialized(_this2)); // para poder usarlo en child elements, y que this siga apuntando a IssueList
    return _this2;
  }
  _createClass(IssueList, [{
    key: "loadData",
    value: function loadData() {
      var _this3 = this;
      setTimeout(function () {
        _this3.setState({
          issues: initialIssues
        });
      }, 1000);
    }
  }, {
    key: "createIssue",
    value: function createIssue(issue) {
      issue.id = this.state.issues.length + 1;
      issue.created = new Date();
      var newIssueList = this.state.issues.slice();
      newIssueList.push(issue);
      this.setState({
        issues: newIssueList
      });
    }

    // cuando el componente esta pronto para render, le asigno el state inicial
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "render",
    value: function render() {
      var tableStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        borderCollapse: "collapse"
      };
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
        issues: this.state.issues,
        tableStyle: tableStyle
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
        createIssue: this.createIssue
      }));
    }
  }]);
  return IssueList;
}(React.Component);
function IsFormFieldElement(element) {
  // Customize this list as necessary −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  if (!("value" in element)) {
    throw new Error("Element is not a form field element");
  }
}

// Crear issue list
ReactDOM.render(React.createElement(IssueList), document.getElementById('contents'));
//# sourceMappingURL=App.js.map