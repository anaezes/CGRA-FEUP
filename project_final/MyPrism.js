/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
 	
 	this.slices = slices;
 	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	
 	var coord_x = 1;
 	var coord_y = 0;
 	var coord_z = 0;

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];

 	var ang = 0.0;
 	var ang_incr = 2 * Math.PI / this.slices;
 	var ang_aux;

 	var n_index = 4;
 	var aux = 0;

 	for(var j = 0; j < this.stacks; j++) 
 	{
 		for(var i = 0; i < this.slices; i++)
 		{
 			this.vertices.push(coord_x, coord_y, coord_z);
 			this.vertices.push(coord_x, coord_y, coord_z+1/this.stacks);

 			ang += ang_incr;

 			coord_x = Math.cos(ang);
 			coord_y = Math.sin(ang);

 			this.normals.push(Math.cos(ang-ang_incr/2), Math.sin(ang-ang_incr/2), 0);
 			this.normals.push(Math.cos(ang-ang_incr/2), Math.sin(ang-ang_incr/2), 0);
 			this.normals.push(Math.cos(ang-ang_incr/2), Math.sin(ang-ang_incr/2), 0);
 			this.normals.push(Math.cos(ang-ang_incr/2), Math.sin(ang-ang_incr/2), 0);

 			this.vertices.push(coord_x, coord_y, coord_z);
 			this.vertices.push(coord_x, coord_y, coord_z+1/this.stacks);

 			this.indices.push(aux+3, aux+1, aux);
 			this.indices.push(aux, aux+2, aux+3);

 			aux+=n_index;

 			ang_aux += ang_incr;
 		}

 		coord_x = 1;
 		coord_y = 0;
 		coord_z = coord_z + 1/this.stacks;
 		ang = 0;
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
