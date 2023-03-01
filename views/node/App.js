// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/features/issues/issueSlice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectIssues = exports.issueSlice = exports.fetchIssuesByQuery = exports.deleteIssue = exports.default = exports.checkIssue = void 0;
var _toolkit = require("@reduxjs/toolkit");
const initialState = {
  loading: false,
  issues: [],
  error: ''
};
const fetchIssuesByQuery = (0, _toolkit.createAsyncThunk)('issue/fetchIssuesByQuery', async query => {
  return await fetch(`/search?jql=${query}`, {
    method: "GET",
    'Accept': 'application/json'
  }).then(res => {
    return res.json();
  }).then(res => {
    return res.issues.map(issue => {
      const fields = issue.fields;
      const creator = fields.creator;
      return {
        id: issue.id,
        avatar: creator.avatarUrls,
        name: creator.displayName,
        summary: fields.summary,
        status: fields.status.name,
        updated: fields.updated,
        project: fields.project.name,
        isChecked: false
      };
    });
  }).catch(err => console.error(err));
});
exports.fetchIssuesByQuery = fetchIssuesByQuery;
const selectIssues = (state, isFiltered) => {
  if (isFiltered) {
    return state.issues.filter(i => !i.isChecked);
  }
  return state.issues;
};
exports.selectIssues = selectIssues;
const issueSlice = (0, _toolkit.createSlice)({
  name: 'issue',
  initialState,
  reducers: {
    deleteIssue: (state, action) => {
      const issueId = action.payload;
      state.issues = state.issues.filter(i => i.id !== issueId);
    },
    checkIssue: (state, action) => {
      const index = action.payload;
      const element = state.issues.splice(index, 1)[0];
      element.isChecked = !element.isChecked;
      state.issues = element.isChecked ? [...state.issues, element] : [element, ...state.issues];
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchIssuesByQuery.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchIssuesByQuery.fulfilled, (state, action) => {
      state.loading = false;
      state.issues = action.payload;
      state.error = '';
    });
    builder.addCase(fetchIssuesByQuery.rejected, (state, action) => {
      state.loading = false;
      state.issues = [];
      state.error = action.error.message;
    });
  }
});
exports.issueSlice = issueSlice;
const {
  deleteIssue,
  checkIssue
} = issueSlice.actions;
exports.checkIssue = checkIssue;
exports.deleteIssue = deleteIssue;
var _default = issueSlice.reducer;
exports.default = _default;
},{}],"../src/features/projects/projectSlice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectSlice = exports.fetchProjects = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
const initialState = {
  loading: true,
  projects: [],
  error: ''
};
const fetchProjects = (0, _toolkit.createAsyncThunk)('project/fetchProjects', async () => {
  return await fetch('/projects', {
    method: "GET",
    'Accept': 'application/json'
  }).then(res => {
    return res.json();
  }).then(res => {
    return res.values.map(value => {
      return {
        label: value.name,
        value: value.key
      };
    });
  }).catch(err => console.error(err));
});
exports.fetchProjects = fetchProjects;
const projectSlice = (0, _toolkit.createSlice)({
  name: 'project',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    });
  }
});
exports.projectSlice = projectSlice;
var _default = projectSlice.reducer;
exports.default = _default;
},{}],"SearchForm.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _buttonGroup = _interopRequireDefault(require("@atlaskit/button/button-group"));
var _standardButton = _interopRequireDefault(require("@atlaskit/button/standard-button"));
var _select = _interopRequireDefault(require("@atlaskit/select"));
var _form = _interopRequireWildcard(require("@atlaskit/form"));
var _textfield = _interopRequireDefault(require("@atlaskit/textfield"));
var _spinner = _interopRequireDefault(require("@atlaskit/spinner"));
var _reactRedux = require("react-redux");
var _projectSlice = require("../src/features/projects/projectSlice");
var _issueSlice = require("../src/features/issues/issueSlice");
const _excluded = ["id"],
  _excluded2 = ["id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const SearchForm = ({
  setIsFirstSearch,
  setIssuesPerPage
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const project = (0, _reactRedux.useSelector)(state => state.project);
  (0, _react.useEffect)(() => {
    dispatch((0, _projectSlice.fetchProjects)());
  }, []);
  const status = [{
    label: "Done",
    value: "Done"
  }, {
    label: "In progress",
    value: "'In Progress'"
  }, {
    label: "Test",
    value: "Test"
  }, {
    label: "To Do",
    value: "'To Do'"
  }];
  const handleSubmit = data => {
    setIsFirstSearch();
    setIssuesPerPage(data.issuesPerPage);
    let queryString = [];
    for (let key in data) {
      if (data[key].length && key !== 'issuesPerPage') {
        const params = data[key].map(p => p.value).join(',');
        queryString = [...queryString, `${key}%20in%20(${params})`];
      }
    }
    queryString = queryString.length ? queryString.join('%20AND%20') : '';
    dispatch((0, _issueSlice.fetchIssuesByQuery)(queryString));
  };
  const validate = value => {
    if (value < 5) {
      return "LESS_THAN_FIVE";
    }
    if (value > 15) {
      return "MORE_THAN_FIFTEEN";
    }
    return;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      width: '400px',
      margin: '0 auto 30px',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px'
    }
  }, project.loading && /*#__PURE__*/_react.default.createElement(_spinner.default, {
    interactionName: "load",
    size: "large"
  }), !project.loading && /*#__PURE__*/_react.default.createElement(_form.default, {
    onSubmit: data => handleSubmit(data)
  }, ({
    formProps,
    reset
  }) => /*#__PURE__*/_react.default.createElement("form", _extends({}, formProps, {
    noValidate: true
  }), /*#__PURE__*/_react.default.createElement(_form.FormHeader, {
    title: "Set the search parameters"
  }), /*#__PURE__*/_react.default.createElement(_form.Field, {
    name: "project",
    label: "Select a project",
    defaultValue: []
  }, _ref => {
    let {
        fieldProps: {
          id
        }
      } = _ref,
      rest = _objectWithoutProperties(_ref.fieldProps, _excluded);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_select.default, _extends({
      inputId: id
    }, rest, {
      options: project.projects,
      isMulti: true
    })));
  }), /*#__PURE__*/_react.default.createElement(_form.Field, {
    name: "status",
    label: "Select an issue status",
    defaultValue: []
  }, _ref2 => {
    let {
        fieldProps: {
          id
        }
      } = _ref2,
      rest = _objectWithoutProperties(_ref2.fieldProps, _excluded2);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_select.default, _extends({
      inputId: id
    }, rest, {
      options: status,
      isMulti: true
    })));
  }), /*#__PURE__*/_react.default.createElement(_form.Field, {
    name: "issuesPerPage",
    label: "Number of issues per page",
    defaultValue: "5",
    validate: validate
  }, ({
    fieldProps,
    error
  }) => /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_textfield.default, _extends({}, fieldProps, {
    type: "number",
    min: "5",
    max: "15"
  })), error === 'LESS_THAN_FIVE' && /*#__PURE__*/_react.default.createElement(_form.ErrorMessage, null, "Value must be grater than or equal to 5"), error === 'MORE_THAN_FIFTEEN' && /*#__PURE__*/_react.default.createElement(_form.ErrorMessage, null, "Value must be less than or equal to 15"))), /*#__PURE__*/_react.default.createElement(_form.FormFooter, null, /*#__PURE__*/_react.default.createElement(_buttonGroup.default, null, /*#__PURE__*/_react.default.createElement(_standardButton.default, {
    appearance: "subtle",
    id: "form-reset",
    onClick: () => reset()
  }, "Reset form"), /*#__PURE__*/_react.default.createElement(_standardButton.default, {
    appearance: "primary",
    id: "set-search-data",
    type: "submit"
  }, "Find issues"))))));
};
var _default = SearchForm;
exports.default = _default;
},{"../src/features/projects/projectSlice":"../src/features/projects/projectSlice.js","../src/features/issues/issueSlice":"../src/features/issues/issueSlice.js"}],"App.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _dynamicTable = _interopRequireDefault(require("@atlaskit/dynamic-table"));
var _checkbox = require("@atlaskit/checkbox");
var _standardButton = _interopRequireDefault(require("@atlaskit/button/standard-button"));
var _trash = _interopRequireDefault(require("@atlaskit/icon/glyph/trash"));
var _badge = _interopRequireDefault(require("@atlaskit/badge"));
var _filter = _interopRequireDefault(require("@atlaskit/icon/glyph/filter"));
var _spinner = _interopRequireDefault(require("@atlaskit/spinner"));
var _reactRedux = require("react-redux");
var _issueSlice = require("../src/features/issues/issueSlice");
var _react = _interopRequireWildcard(require("react"));
var _SearchForm = _interopRequireDefault(require("./SearchForm"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function App() {
  const issue = (0, _reactRedux.useSelector)(state => state.issue);
  const dispatch = (0, _reactRedux.useDispatch)();
  const [highlightedRows, setHighlightedRows] = (0, _react.useState)([]);
  const [isFiltered, setIsFiltered] = (0, _react.useState)(false);
  const issuesList = (0, _reactRedux.useSelector)(state => (0, _issueSlice.selectIssues)(state.issue, isFiltered));
  const [issuesPerPage, setIssuesPerPage] = (0, _react.useState)(null);
  const [isFirstSearch, setIsFirstSearch] = (0, _react.useState)(true);
  const handleSetIssuesPerPage = number => {
    setIssuesPerPage(number);
  };
  const handleSetIsFirstSearch = () => {
    setIsFirstSearch(false);
  };
  (0, _react.useEffect)(() => {
    let rows = [];
    issue.issues.forEach((i, index) => {
      if (i.isChecked) {
        rows = [...rows, index];
      }
    });
    setHighlightedRows(rows);
  }, [issue.issues]);
  const handleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  //rows with Redux data
  const rows = issuesList.map((issue, index) => {
    return {
      key: `issue-row-${issue.id}`,
      cells: [{
        key: 'issue-row-creator',
        content: /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: issue.avatar['24x24'],
          style: {
            borderRadius: '50%'
          }
        }), /*#__PURE__*/_react.default.createElement("strong", null, issue.name))
      }, {
        key: 'issue-row-project',
        content: issue.project
      }, {
        key: 'issue-row-summary',
        content: issue.summary
      }, {
        key: 'issue-row-status',
        content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_badge.default, null, issue.status), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("small", null, issue.updated))
      }, {
        key: 'issue-row-checkbox',
        content: /*#__PURE__*/_react.default.createElement(_checkbox.Checkbox, {
          value: "default checkbox"
          //label="Default checkbox"
          ,
          onChange: () => dispatch((0, _issueSlice.checkIssue)(index)),
          name: "checkbox-default",
          testId: "cb-default",
          isChecked: issue.isChecked
        })
      }, {
        key: 'issue-row-delete',
        content: /*#__PURE__*/_react.default.createElement(_standardButton.default, {
          appearance: "subtle",
          iconBefore: /*#__PURE__*/_react.default.createElement(_trash.default, {
            size: "small"
          }),
          onClick: () => dispatch((0, _issueSlice.deleteIssue)(issue.id))
        })
      }]
    };
  });
  const caption = "TodoList Tasks";
  const head = {
    cells: [{
      key: 'issue-creator',
      content: 'Creator'
    }, {
      key: 'issue-project',
      content: 'Project'
    }, {
      key: 'issue-summary',
      content: 'Summary'
    }, {
      key: 'issue-status',
      content: 'Status'
    }, {
      key: 'issue-checkbox',
      content: "Checkbox",
      width: '1'
    }, {
      key: 'issue-delete',
      content: 'Delete',
      width: '1'
    }]
  };
  const buttonAppearance = isFiltered ? 'link' : 'subtle-link';
  const buttonCaption = isFiltered ? 'Unfilter' : 'Filter';
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '24px',
      minHeight: '300px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/_react.default.createElement(_SearchForm.default, {
    setIssuesPerPage: handleSetIssuesPerPage,
    setIsFirstSearch: handleSetIsFirstSearch
  }), !issue.loading && issue.error ? /*#__PURE__*/_react.default.createElement("div", null, "Error: ", issue.error) : null, !isFirstSearch && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/_react.default.createElement("h2", null, "TodoList Tasks"), /*#__PURE__*/_react.default.createElement(_standardButton.default, {
    onClick: handleFilter,
    iconAfter: /*#__PURE__*/_react.default.createElement(_filter.default, null),
    appearance: buttonAppearance
  }, buttonCaption)), /*#__PURE__*/_react.default.createElement(_dynamicTable.default, {
    head: head,
    rows: rows,
    rowsPerPage: issuesPerPage,
    defaultPage: 1,
    loadingSpinnerSize: "small",
    isLoading: issue.loading,
    emptyView: /*#__PURE__*/_react.default.createElement("h2", null, "Nothing found"),
    highlightedRowIndex: highlightedRows
  })));
}
},{"../src/features/issues/issueSlice":"../src/features/issues/issueSlice.js","./SearchForm":"SearchForm.jsx"}]},{},["App.jsx"], null)
//# sourceMappingURL=/App.js.map