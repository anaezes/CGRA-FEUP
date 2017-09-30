var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);
	this.Luz1=true; 
	this.Luz2=true;
	this.Luz3=true;
	this.Luz4=true;

	this.tempoAtual = 0;
	this.clockIsWorking = true;
	this.speed=1;
	this.currentTarget = 0;
	this.boolExplosion = false;

	this.initCameras();
	this.initLights();

	this.gl.clearColor(0.016, 0.043 , 0.055, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.gl.blendEquation( this.gl.FUNC_ADD );
	this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

	this.axis = new CGFaxis(this);

	this.enableTextures(true);

	// Scene elements
	this.cilinder = new MyCilinder(this, 8, 20, 0, 1, 0, 1);
	this.clock = new MyClock(this);
	this.submarine = new MySubmarine(this);
	this.pillar = new MyPillar(this);
	this.boardWater = new MyQuad(this, 0, 2.5, 0, 3);
	//this.explosion = new MyExplosion(this);

	this.numberTargets = Math.floor((Math.random() * 10) + 2);
	this.targets = [];
	this.explosions = [];
	for(var i = 0; i < this.numberTargets; i++){
		this.targets.push(new MyTarget(this));
		this.explosions.push(new MyExplosion(this, i));
	}

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.yellowAppearence = new CGFappearance(this);
	this.yellowAppearence.setAmbient(0.2,0.2,0,1);
	this.yellowAppearence.setDiffuse(0.3,0.3,0,1);
	this.yellowAppearence.setSpecular(0.8,0.8,0,1);
	this.yellowAppearence.setShininess(1);

	this.blackAppearence = new CGFappearance(this);
	this.blackAppearence.setAmbient(0,0,0,1);
	this.blackAppearence.setDiffuse(0,0,0,1);
	this.blackAppearence.setSpecular(0,0,0,1);
	this.blackAppearence.setShininess(1);

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setAmbient(0.5,0.5,0.5,1);
	this.clockAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.clockAppearance.setSpecular(0.1,0.1,0.1,1);
	this.clockAppearance.setShininess(999);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	this.clockAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.pilarAppearance = new CGFappearance(this);
	this.pilarAppearance.setAmbient(0.5,0.5,0.5,1);
	this.pilarAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.pilarAppearance.setSpecular(0.1,0.1,0.1,1);
	this.pilarAppearance.setShininess(999);
	this.pilarAppearance.loadTexture("../resources/images/pilar.png");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.3,0.3,0.3,1);
	this.boardAppearance.setSpecular(0.6,0.6,0.6,1);
	this.boardAppearance.setShininess(999);
	this.boardAppearance.loadTexture("../resources/images/board.png");

	this.metalicAppearence = new CGFappearance(this);
	this.metalicAppearence.setAmbient(0.1,0.1,0.1,1);
	this.metalicAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.metalicAppearence.setSpecular(0.7,0.7,0.7,1);
	this.metalicAppearence.setShininess(120);

	this.waterAppearence = new CGFappearance(this);
	this.waterAppearence.setAmbient(0.3,0.3,0.3,1);
	this.waterAppearence.setDiffuse(0.5,0.5,0.5,1);
	this.waterAppearence.setSpecular(0.1,0.1,0.1,1);
	this.waterAppearence.setShininess(20);
	this.waterAppearence.loadTexture("../resources/images/water.png");
	this.waterAppearence.setTextureWrap("REPEAT", "REPEAT");

	this.lensAppearence = new CGFappearance(this);
	this.lensAppearence.setAmbient(0.2,0.2,0.2,1);
	this.lensAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.lensAppearence.setSpecular(0.7,0.7,0.7,1);
	this.lensAppearence.setShininess(120);
	this.lensAppearence.loadTexture("../resources/images/aperture.png");

	this.rustAppearence = new CGFappearance(this);
	this.rustAppearence.setAmbient(0.2,0.2,0.2,1);
	this.rustAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.rustAppearence.setSpecular(0.4,0.4,0.4,1);
	this.rustAppearence.setShininess(120);
	this.rustAppearence.loadTexture("../resources/images/metal_ferrugem.jpg");
	this.rustAppearence.setTextureWrap("REPEAT", "REPEAT");

	this.blackHoleAppearence = new CGFappearance(this);
	this.blackHoleAppearence.setAmbient(0.2,0.2,0.2,1);
	this.blackHoleAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.blackHoleAppearence.setSpecular(0.7,0.7,0.7,1);
	this.blackHoleAppearence.setShininess(120);
	this.blackHoleAppearence.loadTexture("../resources/images/metalic_black_hole.png");
	this.blackHoleAppearence.setTextureWrap("REPEAT", "REPEAT");

	this.pizzaAppearence = new CGFappearance(this);
	this.pizzaAppearence.setAmbient(0.2,0.2,0.2,1);
	this.pizzaAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.pizzaAppearence.setSpecular(0.7,0.7,0.7,1);
	this.pizzaAppearence.setShininess(120);
	this.pizzaAppearence.loadTexture("../resources/images/pizza.png");
	this.pizzaAppearence.setTextureWrap("REPEAT", "REPEAT");

	this.eeveeAppearence = new CGFappearance(this);
	this.eeveeAppearence.setAmbient(0.2,0.2,0.2,1);
	this.eeveeAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.eeveeAppearence.setSpecular(0.7,0.7,0.7,1);
	this.eeveeAppearence.setShininess(120);
	this.eeveeAppearence.loadTexture("../resources/images/eeveelutions.png");
	this.eeveeAppearence.setTextureWrap("REPEAT", "REPEAT");

	this.pikachuAppearence = new CGFappearance(this);
	this.pikachuAppearence.setAmbient(0.2,0.2,0.2,1);
	this.pikachuAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.pikachuAppearence.setSpecular(0.7,0.7,0.7,1);
	this.pikachuAppearence.setShininess(120);
	this.pikachuAppearence.loadTexture("../resources/images/pikachu.png");
	this.pikachuAppearence.setTextureWrap("REPEAT", "REPEAT");

	this.explosionAppearence = new CGFappearance(this);
	this.explosionAppearence.setAmbient(0.2,0.2,0.2,1);
	this.explosionAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.explosionAppearence.setSpecular(0.7,0.7,0.7,1);
	this.explosionAppearence.setShininess(120);
	this.explosionAppearence.loadTexture("../resources/images/explosion.jpg");

	/* Submarine Textures */
	this.submarineAppearences = [ this.materialDefault, this.rustAppearence, this.blackHoleAppearence, this.pizzaAppearence, this.eeveeAppearence, this.pikachuAppearence];
	this.submarineAppearenceList = {
		None: 0, Rust: 1, BlackHole: 2, Pizza: 3, Eevee: 4, Pikachu: 5
	};
	this.currSubmarineAppearence = 'None';
	
	this.updatePeriodo = 60;
	
	this.setUpdatePeriod(1000/this.updatePeriodo);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.update = function(currTime){
	if (this.clockIsWorking)
		this.clock.update(currTime);

	this.submarine.propellerRight.update(currTime);
	this.submarine.propellerLeft.update(currTime);
	
	for (var i = 0; i < this.submarine.torpedos.length; i++)
		if (this.submarine.torpedos[i].going)
			this.submarine.torpedos[i].update(currTime);

	for (var i = 0; i < this.numberTargets; i++)
		if(this.explosions[i].ready)
			this.explosions[i].update(currTime);
}

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.1, 0.1, 0.1, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	//this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	//this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	//this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setLinearAttenuation(0.15);
	if (this.Luz1)
		this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setLinearAttenuation(0.15);
	if (this.Luz2)
		this.lights[1].enable();
	
	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0,1.0);
	this.lights[2].setLinearAttenuation(0.15);
	if (this.Luz3)
		this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setLinearAttenuation(0.15);
	if (this.Luz4)
		this.lights[3].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	//this.axis.display();


