/**
 * MyExplosion
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyExplosion(scene, currentTarget) {
	CGFobject.call(this,scene);

	this.sphere = new MyLamp(this.scene, 20, 20);
	this.currTime = 0;
	this.raio = 0.5;
	this.altura = 0.5;

	this.posX = this.scene.targets[currentTarget].posX;
	this.posY = this.scene.targets[currentTarget].posY - 0.5;
	this.posZ = this.scene.targets[currentTarget].posZ;

	this.currentTarget = currentTarget;

	this.ready = false;

	this.sphere.initBuffers();
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor=MyExplosion;

MyExplosion.prototype.update = function(time){
	
	if (this.currTime == 0){
		this.currTime = time;
		return;
	}

	if(time - this.currTime > 700){
		this.currTime = 0;
		this.scene.boolExplosion = false;
		this.scene.targets[this.currentTarget].alive = false;
		this.raio = 0.5 ;
		this.altura = 0.5;
		this.transparency = 1;
		this.ready = false;
		return;
	}
	
	this.raio += 0.05 ;
	this.altura += 0.05;
}

MyExplosion.prototype.display = function () {

	this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.scale(this.raio, this.raio, this.altura);
		this.sphere.display();
	this.scene.popMatrix();
};
