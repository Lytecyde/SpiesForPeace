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
              const shakeEffect = this.cameras.main.shake(2000, 0.05);
              this.setScale(2);
              this.detonation();
              this.on('animationcomplete', () => {
                this.destroy();
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
       //console.log("blast effects");
        spy.stressBar.setLevel(spy.stress);
        spy.lifeBar.setLevel(spy.health);
        spy.lifeDecrease(stressShock);
        spy.stressDecrease(stressShock);
        //scenery
    }

    applyToSpiesNearby() {
        var aggressives = this.scene.spies.filter(function(spy){
            return spy.mission.operation.title !== "peaceworker";
        });

        aggressives.forEach(function(spy){
            var stressShock = Math.floor(spy.stressBar.stressCausedByBomb(this.x, this.y, spy.x, spy.y));
            this.blastEffects(spy, stressShock);
        }, this);
    }
}