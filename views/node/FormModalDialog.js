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
})({"../src/features/projects/projectSlice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectSlice = exports.fetchProjects = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
const initialState = {
  loading: false,
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
},{}],"FormModalDialog.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _standardButton = _interopRequireDefault(require("@atlaskit/button/standard-button"));
var _checkbox = require("@atlaskit/checkbox");
var _modalDialog = _interopRequireWildcard(require("@atlaskit/modal-dialog"));
var _select = _interopRequireWildcard(require("@atlaskit/select"));
var _textfield = _interopRequireDefault(require("@atlaskit/textfield"));
var _form = _interopRequireWildcard(require("@atlaskit/form"));
var _reactRedux = require("react-redux");
var _projectSlice = require("../src/features/projects/projectSlice");
const _excluded = ["id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const FormModalDialog = () => {
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const dispatch = (0, _reactRedux.useDispatch)();
  const project = (0, _reactRedux.useSelector)(state => state.project);
  (0, _react.useEffect)(() => {
    dispatch((0, _projectSlice.fetchProjects)());
  }, []);
  const onSubmit = e => {
    e.preventDefault();
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_standardButton.default, {
    appearance: "primary",
    onClick: open
  }, "Open modal"), /*#__PURE__*/_react.default.createElement(_modalDialog.ModalTransition, null, isOpen && /*#__PURE__*/_react.default.createElement(_modalDialog.default, {
    onClose: close
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: onSubmit
  }, /*#__PURE__*/_react.default.createElement(_modalDialog.ModalHeader, null, /*#__PURE__*/_react.default.createElement(_modalDialog.ModalTitle, null, "Create a user")), /*#__PURE__*/_react.default.createElement(_modalDialog.ModalBody, null, /*#__PURE__*/_react.default.createElement(_form.Field, {
    name: "icecream",
    label: "Select a flavor",
    defaultValue: []
  }, _ref => {
    let {
        fieldProps: {
          id
        },
        error
      } = _ref,
      rest = _objectWithoutProperties(_ref.fieldProps, _excluded);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_select.default, _extends({
      inputId: id
    }, rest, {
      options: project.projects
    })));
  })), /*#__PURE__*/_react.default.createElement(_modalDialog.ModalFooter, null, /*#__PURE__*/_react.default.createElement(_standardButton.default, {
    appearance: "subtle",
    onClick: close
  }, "Close"), /*#__PURE__*/_react.default.createElement(_standardButton.default, {
    appearance: "primary",
    type: "submit"
  }, "Create"))))));
};
var _default = FormModalDialog;
exports.default = _default;
},{"../src/features/projects/projectSlice":"../src/features/projects/projectSlice.js"}]},{},["FormModalDialog.jsx"], null)
//# sourceMappingURL=/FormModalDialog.js.map