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
})({"formDefault.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _buttonGroup = _interopRequireDefault(require("@atlaskit/button/button-group"));
var _loadingButton = _interopRequireDefault(require("@atlaskit/button/loading-button"));
var _standardButton = _interopRequireDefault(require("@atlaskit/button/standard-button"));
var _checkbox = require("@atlaskit/checkbox");
var _textfield = _interopRequireDefault(require("@atlaskit/textfield"));
var _select = _interopRequireDefault(require("@atlaskit/select"));
var _form = _interopRequireWildcard(require("@atlaskit/form"));
const _excluded = ["id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const FormDefaultExample = () => /*#__PURE__*/_react.default.createElement("div", {
  style: {
    //display: 'flex',
    //width: '400px',
    //maxWidth: '100%',
    margin: '0 auto'
    //flexDirection: 'row',
  }
}, /*#__PURE__*/_react.default.createElement(_form.default, {
  onSubmit: data => {
    console.log('form data', data);
    return new Promise(resolve => setTimeout(resolve, 2000)).then(() => data.username === 'error' ? {
      username: 'IN_USE'
    } : undefined);
  }
}, ({
  formProps,
  submitting
}) => /*#__PURE__*/_react.default.createElement("form", formProps, /*#__PURE__*/_react.default.createElement(_form.FormHeader, {
  title: "TodoList Tasks"
  //description="* indicates a required field"
}), /*#__PURE__*/_react.default.createElement(_form.FormSection, null, /*#__PURE__*/_react.default.createElement(_form.Field, {
  "aria-required": true,
  name: "username",
  label: "Username",
  defaultValue: "dst12"
}, ({
  fieldProps,
  error
}) => /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_textfield.default, _extends({
  autoComplete: "off"
}, fieldProps)), !error && /*#__PURE__*/_react.default.createElement(_form.HelperMessage, null, "You can use letters, numbers and periods."), error && /*#__PURE__*/_react.default.createElement(_form.ErrorMessage, null, "This username is already in use, try another one."))), /*#__PURE__*/_react.default.createElement(_form.Field, {
  "aria-required": true,
  name: "selector"
}, _ref => {
  let {
      fieldProps: {
        id
      },
      error
    } = _ref,
    rest = _objectWithoutProperties(_ref.fieldProps, _excluded);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_select.default, _extends({}, rest, {
    isDisabled: false,
    inputId: "single-select-example",
    className: "single-select",
    classNamePrefix: "react-select",
    options: [{
      label: 'Adelaide',
      value: 'adelaide'
    }, {
      label: 'Brisbane',
      value: 'brisbane'
    }, {
      label: 'Canberra',
      value: 'canberra'
    }, {
      label: 'Darwin',
      value: 'darwin'
    }, {
      label: 'Hobart',
      value: 'hobart'
    }, {
      label: 'Melbourne',
      value: 'melbourne'
    }, {
      label: 'Perth',
      value: 'perth'
    }, {
      label: 'Sydney',
      value: 'sydney'
    }],
    placeholder: "Choose a city"
  })));
}), /*#__PURE__*/_react.default.createElement(_form.Field, {
  "aria-required": true,
  name: "password",
  label: "Password",
  defaultValue: ""
  //isRequired
  ,
  validate: value => value && value.length < 8 ? 'TOO_SHORT' : undefined
}, ({
  fieldProps,
  error,
  valid,
  meta
}) => {
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_textfield.default, _extends({
    type: "password"
  }, fieldProps)), error && !valid && /*#__PURE__*/_react.default.createElement(_form.HelperMessage, null, "Use 8 or more characters with a mix of letters, numbers and symbols."), error && /*#__PURE__*/_react.default.createElement(_form.ErrorMessage, null, "Password needs to be more than 8 characters."), valid && meta.dirty ? /*#__PURE__*/_react.default.createElement(_form.ValidMessage, null, "Awesome password!") : null);
})), /*#__PURE__*/_react.default.createElement(_form.FormFooter, null, /*#__PURE__*/_react.default.createElement(_buttonGroup.default, null, /*#__PURE__*/_react.default.createElement(_standardButton.default, {
  appearance: "subtle"
}, "Cancel"), /*#__PURE__*/_react.default.createElement(_loadingButton.default, {
  type: "submit",
  appearance: "primary",
  isLoading: submitting
}, "Sign up"))))));
var _default = FormDefaultExample;
exports.default = _default;
},{}],"../src/features/issues/issueSlice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.issueSlice = exports.fetchIssues = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
//import axios from "axios";

