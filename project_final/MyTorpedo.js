/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene, posX, posY, posZ, angV, angR, currentTarget) {
	CGFobject.call(this,scene);

	var stacks = 50;
	var slices = 75;

	this.going = true;

	this.posXi = posX;
	this.posYi = posY - 0.83;
	this.posZi = posZ + 1.4;
	
	this.angVi = -angV;
	this.angRi = angR;

	this.angV = angV;
	this.angR = angR;

	this.posX = this.posXi;
	this.posY = this.posYi;
	this.posZ = this.posZi;

	this.posXd = 0;
	this.posYd = 0;
	this.posZd = 0;

	this.targetX = this.scene.targets[currentTarget].posX;
	this.targetY = this.scene.targets[currentTarget].posY;
	this.targetZ = this.scene.targets[currentTarget].posZ - 0.5;

	this.currentTarget = currentTarget;

	this.t = 0;

	this.tDelta = 1 / Math.sqrt(Math.pow(this.posXi - this.targetX, 2) + Math.pow(this.posYi - this.targetY, 2) + Math.pow(this.posZi - this.targetZ, 2));

	this.currTime = 0;

	this.cylinder = new MyCilinder(this.scene, stacks, slices);
	this.sphere = new MyLamp(this.scene, stacks, slices);
	this.trapezeStern =  new MyTrapeze(this.scene, 2.34, 1.64, 0.05, 0.2);
	
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;

MyTorpedo.prototype.display = function () {

	this.scene.pushMatrix();
	this.scene.translate(this.posX, this.posY, this.posZ + 0.612);
	this.scene.rotate(this.angR, 0, 1, 0);
	this.scene.rotate(this.angV, 1, 0, 0);
	this.scene.translate(0, 0, -0.612);
	this.scene.scale(0.15, 0.15, 0.3);

    //Body
	this.scene.pushMatrix();
		this.scene.scale(0.365, 0.7, 4.08);
		this.cylinder.display();
	this.scene.popMatrix();

	//Nose
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 4.08);
		this.scene.scale(0.365, 0.7, 0.5);
		this.sphere.display();
	this.scene.popMatrix();

	//Bottom
	this.scene.pushMatrix();
		this.scene.rotate(-180 * degToRad, 1, 0, 0);
		this.scene.scale(0.365, 0.7, 0.5);
		this.sphere.display();
	this.scene.popMatrix();

	//Stern planes
	this.scene.pushMatrix();
		this.scene.translate(0, 0.05, -0.1);
		this.trapezeStern.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.1);
		this.scene.rotate(90 * degToRad, 0, 0, 1);
		this.trapezeStern.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

};

MyTorpedo.prototype.bezierCurve = function(){       //Math.cos(this.verticalAngle * degToRad) * Math.sin(this.rotation)
	this.posX = Math.pow(1 - this.t, 3) * this.posXi 
				+ 3*this.t*Math.pow(1 - this.t, 2) * (this.posXi + 6 * Math.cos(this.angVi) * Math.sin(this.angRi))
				+ 3*this.t*this.t * (1 - this.t) * this.targetX
				+ Math.pow(this.t, 3) * this.targetX;
	
	this.posY = Math.pow(1 - this.t, 3) * this.posYi 
				+ 3*this.t*Math.pow(1 - this.t, 2) * (this.posYi + 6 * Math.sin(this.angVi))
				+ 3*this.t*this.t * (1 - this.t) * (this.targetY + 3)
				+ Math.pow(this.t, 3) * this.targetY;

	this.posZ = Math.pow(1 - this.t, 3) * this.posZi 
				+ 3*this.t*Math.pow(1 - this.t, 2) * (this.posZi + 6 * Math.cos(this.angVi) * Math.cos(this.angRi))
				+ 3*this.t*this.t * (1 - this.t) * this.targetZ
				+ Math.pow(this.t, 3) * this.targetZ;
}

MyTorpedo.prototype.bezierDerivate = function(){
	this.posXd = 3 * Math.pow(this.t, 2) * this.targetX
				 - 3 * Math.pow(this.t, 2) * this.targetX
				 + 6 * (1 - this.t) * this.t * this.targetX
				 - 6 * (1 - this.t) * this.t * (this.posXi + 6 * Math.cos(this.angVi) * Math.sin(this.angRi))
				 + 3 * Math.pow(1 - this.t, 2) * (this.posXi + 6 * Math.cos(this.angVi) * Math.sin(this.angRi))
				 - 3 * Math.pow(1 - this.t, 2) * this.posXi;

	this.posYd = 3 * Math.pow(this.t, 2) * this.targetY
				 - 3 * Math.pow(this.t, 2) * (this.targetY + 3)
				 + 6 * (1 - this.t) * this.t * (this.targetY + 3)
				 - 6 * (1 - this.t) * this.t * (this.posYi + 6 * Math.sin(this.angVi))
				 + 3 * Math.pow(1 - this.t, 2) * (this.posYi + 6 * Math.sin(this.angVi))
				 - 3 * Math.pow(1 - this.t, 2) * this.posYi;

	this.posZd = 3 * Math.pow(this.t, 2) * this.targetZ
				 - 3 * Math.pow(this.t, 2) * this.targetZ
				 + 6 * (1 - this.t) * this.t * this.targetZ
				 - 6 * (1 - this.t) * this.t * (this.posZi + 6 * Math.cos(this.angVi) * Math.cos(this.angRi))
				 + 3 * Math.pow(1 - this.t, 2) * (this.posZi + 6 * Math.cos(this.angVi) * Math.cos(this.angRi))
				 - 3 * Math.pow(1 - this.t, 2) * this.posZi;
}

MyTorpedo.prototype.update = function(currTime){
	if (this.currTime == 0){
		this.currTime = currTime;
		return;
	}

	this.t += this.scene.speed * this.tDelta * (currTime - this.currTime) / 1000;

	this.currTime = currTime;

	this.bezierCurve();
	this.bezierDerivate();

	this.angV = -Math.atan(this.posYd/Math.sqrt(Math.pow(this.posXd, 2) + Math.pow(this.posZd, 2)));
	this.angR = Math.acos(this.posZd/Math.sqrt(Math.pow(this.posXd, 2) + Math.pow(this.posZd, 2)));

	if (this.posXd < 0)
		this.angR = -this.angR;

	if (this.t > 1){
		this.t = 0;
		this.active = false;
		this.scene.submarine.boolTorpedo = false;
		this.scene.submarine.firing = false;
		this.scene.explosions[this.currentTarget].ready = true;
		this.going = false;
	}
}