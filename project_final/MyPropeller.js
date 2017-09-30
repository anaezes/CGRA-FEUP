/**
 * MyPropeller
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPropeller(scene, direction){
	CGFobject.call(this,scene);

	this.currTime = 0;

	this.direction = direction;

	var stacks = 50;
	var slices = 75;

	this.heliceMinSpeed = 0;
	this.heliceSpeed = 0;

	this.helicePosition = 0;

	this.sphere = new MyLamp(this.scene, stacks, slices);
	this.helice = new MyUnitCubeQuad(this.scene);
	this.doubleCilinder = new MyDoubleCilinder(this.scene, stacks, slices);

	this.initBuffers();
};

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor=MyQuad;

MyPropeller.prototype.display = function() {
	if (this.scene.submarine.speed > 0.00001)
		this.helicePosition -= this.heliceMinSpeed + this.heliceSpeed;
	else{
		this.helicePosition += this.heliceMinSpeed + this.heliceSpeed;
	}


	this.scene.pushMatrix();
		this.scene.scale(0.2, 0.2, 0.2);
		this.doubleCilinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.1);
		this.scene.rotate(this.direction * this.helicePosition * degToRad, 0, 0, 1);
		this.scene.scale(0.38, 0.1, 0.025);
		this.helice.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.1);
		this.scene.scale(0.05, 0.05, 0.05);
		this.sphere.display();
	this.scene.popMatrix();
}

MyPropeller.prototype.heliceRotate = function(angle){
	if (angle => 0){
		this.heliceSpeed += angle;
		if (this.heliceSpeed < 0)
			this.heliceSpeed = 0;
	}
}

MyPropeller.prototype.update = function(time){
	if (this.currTime == 0){
		this.currTime = time;
		return;
	}
	var dT = time - this.currTime;
	this.currTime = time;
	this.heliceMinSpeed = dT / 1000.0 * 360;
}