const initialState = {
  loading: false,
  issues: [],
  error: ''
};
const fetchIssues = (0, _toolkit.createAsyncThunk)('issue/fetchIssues',
/*() => {
return axios
.get('/issues')
.then(res => {
res.issues.map(issue => {
const fields = issue.fields;
const creator = fields.creator;
return {
avatar: creator.avatarUrls,
name: creator.displayName,
summary: fields.summary,
status: fields.status.name,
updated: fields.updated,
}
}
)})
}*/
async () => {
  return await fetch('/issue', {
    method: "GET",
    'Accept': 'application/json'
  }).then(res => {
    return res.json();
  }).then(res => {
    return res.issues.map(issue => {
      const fields = issue.fields;
      const creator = fields.creator;
      return {
        avatar: creator.avatarUrls,
        name: creator.displayName,
        summary: fields.summary,
        status: fields.status.name,
        updated: fields.updated
      };
    });
  }).then(res => {
    //  console.log(res);
    return res;
  }).catch(err => console.error(err));
});
exports.fetchIssues = fetchIssues;
const issueSlice = (0, _toolkit.createSlice)({
  name: 'issue',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchIssues.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.loading = false;
      state.issues = action.payload;
      state.error = '';
    });
    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.loading = false;
      state.issues = [];
      state.error = action.error.message;
    });
  }
});
exports.issueSlice = issueSlice;
var _default = issueSlice.reducer;
exports.default = _default;
},{}],"App.jsx":[function(require,module,exports) {
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
var _formDefault = _interopRequireDefault(require("./formDefault"));
var _reactRedux = require("react-redux");
var _react = _interopRequireWildcard(require("react"));
var _issueSlice = require("../src/features/issues/issueSlice");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function App() {
  const [excitementLevel, setExcitementLevel] = _react.default.useState(0);
  const [arrOfIssues, setArrOfIssues] = (0, _react.useState)([]);
  const [arrOfProjects, setArrOfProjects] = (0, _react.useState)([]);
  const dispatch = (0, _reactRedux.useDispatch)();
  const issue = (0, _reactRedux.useSelector)(state => state.issue);
  (0, _react.useEffect)(() => {
    dispatch((0, _issueSlice.fetchIssues)());
  }, []);

  // useEffect(() => {
  //   async function fetchData(){
  //     const result = await fetch('/projects', {
  //       method: "GET",
  //       'Accept': 'application/json',
  //     })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => {
  //       setArrOfProjects(res.values);
  //     })
  //     .catch(err => console.error(err))

  //   }
  //   fetchData();
  // }, []);

  const pieceOfIssue = () => {
    return /*#__PURE__*/_react.default.createElement("div", null);
  };

  //testRows with Redux data
  const testRows = issue.issues.map((issue, index) => {
    return {
      key: `issue-row-${index}`,
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
          //onChange={}
          ,
          name: "checkbox-default",
          testId: "cb-default"
        })
      }, {
        key: 'issue-row-delete',
        content: /*#__PURE__*/_react.default.createElement(_standardButton.default, {
          appearance: "subtle",
          iconBefore: /*#__PURE__*/_react.default.createElement(_trash.default, {
            size: "small"
          })
          //onClick={}
        })
      }]
    };
  });

  const head = {
    cells: [{
      key: 'issue-summary',
      content: 'Summary'
    }, {
      key: 'issue-creator',
      content: 'Creator'
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
  const testRows2 = [{
    key: `issue-row-1`,
    cells: [{
      key: 'issue-row-creator',
      content: /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }
      }, /*#__PURE__*/_react.default.createElement("strong", null, "issue.fields.creator.displayName"))
    }, {
      key: 'issue-row-summary',
      content: 'issue.fields.summary'
    }, {
      key: 'issue-row-status',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_badge.default, null, "issue.fields.status.name"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("small", null, "issue.fields.updated"))
    }, {
      key: 'issue-row-checkbox',
      content: /*#__PURE__*/_react.default.createElement(_checkbox.Checkbox, {
        value: "default checkbox"
        //label="Default checkbox"
        //onChange={}
        ,
        name: "checkbox-default",
        testId: "cb-default"
      })
    }, {
      key: 'issue-row-delete',
      content: /*#__PURE__*/_react.default.createElement(_standardButton.default, {
        appearance: "subtle",
        iconBefore: /*#__PURE__*/_react.default.createElement(_trash.default, {
          size: "small"
        })
        //onClick={}
      })
    }]
  }];

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '24px',
      //width:'98%',
      //margin:'24px auto',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, "\xA0"), /*#__PURE__*/_react.default.createElement("div", null, "\xA0"), /*#__PURE__*/_react.default.createElement("h1", null, "TodoList Tasks"), /*#__PURE__*/_react.default.createElement("div", null, "\xA0"), /*#__PURE__*/_react.default.createElement("div", null, "\xA0"), /*#__PURE__*/_react.default.createElement(_dynamicTable.default, {
    head: head,
    rows: testRows,
    rowsPerPage: 5,
    defaultPage: 1,
    loadingSpinnerSize: "small",
    isLoading: issue.loading
  }));
}
},{"./formDefault":"formDefault.jsx","../src/features/issues/issueSlice":"../src/features/issues/issueSlice.js"}],"../src/app/store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _issueSlice = _interopRequireDefault(require("../features/issues/issueSlice"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const store = (0, _toolkit.configureStore)({
  reducer: {
    issue: _issueSlice.default
  }
});
var _default = store;
exports.default = _default;
},{"../features/issues/issueSlice":"../src/features/issues/issueSlice.js"}],"hello-world.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HelloWorld;
var _react = _interopRequireDefault(require("react"));
var _App = _interopRequireDefault(require("./App"));
var _store = _interopRequireDefault(require("../src/app/store"));
var _reactRedux = require("react-redux");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*import DynamicTable from '@atlaskit/dynamic-table';
import { Checkbox } from '@atlaskit/checkbox';
import Button from '@atlaskit/button/standard-button';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import Badge from '@atlaskit/badge';
import FormDefaultExample from './formDefault';

