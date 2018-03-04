# canvas3d

A canvas react UI component integrated with 3d rendering features.
It is an extension of [canvas](https://nodei.co/npm/@jworkshop/canvas),
integrated with [three.js library](https://nodei.co/npm/three).

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/@jworkshop/canvas3d.svg
[npm-url]: http://npmjs.org/package/@jworkshop/canvas3d
[travis-image]: https://img.shields.io/travis/JWorkshop/canvas3d.svg
[travis-url]: https://travis-ci.org/JWorkshop/canvas3d
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/@jworkshop/canvas3d.svg
[download-url]: https://npmjs.org/package/@jworkshop/canvas3d

## install

[![NPM](https://nodei.co/npm/@jworkshop/canvas3d.png)](https://nodei.co/npm/@jworkshop/canvas3d)

## Usage

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

import Canvas3D from "@jworkshop/canvas3d";

import "./style.css";

class Example extends Component {
  constructor(props) {
    super(props);

    this.resizeHandler = this.resizeHandler.bind(this);
  }

  someFunction() {
    const canvas = this.myCanvas;

    /** Retrieve the canvas react component. */
    canvas.getCanvasElement();

    /** Get the width of the canvas react component. */
    canvas.getCanvasWidth();

    /** Get the width of the canvas react component. */
    canvas.getCanvasHeight();

    /** Get the context of the canvas. */
    canvas.getContext();

    /** Pause the animation. */
    canvas.start();

    /** Pause the animation. */
    canvas.pause();

    /** Pause the animation. */
    canvas.resume();

    /** Retrieve the 3D scene. */
    canvas.getScene();

    /** Retrieve the main camera. */
    canvas.getCamera();


    /** Example */
    const scene = canvas.getScene();

    const RADIUS = 50;
    const SEGMENTS = 16;
    const RINGS = 16;

    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xcc0000
    });

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),
      sphereMaterial
    );

    // Move the Sphere back in Z so we can see it.
    sphere.position.z = -300;

    // Finally, add the sphere to the scene.
    scene.add(sphere);

    const pointLight = new THREE.PointLight(0xffffff);

    // set its position
    pointLight.position.x = 0;
    pointLight.position.y = -150;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);

    myCanvas.start();
  }

  resizeHandler(width, height) {
    // Do you stuff
  }

  render() {
    const { scene, camera } = this. props;

    return (
      <Canvas3D
        scene={scene}
        camera={camera}
        ref={myCanvas => this.myCanvas = myCanvas}
        className="className"
        style={ ... }
        canvasClassName="canvasClassName"
        canvasStyle={ ... }
        onResize={this.resizeHandler}
      />
    );
  }
}

ReactDOM.render(<Test />, document.getElementById("root"));
```
