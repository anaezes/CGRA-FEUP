/**
 * MyPolygon
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyPolygon(scene, nrSides, minS = 0, maxS = 1, minT = 0, maxT = 1){
	CGFobject.call(this,scene);
	
	this.nrSides = nrSides;
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;

	this.initBuffers();
};

MyPolygon.prototype = Object.create(CGFobject.prototype);
MyPolygon.prototype.constructor=MyPolygon;

MyPolygon.prototype.initBuffers = function () {
	var coord_x = 1;
 	var coord_y = 0;

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var ang = 0.0;
 	var ang_incr = 2 * Math.PI / this.nrSides;

 	var aux = 1;

    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 1);
    this.texCoords.push(this.maxS/2, this.maxT/2);


 	for(var i = 0; i < this.nrSides; i++)
 	{
 		this.vertices.push(coord_x, coord_y, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(this.maxS/2 + Math.cos(ang)/2, this.maxT/2 - Math.sin(ang)/2);

        if (i != 0){
            this.indices.push(0, aux - 1, aux);
        }

 		ang += ang_incr;

 		coord_x = Math.cos(ang);
 		coord_y = Math.sin(ang);

 		aux++;
 	}

 	this.indices.push(0, aux - 1, 1);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};