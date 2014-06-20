"use strict"

var triangle     = require('a-big-triangle')
var fit          = require('canvas-fit')
var getContext   = require('gl-context')
var createShader = require('glslify')
var unpackFloat  = require("../index.js")

var canvas     = container.appendChild(document.createElement('canvas'))
var gl         = getContext(canvas, render)

window.addEventListener('resize', fit(canvas), false)

var shader = glslify({
  vert: "\
attribute vec2 position;\
void main() {\
  gl_Position = vec4(position, 0, 1);\
}",
  frag: "\
uniform highp float f;\
#pragma glslify: packFloat = require(../index.glsl)\
void main() {\
  gl_FragColor = packFloat(f);\
}"})(gl)

function render() {
  var num = Math.random()

  //Draw shader
  shader.bind()
  shader.uniforms.f = num
  triangle(gl)

  //Read back the float
  var buffer = new Uint8Array(4)
  gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buffer)

  //Log output to console
  console.log("expected:", num, "got:", )
}