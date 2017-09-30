/**
 * MyPeriscope
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPeriscope(scene){
	CGFobject.call(this,scene);

	var stacks = 50;
	var slices = 75;

	this.cylinder = new MyCilinder(this.scene, stacks, slices);
	this.cover = new MyPolygon(this.scene, slices);
	this.sphere = new MyLamp(this.scene, stacks, slices);

	this.initBuffers();
};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor=MyQuad;

MyPeriscope.prototype.display = function() {

	this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.scale(0.04, 0.04, 0.7);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0.67, -0.035);
		this.scene.scale(0.06, 0.06, 0.125);
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0.67, 0.090);
	 	this.scene.scale(0.06, 0.06, 0.01);
	 	this.scene.lensAppearence.apply();
	   	this.sphere.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0.67, -0.035);
		this.scene.rotate(-180 * degToRad, 1, 0, 0);
	 	this.scene.scale(0.06, 0.06, 0.01);
	 	this.scene.submarineAppearences[this.scene.submarineAppearenceList[this.scene.currSubmarineAppearence]].apply();
	   	this.sphere.display();
	this.scene.popMatrix();
}