(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else if(typeof define === 'function' && define.amd)
		define(["CoreHome", , "CorePluginsAdmin"], factory);
	else if(typeof exports === 'object')
		exports["LogViewer"] = factory(require("CoreHome"), require("vue"), require("CorePluginsAdmin"));
	else
		root["LogViewer"] = factory(root["CoreHome"], root["Vue"], root["CorePluginsAdmin"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__19dc__, __WEBPACK_EXTERNAL_MODULE__8bbf__, __WEBPACK_EXTERNAL_MODULE_a5a2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "plugins/LogViewer/vue/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "19dc":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__19dc__;

/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "a5a2":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_a5a2__;

/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "LogViewer", function() { return /* reexport */ LogViewer; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external "CoreHome"
var external_CoreHome_ = __webpack_require__("19dc");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-babel/node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/@vue/cli-plugin-babel/node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/LogViewer/vue/src/LogViewer/LogViewer.vue?vue&type=template&id=f03f9e24

var _hoisted_1 = {
  class: "logViewer"
};
var _hoisted_2 = {
  class: "row"
};
var _hoisted_3 = {
  class: "logWriters col s4 m3 l2"
};
var _hoisted_4 = {
  class: "severities col s4 m3 l2"
};
var _hoisted_5 = {
  class: "col s12 m12 l8"
};
var _hoisted_6 = ["title", "placeholder"];
var _hoisted_7 = ["title"];
var _hoisted_8 = {
  class: "useRegExp",
  style: {
    "margin-right": "3.5px"
  }
};
var _hoisted_9 = ["action"];
var _hoisted_10 = ["value"];

var _hoisted_11 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
  type: "hidden",
  name: "force_api_session",
  value: "1",
  style: {
    "margin-right": "3.5px"
  }
}, null, -1);

var _hoisted_12 = ["title"];
var _hoisted_13 = ["title"];

var _hoisted_14 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);

var _hoisted_15 = {
  class: "severity"
};
var _hoisted_16 = {
  class: "tag"
};
var _hoisted_17 = {
  class: "date"
};
var _hoisted_18 = {
  class: "date"
};
var _hoisted_19 = {
  class: "message"
};
var _hoisted_20 = ["title", "onClick"];
var _hoisted_21 = ["title", "onClick"];
var _hoisted_22 = ["title", "onClick"];
var _hoisted_23 = ["title", "onClick"];
var _hoisted_24 = {
  class: "message"
};
var _hoisted_25 = {
  key: 0
};
var _hoisted_26 = {
  colspan: "5"
};
var _hoisted_27 = {
  colspan: "5"
};
var _hoisted_28 = {
  class: "loadingPiwik"
};

var _hoisted_29 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
  src: "plugins/Morpheus/images/loading-blue.gif"
}, null, -1);

