/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {

	this.scene.pushMatrix();
	this.scene.metalicAppearence.apply();
	this.scene.translate(2.34,1.75,1.34);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.metalicAppearence.apply();
	this.scene.translate(-2.34,1.75,-1.34);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.metalicAppearence.apply();
	this.scene.translate(2.34,1.75,-1.34);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.metalicAppearence.apply();
	this.scene.translate(-2.34,1.75,1.34);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.tableAppearence.apply();
	this.scene.translate(0,3.5,0);
	this.scene.scale(5,0.3,3);
	this.cube.display();
	this.scene.popMatrix();
    
};
