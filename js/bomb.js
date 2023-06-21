import Epicenter from "./epicenter.js";

export default class Bomb extends Phaser.GameObjects.Sprite {
//refactoring the bomb stuff from the city.js
    constructor (scene, x, y, bombKey) {
        super(scene, x, y, bombKey);
        this.anims.create({
            key: bombKey,
            frames: this.anims.generateFrameNumbers(
              'bomb',
             { start: 0, end: 0 }
             ),
            defaultTextureKey: null,
  
            // time
            delay: 0,
            frameRate: 24,
            duration: null,
            skipMissedFrames: true,
  
            // repeat
            repeat: 0,
            repeatDelay: -1,
            yoyo: false,
  
            // visible
            showOnStart: false,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers(
              'explosion',
             { start: 0, end: 11 }
             ),
             defaultTextureKey: null,
  
             // time
             delay: 0,
             frameRate: 24,
             duration: null,
             skipMissedFrames: true,
   
             // repeat
             repeat: 0,
             repeatDelay: -1,
             yoyo: false,
   
             // visible
             showOnStart: false,
             hideOnComplete: true
        });   
        this.bombtimer = 0;
        this.x = x;
        this.y = y;
        this.scene = scene;
        
    }

    spawn() {
        this.scene.time.addEvent({
            delay: 3000 + Math.floor(Math.random() * 1500),
            callback: () => {
                this.setVisible(true);
                this.play('explosion');
                this.epicenter = new Epicenter(this.scene, this.x, this.y);
                const BOMBSWITCH = false;
                if(BOMBSWITCH) {
                    const shakeEffect = this.scene.cameras.main.shake(200, 0.025);
                }
                this.setScale(2);
                this.detonation();
                this.on('animationcomplete', () => {
                    this.destroy();
                    this.epicenter.remove();
                });
            },
            callbackScope: this,
            loop: false
        });
    }

    detonation() {
        this.applyToSpiesNearby();
    }

    blastEffects(spy, stressShock) {
        //spies
        spy.stressBar.setLevel(spy.stress);
        spy.lifeBar.setLevel(spy.health);
        spy.lifeDecrease(stressShock);
    }

    applyToSpiesNearby() {
        var aggressives = this.scene.spies.filter((spy) =>
        (spy.mission.operation.title !== "peaceworker"));
        console.log(aggressives.length + " counting the aggressives");
        aggressives.forEach(function(spy){
            var stressShock = this.epicenter.getDamageLevel(spy); 
            console.log(stressShock + "stressshock");
            this.blastEffects(spy, stressShock);
        }, this);
    }
}