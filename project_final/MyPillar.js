/**
 * MyPillar
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPillar(scene) {
	CGFobject.call(this,scene);

	this.cilinder = new MyCilinder(this.scene, 8, 20);
	this.tampo = new MyPolygon(this.scene, 8);

	this.tampo.initBuffers();
	this.cilinder.initBuffers();
};

MyPillar.prototype = Object.create(CGFobject.prototype);
MyPillar.prototype.constructor=MyPillar;

MyPillar.prototype.display = function () {

	this.scene.pushMatrix();
	   this.scene.scale(0.75, 8.5, 0.75);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.pilarAppearance.apply();
	   this.cilinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0, 8.5, 0);
	this.scene.scale(0.75, 1, 0.75);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.pilarAppearance.apply();
	   this.tampo.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.scale(0.75, 1, 0.75);
	this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.pilarAppearance.apply();
	   this.tampo.display();
	this.scene.popMatrix();
};