var _hoisted_30 = {
  colspan: "5",
  class: "paging"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Field = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("Field");

  var _component_ContentBlock = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContentBlock");

  var _directive_content_table = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("content-table");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_ContentBlock, {
    "content-title": _ctx.translate('LogViewer_LogViewer')
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      var _ctx$logs, _ctx$logs2;

      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "select",
        name: "logWriter",
        "model-value": _ctx.selectedLogWriter,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
          _ctx.selectedLogWriter = $event;

          _ctx.update();
        }),
        "full-width": true,
        options: _ctx.logWriters
      }, null, 8, ["model-value", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "select",
        name: "selectedSeverity",
        "model-value": _ctx.selectedSeverity,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          _ctx.selectedSeverity = $event;

          _ctx.update();
        }),
        "full-width": true,
        options: _ctx.severities
      }, null, 8, ["model-value", "options"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
        type: "text",
        class: "search",
        onKeydown: _cache[2] || (_cache[2] = function ($event) {
          return _ctx.onSearchKeydown($event);
        }),
        title: _ctx.translate('LogViewer_SearchHelp'),
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return _ctx.query = $event;
        }),
        placeholder: _ctx.translate('LogViewer_SearchPattern'),
        style: {
          "margin-right": "3.5px"
        }
      }, null, 40, _hoisted_6), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.query]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        class: "icon-search searchIcon",
        title: _ctx.translate('General_ClickToSearch'),
        onClick: _cache[4] || (_cache[4] = function ($event) {
          return _ctx.update();
        })
      }, null, 8, _hoisted_7), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_Field, {
        uicontrol: "checkbox",
        title: _ctx.translate('LogViewer_UseRegExp'),
        modelValue: _ctx.useRegExp,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
          return _ctx.useRegExp = $event;
        })
      }, null, 8, ["title", "modelValue"])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "icon-reload",
        onClick: _cache[6] || (_cache[6] = function ($event) {
          return _ctx.update();
        }),
        style: {
          "margin-right": "3.5px"
        }
      }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("form", {
        method: "POST",
        id: "export",
        ref: "export",
        target: "_blank",
        action: _ctx.exportFormAction
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
        type: "hidden",
        name: "token_auth",
        value: _ctx.tokenAuth
      }, null, 8, _hoisted_10), _hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "icon-export",
        onClick: _cache[7] || (_cache[7] = function ($event) {
          return _ctx.$refs.export.submit();
        }),
        title: _ctx.translate('LogViewer_ExportThisSearch', 'TSV', 5000),
        style: {
          "margin-right": "3.5px"
        }
      }, null, 8, _hoisted_12)], 8, _hoisted_9), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "icon-info",
        target: "_blank",
        href: "https://piwik.org/faq/troubleshooting/faq_115/",
        rel: "noreferrer noopener",
        title: _ctx.translate('LogViewer_CurrentLogConfigIs', _ctx.logConfigJson)
      }, null, 8, _hoisted_13), _hoisted_14]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("table", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("thead", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", _hoisted_15, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('LogViewer_Severity')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", _hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('LogViewer_Tag')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", _hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Date')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", _hoisted_18, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('LogViewer_RequestId')), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("th", _hoisted_19, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('LogViewer_Message')), 1)])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tbody", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.logsWithMessage, function (log, index) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", {
          key: index
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["severity", {
            selectable: log.severity
          }]),
          title: log.severity ? _ctx.translate('LogViewer_ClickToSearchForThis') : '',
          onClick: function onClick($event) {
            return _ctx.searchSeverity(log.severity);
          }
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(log.severity || '-'), 11, _hoisted_20), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["tag", {
            selectable: log.tag
          }]),
          title: log.tag ? _ctx.translate('LogViewer_ClickToSearchForThis') : '',
          onClick: function onClick($event) {
            return _ctx.searchText(log.tag);
          }
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(log.tag || '-'), 11, _hoisted_21), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["date", {
            selectable: log.datetime
          }]),
          title: log.datetime ? _ctx.translate('LogViewer_ClickToSearchForThis') : '',
          onClick: function onClick($event) {
            return _ctx.searchDate(log.datetime);
          }
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(log.datetime || '-'), 11, _hoisted_22), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", {
          class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["requestId", {
            selectable: log.requestId
          }]),
          title: log.requestId ? _ctx.translate('LogViewer_ClickToSearchForThis') : '',
          onClick: function onClick($event) {
            return _ctx.searchRequestId(log.requestId);
          }
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(log.requestId || '-'), 11, _hoisted_23), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(log.message), 1)]);
      }), 128)), !_ctx.isLoading && ((_ctx$logs = _ctx.logs) === null || _ctx$logs === void 0 ? void 0 : _ctx$logs.length) === 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("tr", _hoisted_25, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_26, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_SearchNoResults')), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_27, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_28, [_hoisted_29, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Loading')), 1)])])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isLoading]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("tr", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("td", _hoisted_30, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        id: "prev",
        class: "previous",
        onClick: _cache[9] || (_cache[9] = function ($event) {
          return _ctx.previousPage();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn",
        onClick: _cache[8] || (_cache[8] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function () {}, ["prevent"]))
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, "« " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Previous')), 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !(_ctx.page < 1)]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
        id: "next",
        class: "next pointer",
        onClick: _cache[11] || (_cache[11] = function ($event) {
          return _ctx.nextPage();
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("a", {
        class: "btn",
        onClick: _cache[10] || (_cache[10] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function () {}, ["prevent"]))
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.translate('General_Next')) + " »", 1)])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !(((_ctx$logs2 = _ctx.logs) === null || _ctx$logs2 === void 0 ? void 0 : _ctx$logs2.length) < 1)]])])])])], 512), [[_directive_content_table]])])];
    }),
    _: 1
  }, 8, ["content-title"])]);
}
// CONCATENATED MODULE: ./plugins/LogViewer/vue/src/LogViewer/LogViewer.vue?vue&type=template&id=f03f9e24