import React, { useState, useEffect } from 'react';

export default function HelloWorld() {
  const [excitementLevel, setExcitementLevel] = React.useState(0);
  const [arrOfIssues, setArrOfIssues] = useState([]);
  const [arrOfProjects, setArrOfProjects] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const result = await fetch('/issue', {
        method: "GET",
        'Accept': 'application/json',
      })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setArrOfIssues(res.issues);
      })
      .catch(err => console.error(err))
    
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData(){
  //     const result = await fetch('/projects', {
  //       method: "GET",
  //       'Accept': 'application/json',
  //     })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => {
  //       setArrOfProjects(res.values);
  //     })
  //     .catch(err => console.error(err))
    
  //   }
  //   fetchData();
  // }, []);

    const pieceOfIssue = () => {
      return(
        <div></div>
      );
    }

    const testRows = arrOfIssues.map((issue,index) => {
      return {
        key : `issue-row-${index}`,
        cells : [
          {
            key: 'issue-row-creator',
            content: (
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <img src={issue.fields.creator.avatarUrls['24x24']} style={{borderRadius:'50%'}}/>
                <strong>{issue.fields.creator.displayName}</strong>
              </div>
            )
          },
          {
            key: 'issue-row-summary',
            content: issue.fields.summary
          },
          {
            key: 'issue-row-status',
            content: (
            <>
              <Badge>{issue.fields.status.name}</Badge>
              <br/>
              <small>{issue.fields.updated}</small>
            </>
            )
          },
          {
            key: 'issue-row-checkbox',
            content: (
            <Checkbox
              value="default checkbox"
              //label="Default checkbox"
              //onChange={}
              name="checkbox-default"
              testId="cb-default"
            />
            )
          },
          {
            key: 'issue-row-delete',
            content: (
            <Button
              appearance="subtle"
              iconBefore={<TrashIcon size="small" />}
              //onClick={}
              ></Button>
              )
          }
        ]
      }
    });

    const head = {
      cells : [
        {
          key : 'issue-summary',
          content : 'Summary'
        },
        {
          key : 'issue-creator',
          content : 'Creator'
        },
        {
          key : 'issue-status',
          content : 'Status'
        },
        {
          key : 'issue-checkbox',
          content : "Checkbox",
          width : '1'
        },
        {
          key : 'issue-delete',
          content : 'Delete',
          width : '1'
        }
      ]
    };

    const testRows2 = [
      {
        key : `issue-row-1`,
        cells : [
          {
            key: 'issue-row-creator',
            content: (
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                
                <strong>issue.fields.creator.displayName</strong>
              </div>
            )
          },
          {
            key: 'issue-row-summary',
            content: 'issue.fields.summary'
          },
          {
            key: 'issue-row-status',
            content: (
            <>
              <Badge>issue.fields.status.name</Badge>
              <br/>
              <small>issue.fields.updated</small>
            </>
            )
          },
          {
            key: 'issue-row-checkbox',
            content: (
            <Checkbox
              value="default checkbox"
              //label="Default checkbox"
              //onChange={}
              name="checkbox-default"
              testId="cb-default"
            />
            )
          },
          {
            key: 'issue-row-delete',
            content: (
            <Button
              appearance="subtle"
              iconBefore={<TrashIcon size="small" />}
              //onClick={}
              ></Button>
              )
          }
        ]
      }
    ]
  

  return (
    <div style={{
      padding : '24px',
      //width:'98%',
      //margin:'24px auto',
      boxSizing : 'border-box'
      }}>

        <div>&nbsp;</div>

        {// <FormDefaultExample /> }

      <div>&nbsp;</div>
      <h1>TodoList Tasks</h1>
      <div>&nbsp;</div>

      

      <div>&nbsp;</div>

      <DynamicTable
        head={head}
        rows={testRows}
        rowsPerPage={5}
        defaultPage={1}
        loadingSpinnerSize="small"
        //isLoading
      />
    </div>)
}*/

function HelloWorld() {
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _store.default
  }, /*#__PURE__*/_react.default.createElement(_App.default, null));
}
},{"./App":"App.jsx","../src/app/store":"../src/app/store.js"}]},{},["hello-world.jsx"], null)
//# sourceMappingURL=/hello-world.js.map