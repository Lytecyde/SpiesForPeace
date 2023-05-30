export default class Bombing extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        //plan bomb
        //start bomb
        //leave bomb
        //time count downs
        //explosion size
        //explodes
        //stress effect
        //health effect
        //deathCheck 
        this.x = x;
        this.y = y;
        this.lastBlastTime;
        scene.add.existing(this);
        this.BOMBTICKTIME = 3000;
        this.anims.create({
            key: 'bang',
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
    }

    blast( spies, respawnTimer, time ) {     
        const BOMBTICKTIME = 3000;
        if (respawnTimer > BOMBTICKTIME){
            console.log(respawnTimer);
          //explosion effect 
            this.play('bang');
            //effects for each spy
            spies.forEach(function(spy){
                var stressShock = Math.floor(spy.stressBar.stressCausedByBomb(this.x, this.y));
                console.log("stress shock: " + stressShock);
                this.blastEffects(spy, stressShock);
            }, this);
            
            this.scene.bomb.destroy();
            if(this.scene.countBombers() > 0) {
                this.scene.bombmade = true;
            }   
            this.lastBlastTime = time;
        }        
    }

    updateBombRespawnTimer() {

    }

    blastEffects(spy, stressShock) {
        //spies
        console.log("blast effects");
        spy.stressBar.setLevel(spy.stress);
        spy.lifeBar.setLevel(spy.health);
        spy.lifeDecrease(stressShock);
        spy.stressDecrease(stressShock);
        //scenery
    }
}