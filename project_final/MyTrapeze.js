/**
 * MyTrapeze
 * @constructor
 */
function MyTrapeze(scene, alturaMax, alturaMin, largura, espessura, minS = 0, maxS = 1, minT = 0, maxT= 1) {
  CGFobject.call(this,scene);

  this.cube = new MyUnitCube(this.scene);
this.triangle = new MyTriangle(this.scene, 3, 1);

  this.alturaMin = alturaMin;
  this.alturaMax = alturaMax;
  this.largura = largura;
  this.espessura = espessura;

  this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;

  this.initBuffers();
}

MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor = MyTrapeze;

MyTrapeze.prototype.initBuffers = function () {
  
  this.vertices = [
                    -this.alturaMax/2, this.largura/2, -this.espessura/2, //0
                    -this.alturaMax/2, -this.largura/2, -this.espessura/2, // 1
                    -this.alturaMin/2, -this.largura/2, this.espessura/2, // 2
                    -this.alturaMin/2, this.largura/2, this.espessura/2, // 3

                    this.alturaMin/2, -this.largura/2, this.espessura/2, // 4
                    this.alturaMin/2, this.largura/2, this.espessura/2, // 5
                    this.alturaMax/2, -this.largura/2, -this.espessura/2, //6
                    this.alturaMax/2, this.largura/2, -this.espessura/2 //7
          ];

  this.indices = [
            2, 0, 1,
            2, 3, 0,
            3, 2, 4,
            4, 5, 3,
            7, 5, 4,
            4, 6, 7,
            0, 3, 5,
            5, 7, 0,
            1, 0, 7,
            1, 7, 6,
            4, 2, 1,
            6, 4, 1
        ];

// soma das normais de cada face a que esse ponto 
// pertence a dividir pelo nº de faces

  this.normals = [
      -1/Math.sqrt(2), 1, (-1+1/Math.sqrt(2)), //0
      -1/Math.sqrt(2), -1, (-1+1/Math.sqrt(2)), //1
      -1/Math.sqrt(2), -1, (1+1/Math.sqrt(2)), //2
      -1/Math.sqrt(2), 1, (1+1/Math.sqrt(2)), //3

      1/Math.sqrt(2), -1, (1+1/Math.sqrt(2)), //4
      1/Math.sqrt(2), 1, (1+1/Math.sqrt(2)), //5
      1/Math.sqrt(2), -1, (-1+1/Math.sqrt(2)), //6
      1/Math.sqrt(2), 1, (-1+1/Math.sqrt(2)) //7
    ];

   this.texCoords = [
   	this.minS, this.minT,
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.maxS, this.minT,
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.maxS, this.maxT,
    this.maxS, this.minT
  ];
  
  this.primitiveType=this.scene.gl.TRIANGLES;
  this.initGLBuffers();

};