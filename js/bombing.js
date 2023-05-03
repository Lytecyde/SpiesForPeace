import City from "./city.js";
export default class Bombing extends City {
    constructor(scene) {
        super();
        this.scene = scene;
        //plan bomb
        //start bomb
        //leave bomb
        //time count downs
        //explosion size
        //explodes
        //stress effect
        //health effect
        //deathCheck 
        this.bombRespawnTimer = super.bombRespawnTimer;
    }

    blast( spies, bomb, blastImage, respawnTimer, countBombers ) {
        
        const BOMBTICKTIME = 5000;
        if ((respawnTimer > 3000 + BOMBTICKTIME ) && countBombers > 0)
        {   //explosion effect for each spy, bombeffects
            spies.forEach(function(spy){
                if(bomb){
                    var stressShock = Math.floor(spy.stressBar.stressCausedByBomb(bomb.x, bomb.y));
                    console.log("stress shock: " + stressShock);
                    spy.lifeDecrease(stressShock);
                    //overall stress level
                    //defuse?
                }
            }, this);
            
            //super.bomb.destroy();
            //this.scene.bombmade = true;
            this.resetBombRespawnTimer();
        } 
    }

    updateBombRespawnTimer() {

    }

    resetBombRespawnTimer() {
        super.bombRespawnTimer = 0;
    }
}