// EXTERNAL MODULE: external "CorePluginsAdmin"
var external_CorePluginsAdmin_ = __webpack_require__("a5a2");

// CONCATENATED MODULE: ./node_modules/@vue/cli-plugin-typescript/node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/@vue/cli-plugin-typescript/node_modules/ts-loader??ref--14-2!./node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/@vue/cli-service/node_modules/vue-loader-v16/dist??ref--0-1!./plugins/LogViewer/vue/src/LogViewer/LogViewer.vue?vue&type=script&lang=ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/* harmony default export */ var LogViewervue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  props: {
    limit: {
      type: Number,
      required: true
    }
  },
  components: {
    ContentBlock: external_CoreHome_["ContentBlock"],
    Field: external_CorePluginsAdmin_["Field"]
  },
  directives: {
    ContentTable: external_CoreHome_["ContentTable"]
  },
  data: function data() {
    return {
      page: 0,
      query: '',
      isLoading: true,
      logWriters: [],
      selectedLogWriter: '',
      useRegExp: false,
      severities: [{
        key: '',
        value: Object(external_CoreHome_["translate"])('LogViewer_AnySeverity')
      }, {
        key: 'DEBUG',
        value: 'DEBUG'
      }, {
        key: 'INFO',
        value: 'INFO'
      }, {
        key: 'NOTICE',
        value: 'NOTICE'
      }, {
        key: 'WARNING',
        value: 'WARNING'
      }, {
        key: 'ERROR',
        value: 'ERROR'
      }, {
        key: 'CRITICAL',
        value: 'CRITICAL'
      }, {
        key: 'ALERT',
        value: 'ALERT'
      }, {
        key: 'EMERGENCY',
        value: 'EMERGENCY'
      }],
      selectedSeverity: '',
      logs: undefined,
      logConfig: undefined
    };
  },
  setup: function setup() {
    var fetchLogEntriesAbort = null;

    var getLogEntries = function getLogEntries(params) {
      if (fetchLogEntriesAbort) {
        fetchLogEntriesAbort.abort();
        fetchLogEntriesAbort = null;
      }

      fetchLogEntriesAbort = new AbortController();
      return external_CoreHome_["AjaxHelper"].fetch(Object.assign(Object.assign({}, params), {}, {
        method: 'LogViewer.getLogEntries'
      }), {
        abortController: fetchLogEntriesAbort,
        createErrorNotification: false
      }).finally(function () {
        fetchLogEntriesAbort = null;
      });
    };

    return {
      getLogEntries: getLogEntries
    };
  },
  created: function created() {
    var _this = this;

    external_CoreHome_["AjaxHelper"].fetch({
      method: 'LogViewer.getAvailableLogReaders'
    }).then(function (logWriters) {
      if (Array.isArray(logWriters)) {
        _this.logWriters = logWriters.map(function (logWriter) {
          return {
            key: logWriter,
            value: logWriter
          };
        });
      }
    }).then(function () {
      return external_CoreHome_["AjaxHelper"].fetch({
        method: 'LogViewer.getConfiguredLogReaders'
      });
    }).then(function (logWriters) {
      if (logWriters !== null && logWriters !== void 0 && logWriters[0]) {
        var _logWriters = _slicedToArray(logWriters, 1);

        _this.selectedLogWriter = _logWriters[0];
      } else {
        var _this$logWriters;

        var title = Object(external_CoreHome_["translate"])('LogViewer_NoSupportedLogWriterConfiguredTitle');
        var message = Object(external_CoreHome_["translate"])('LogViewer_NoSupportedLogWriterConfiguredMessage', ['<a href="https://piwik.org/faq/troubleshooting/faq_115/">', '</a>', _this.logWriters.map(function (item) {
          return item.value;
        }).join(', ')]);
        external_CoreHome_["NotificationsStore"].show({
          message: message,
          title: title,
          context: 'info',
          noclear: true,
          type: 'transient'
        });

        if ((_this$logWriters = _this.logWriters) !== null && _this$logWriters !== void 0 && _this$logWriters[0]) {
          _this.selectedLogWriter = _this.logWriters[0].value;
        }
      }

      if (_this.selectedLogWriter) {
        _this.update();
      } else {
        _this.isLoading = false;
      }
    });
    external_CoreHome_["AjaxHelper"].fetch({
      method: 'LogViewer.getLogConfig',
      filter_limit: '-1'
    }).then(function (config) {
      _this.logConfig = config;
    });
  },
  methods: {
    update: function update() {
      var _this2 = this;

      this.isLoading = true;
      this.logs = [];
      this.getLogEntries({
        query: this.buildQuery,
        limitPerPage: this.limit,
        source: this.selectedLogWriter,
        page: this.page
      }).catch(function (error) {
        external_CoreHome_["NotificationsStore"].show({
          message: error.message || error,
          context: 'error',
          type: 'transient'
        });
        return [];
      }).then(function (logs) {
        _this2.logs = logs;
      }).finally(function () {
        _this2.isLoading = false;
      });
    },
    searchSeverity: function searchSeverity(severity) {
      if (!severity) {
        return;
      }

      this.selectedSeverity = severity.toUpperCase();
      this.update();
    },
    searchDate: function searchDate(datetime) {
      if (!datetime) {
        return;
      }

      this.selectedSeverity = '';
      this.query = "\\[".concat(datetime.substr(0, 10), ".{9}\\]");
      this.useRegExp = true;
      this.update();
    },
    searchRequestId: function searchRequestId(requestId) {
      if (!requestId) {
        return;
      }

      this.searchText("[".concat(requestId, "]"));
    },
    searchText: function searchText(text) {
      if (!text) {
        return;
      }

      this.selectedSeverity = '';
      this.query = text;

      if (this.useRegExp) {
        this.query = window.preg_quote(this.query);
      }

      this.update();
    },
    previousPage: function previousPage() {
      if (this.page > 0) {
        this.page -= 1;
        this.update();
      }
    },
    nextPage: function nextPage() {
      var _this$logs;

      if ((_this$logs = this.logs) !== null && _this$logs !== void 0 && _this$logs.length) {
        this.page += 1;
        this.update();
      }
    },
    onSearchKeydown: function onSearchKeydown(event) {
      if (event.code !== 'Enter') {
        return;
      }

      this.update();
    }
  },
  computed: {
    buildQuery: function buildQuery() {
      var query = this.query;

      if (!this.useRegExp) {
        query = window.preg_quote(this.query);
      }

      if (this.selectedSeverity) {
        query = "^".concat(this.selectedSeverity, "(.*)").concat(query);
      }

      return query;
    },
    exportFormAction: function exportFormAction() {
      return "?".concat(external_CoreHome_["MatomoUrl"].stringify({
        module: 'API',
        method: 'LogViewer.getLogEntries',
        query: this.buildQuery,
        format: 'TSV',
        page: 0,
        limitPerPage: 5000
      }));
    },
    logConfigJson: function logConfigJson() {
      return JSON.stringify(this.logConfig || {});
    },
    tokenAuth: function tokenAuth() {
      return external_CoreHome_["Matomo"].token_auth;
    },
    logsWithMessage: function logsWithMessage() {
      return (this.logs || []).filter(function (l) {
        return l.message;
      });
    }
  }
}));
// CONCATENATED MODULE: ./plugins/LogViewer/vue/src/LogViewer/LogViewer.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./plugins/LogViewer/vue/src/LogViewer/LogViewer.vue



LogViewervue_type_script_lang_ts.render = render

/* harmony default export */ var LogViewer = (LogViewervue_type_script_lang_ts);
// CONCATENATED MODULE: ./plugins/LogViewer/vue/src/LogViewer/LogViewer.adapter.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


/* harmony default export */ var LogViewer_adapter = (Object(external_CoreHome_["createAngularJsAdapter"])({
  component: LogViewer,
  scope: {
    limit: {
      angularJsBind: '='
    }
  },
  directiveName: 'piwikLogViewer'
}));
// CONCATENATED MODULE: ./plugins/LogViewer/vue/src/index.ts
/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ })

/******/ });
});
//# sourceMappingURL=LogViewer.umd.js.map