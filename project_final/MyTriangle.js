/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene) {
  CGFobject.call(this,scene);

  this.initBuffers();
}

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function () {
  
  this.vertices = [
                    0, 0, 0, //0
                    0, 0, 1, // 1
                    0, 1, 0, // 2
                    0, 1, 1, // 3
                    1, 0, 1, // 4
                    1, 0, 0  // 5
          ];

  this.indices = [
            1, 2, 0,
            1, 3, 2,
            1, 4, 3,
            0, 2, 5,
            4, 5, 2,
            4, 2, 3,
            4, 1, 5,
            5, 1, 0
        ];

// soma das normais de cada face a que esse ponto 
// pertence a dividir pelo nº de faces

  this.normals = [
      -1/3, -1/3, -1/3, //0
      -1/3, 1/3, -1/3, //1
      0, 1/3, -1/3, //2
      1/3, 1/3, 0, //3
      1/3, 0, 1/3,//4
      1/3, 0, -1/3//5
    ];
  
  this.primitiveType=this.scene.gl.TRIANGLES;
  this.initGLBuffers();

};