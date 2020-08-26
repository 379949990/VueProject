"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Footer = _interopRequireDefault(require("../components/Footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'home',
  components: {
    "default": function _default() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/home/index.vue'));
      });
    },
    footer: _Footer["default"]
  }
}, {
  path: '/kind',
  name: 'kind',
  components: {
    "default": function _default() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/kind/index.vue'));
      });
    },
    footer: _Footer["default"]
  }
}, {
  path: '/cart',
  name: 'cart',
  components: {
    "default": function _default() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/cart/index.vue'));
      });
    },
    footer: _Footer["default"]
  }
}, {
  path: '/user',
  name: 'user',
  components: {
    "default": function _default() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/user/index.vue'));
      });
    },
    footer: _Footer["default"]
  }
}, {
  path: '/detail/:proid',
  name: 'detail',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/detail/index.vue'));
    });
  }
}, {
  path: '/register',
  name: 'register',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/register/index.vue'));
    });
  }
}, {
  path: '/sms',
  name: 'sms',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/register/sms.vue'));
    });
  }
}, {
  path: '/setpwd',
  name: 'setpwd',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/register/setpwd.vue'));
    });
  }
}, {
  path: '/login',
  name: 'login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/login/index.vue'));
    });
  }
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default2 = router;
exports["default"] = _default2;