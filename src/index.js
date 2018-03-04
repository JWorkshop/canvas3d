import React from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import {
  Scene,
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer,
  CanvasRenderer
} from "three";

import Canvas from "@jworkshop/canvas";
import Animator from "@jworkshop/animator";

const VIEW_ANGLE = 45;
const ASPECT = 1;
const NEAR = 0.1;
const FAR = 10000;

const checkWebGLAvailable = () => {
  try {
    var canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (error) {
    return false;
  }
};

const isWebGLAvailable = checkWebGLAvailable();

class Canvas3D extends Canvas {
  constructor(props) {
    super(props);

    this.removeAnimation = null;
    this.removePause = null;
    this.removeResume = null;
  }

  _updateDimensions() {
    const { renderer, wrapper } = this;
    const { scene, camera } = this.props;
    const { offsetWidth, offsetHeight } = wrapper;

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
  start() {
    this.props.animator.start();
  }

  /** Pause the animation. */
  pause() {
    this.props.animator.pause();
  }

  /** Pause the animation. */
  resume() {
    this.props.animator.resume();
  }

  /** Retrieve the 3D scene. */
  getScene() {
    return this.props.scene;
  }

  /** Retrieve the main camera. */
  getCamera() {
    return this.props.camera;
  }

  componentDidMount() {
    this._mount();

    const { animator, camera, onPause, onResume } = this.props;
    const { offsetWidth: width, offsetHeight: height } = this.wrapper;

    if (isWebGLAvailable) {
      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
        antialias: true
      });
    } else {
      this.renderer = new CanvasRenderer({
        canvas: this.canvas
      });
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

    this.removeAnimation = animator.add(() => {
      const { renderer } = this;
      const { scene, camera } = this.props;

      renderer.render(scene, camera);
    });

    this.removePause = animator.onPause(onPause);
    this.removeResume = animator.onResume(onResume);
  }

  componentWillUnmount() {
    this._unmount();

    const { removeAnimation, removePause, removeResume } = this;

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

  render() {
    const { className, style, canvasClassName, canvasStyle } = this.props;
    const { width, height } = this.state;

    return (
      <div
        ref={wrapper => (this.wrapper = wrapper)}
        className={ClassNames("canvas-container", className)}
        style={style}
      >
        <canvas
          ref={canvas => (this.canvas = canvas)}
          className={canvasClassName}
          style={canvasStyle}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

Canvas3D.propTypes = {
  animator: PropTypes.instanceOf(Animator),
  scene: PropTypes.instanceOf(Scene),
  camera: PropTypes.oneOfType([
    PropTypes.instanceOf(PerspectiveCamera),
    PropTypes.instanceOf(OrthographicCamera)
  ]),
  onPause: PropTypes.func,
  onResume: PropTypes.func
};

Canvas3D.defaultProps = {
  animator: new Animator(),
  scene: new Scene(),
  camera: new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR),
  onPause: () => {},
  onResume: () => {}
};

export default Canvas3D;
