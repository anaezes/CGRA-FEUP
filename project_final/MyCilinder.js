/**
 * MyCilinder
 * @constructor
 */
var cos60 = 0.5;
var sen60 = 0.866025404;
var sen30 = 0.5;
var cos30 = 0.866025404;

function MyCilinder(scene, slices, stacks, minS = 0, maxS = 1, minT = 0, maxT= 1) {
  CGFobject.call(this,scene);

  this.slices = slices;
  this.stacks = stacks;

  this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;

  x_Coord_inc = (this.maxS - this.minS)/this.slices;
  y_Coord_inc = (this.maxT - this.minT)/this.stacks;



  this.initBuffers();
}

MyCilinder.prototype = Object.create(CGFobject.prototype);
MyCilinder.prototype.constructor = MyCilinder;

MyCilinder.prototype.initBuffers = function() {
  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];

  var index = 0;
  var ang = 0.0;
  var ang_incr = 2 * Math.PI / this.slices;
  var tex_x_incr = (this.maxS - this.minS)/this.stacks;
  var tex_y_incr = (this.maxT - this.minT)/this.slices;
  var index_incr = this.stacks+1;
  var height_incr = 1/this.stacks;

//ponto inicial
  var coord_x = 1; //coordenada x
  var coord_y = 0; //coordenada y
  var height = 0; //coordenada z

  var x_Coord = this.minS;
  var y_Coord = this.maxT;

  for(var i = 0; i <= this.slices; i++){
    for(var j = 0; j <= this.stacks; j++){

      coord_x = Math.cos(i*ang_incr);
      coord_y = Math.sin(i*ang_incr);
      height = j*height_incr;


      this.vertices.push(coord_x, coord_y, height);
 	  this.normals.push(coord_x, coord_y, 0);
 	  this.texCoords.push(x_Coord, y_Coord);

      if(i !== 0 && j !== 0) {
        this.indices.push(index,index-index_incr-1,index-1);
        this.indices.push(index,index-index_incr,index-index_incr-1);
      }

      index++;
      y_Coord -= (this.maxT - this.minT)/this.stacks;

    }
    x_Coord += (this.maxS - this.minS)/this.slices;
    y_Coord = this.maxT;
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};