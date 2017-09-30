/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene) {
	CGFobject.call(this,scene);

	this.type = Math.floor((Math.random() * 10) + 1) % 2;

	if(this.type == 0)
		this.object = new MyUnitCubeQuad(this.scene);
	else 
		this.object = new MyTriangle(this.scene);

	this.rotation = Math.floor(Math.random() * 360) * degToRad;

	this.value = Math.floor((Math.random() * 10) + 1) % 2;
	if(this.value == 0) 
		this.value = -1;
	this.posX = this.value * Math.floor((Math.random() * 10) + 1);

	this.value = Math.floor((Math.random() * 10) + 1) % 2;
	if(this.value == 0) 
		this.value = -1;
	this.posZ = this.value * Math.floor((Math.random() * 10) + 1);
	
	this.posY = 0.5;
	
	this.alive = true;
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function () {
	
	if (this.alive){
   		this.scene.pushMatrix();
        	this.object.display();
   		this.scene.popMatrix();
	}

};

MyTarget.prototype.destroyObject = function(){
	this.alive = false;
}