/*****************
	* PROJECT *
	*****************/

	//clock
	this.pushMatrix();
	this.translate(8, 5, 0.75);
	this.scale (0.75, 0.75, 1);
	this.clock.display();
	this.popMatrix();

	//pilars
	this.pushMatrix();
	this.translate(8, 0, 0);
	this.pillar.display();
	this.popMatrix(); 

/*
* WATER PLANS
*/
	//floor
	this.pushMatrix();
	this.translate(12, 0, 12);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(24, 24, 0.2);
	this.waterAppearence.apply();
	this.boardWater.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(-12, 0, -12);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(24, 24, 0.2);
	this.waterAppearence.apply();
	this.boardWater.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(-12, 0, 12);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(24, 24, 0.2);
	this.waterAppearence.apply();
	this.boardWater.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(12, 0, -12);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(24, 24, 0.2);
	this.waterAppearence.apply();
	this.boardWater.display();
	this.popMatrix();

	this.yellowAppearence.apply();
	for(var i = 0; i < this.numberTargets; i++){
		this.pushMatrix();
		this.translate(this.targets[i].posX, this.targets[i].posY, this.targets[i].posZ);
		this.rotate(this.targets[i].rotation, 0, 1, 0);
		if (this.targets[i].type == 1)
			this.translate(-0.5, -0.5, -0.5);
		this.targets[i].display();
		this.popMatrix();
	}

	//submarine
	this.pushMatrix();
	this.submarineAppearences[this.submarineAppearenceList[this.currSubmarineAppearence]].apply();
	this.submarine.display();
	this.popMatrix();

/*
	if(this.boolExplosion) {
		this.pushMatrix();
		this.translate(this.submarine.torpedo.posX, this.submarine.torpedo.posY-0.5, this.submarine.torpedo.posZ);
		this.explosionAppearence.apply();
		this.explosion.display();
		this.popMatrix();	
	}*/

	this.explosionAppearence.apply();
	for (var i = 0; i < this.numberTargets; i++){
		if (this.explosions[i].ready){
			this.pushMatrix();
			this.translate(this.explosions[i].posX, this.explosions[i].posY, this.explosions[i].posZ);
			this.explosions[i].display();
			this.popMatrix();
		}
	}

	if (this.Luz1)
		this.lights[0].enable();
	else
		this.lights[0].disable();
	
	if (this.Luz2)
		this.lights[1].enable();
	else
		this.lights[1].disable();

	if (this.Luz3)
		this.lights[2].enable();
	else
		this.lights[2].disable();

	if (this.Luz4)
		this.lights[3].enable();
	else
		this.lights[3].disable();

};

LightingScene.prototype.Pause_Resume_Clock = function () { 
	if (this.clockIsWorking){
		this.clockIsWorking = false;
		this.tempoAtual = this.clock.currTime;
	}
	else{
		this.clockIsWorking = true;
		this.clock.currTime = 0;		
	}
};

LightingScene.prototype.ResetTargets = function (){
	this.currentTarget = 0;
	for (var i = 0; i < this.targets.length; i++){
		this.targets[i].alive = true;
	}
	this.submarine.torpedos = [];
}
