/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
              	    -0.5, -0.5, -0.5,
             	     0.5, -0.5, -0.5,
					-0.5, 0.5, -0.5,
					0.5, 0.5, -0.5,
					-0.5, -0.5, 0.5,
                	0.5, -0.5, 0.5,
					-0.5, 0.5, 0.5,
					0.5, 0.5, 0.5
					];

	this.indices = [
            0, 2, 1,
            3, 1, 2,
            4, 5, 6,
            7, 6, 5,
            6, 7, 2,
            7, 3, 2,
            3, 7, 5,
            3, 5, 1,
            6, 2, 0,
            4, 6, 0,
            0, 5, 4,
            5, 0, 1
        ];

    this.normals = [
      -1/3, -1/3, -1/3, 
      1/3, -1/3, -1/3,
      -1/3, 1/3, -1/3,
      1/3, 1/3, -1/3, 
      -1/3, -1/3, 1/3,
      1/3, -1/3, 1/3,
      -1/3, 1/3, 1/3,
      1/3,1/3,1/3
    ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
