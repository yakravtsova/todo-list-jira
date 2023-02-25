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
},{}]},{},["formDefault.jsx"], null)
//# sourceMappingURL=/formDefault.js.map