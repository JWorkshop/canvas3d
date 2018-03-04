"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _three = require("three");

var _canvas = require("@jworkshop/canvas");

var _canvas2 = _interopRequireDefault(_canvas);

var _animator = require("@jworkshop/animator");

var _animator2 = _interopRequireDefault(_animator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VIEW_ANGLE = 45;
var ASPECT = 1;
var NEAR = 0.1;
var FAR = 10000;

var checkWebGLAvailable = function checkWebGLAvailable() {
  try {
    var canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (error) {
    return false;
  }
};

var isWebGLAvailable = checkWebGLAvailable();

var Canvas3D = function (_Canvas) {
  _inherits(Canvas3D, _Canvas);

  function Canvas3D(props) {
    _classCallCheck(this, Canvas3D);

    var _this = _possibleConstructorReturn(this, (Canvas3D.__proto__ || Object.getPrototypeOf(Canvas3D)).call(this, props));

    _this.removeAnimation = null;
    _this.removePause = null;
    _this.removeResume = null;
    return _this;
  }

  _createClass(Canvas3D, [{
    key: "_updateDimensions",
    value: function _updateDimensions() {
      var renderer = this.renderer,
          wrapper = this.wrapper;
      var _props = this.props,
          scene = _props.scene,
          camera = _props.camera;
      var offsetWidth = wrapper.offsetWidth,
          offsetHeight = wrapper.offsetHeight;


      camera.aspect = offsetWidth / offsetHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(offsetWidth, offsetHeight);
      renderer.render(scene, camera);

      this._resize(offsetWidth, offsetHeight);

      this.setState({
        width: offsetWidth,
        height: offsetHeight
      });
    }

    /** Pause the animation. */

  }, {
    key: "start",
    value: function start() {
      this.props.animator.start();
    }

    /** Pause the animation. */

  }, {
    key: "pause",
    value: function pause() {
      this.props.animator.pause();
    }

    /** Pause the animation. */

  }, {
    key: "resume",
    value: function resume() {
      this.props.animator.resume();
    }

    /** Retrieve the 3D scene. */

  }, {
    key: "getScene",
    value: function getScene() {
      return this.props.scene;
    }

    /** Retrieve the main camera. */

  }, {
    key: "getCamera",
    value: function getCamera() {
      return this.props.camera;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this._mount();

      var _props2 = this.props,
          animator = _props2.animator,
          camera = _props2.camera,
          onPause = _props2.onPause,
          onResume = _props2.onResume;
      var _wrapper = this.wrapper,
          width = _wrapper.offsetWidth,
          height = _wrapper.offsetHeight;


      if (isWebGLAvailable) {
        this.renderer = new _three.WebGLRenderer({
          canvas: this.canvas,
          antialias: true
        });
      } else {
        this.renderer = new _three.CanvasRenderer({
          canvas: this.canvas
        });
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);

      this.removeAnimation = animator.add(function () {
        var renderer = _this2.renderer;
        var _props3 = _this2.props,
            scene = _props3.scene,
            camera = _props3.camera;


        renderer.render(scene, camera);
      });

      this.removePause = animator.onPause(onPause);
      this.removeResume = animator.onResume(onResume);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unmount();

      var removeAnimation = this.removeAnimation,
          removePause = this.removePause,
          removeResume = this.removeResume;


      if (removeAnimation) {
        removeAnimation();
      }

      if (removePause) {
        removePause();
      }

      if (removeResume) {
        removeResume();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props4 = this.props,
          className = _props4.className,
          style = _props4.style,
          canvasClassName = _props4.canvasClassName,
          canvasStyle = _props4.canvasStyle;
      var _state = this.state,
          width = _state.width,
          height = _state.height;


      return _react2.default.createElement(
        "div",
        {
          ref: function ref(wrapper) {
            return _this3.wrapper = wrapper;
          },
          className: (0, _classnames2.default)("canvas-container", className),
          style: style
        },
        _react2.default.createElement("canvas", {
          ref: function ref(canvas) {
            return _this3.canvas = canvas;
          },
          className: canvasClassName,
          style: canvasStyle,
          width: width,
          height: height
        })
      );
    }
  }]);

  return Canvas3D;
}(_canvas2.default);

Canvas3D.propTypes = {
  animator: _propTypes2.default.instanceOf(_animator2.default),
  scene: _propTypes2.default.instanceOf(_three.Scene),
  camera: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_three.PerspectiveCamera), _propTypes2.default.instanceOf(_three.OrthographicCamera)]),
  onPause: _propTypes2.default.func,
  onResume: _propTypes2.default.func
};

Canvas3D.defaultProps = {
  animator: new _animator2.default(),
  scene: new _three.Scene(),
  camera: new _three.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR),
  onPause: function onPause() {},
  onResume: function onResume() {}
};

exports.default = Canvas3D;