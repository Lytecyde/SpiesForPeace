import Alignment from "./alignment.js";
import Mission from "./mission.js";
import StressBar from "./stressBar.js";
import TrustBar from "./trustBar.js";
export default class Spy extends Phaser.GameObjects.Sprite {
    constructor (scene, texture, f, codename, alignment)
    {
        super(scene, 0, 0, texture, f);
        this.scene = scene;
        this.texture = texture;
        this.f = f; //frame from the spritesheet
        scene.add.existing(this);
        
        this.alive = true; 
        //DATA
        this.health = 20;
        this.codename = codename;
        this.stress = 5;
        this.trust = 5;
        this.desire = [];
        this.bombs =  3;
        this.flipped = false;
        this.alignment = new Alignment(alignment);
        this.mission = new Mission(codename);
        //this.mission.trail(codename);
        this.x = this.setLocationX() * 32;
        this.y = this.setLocationY() * 32;
        this.stressBar = new StressBar(this.x, this.y, this.scene);
        this.trustBar = new TrustBar(this.x, this.y, this.scene, this.trust);
        
    }

    setLocationX() {
        return this.mission.trail.start.x;
    }

    setLocationY() {
        return this.mission.trail.start.y;
    }

    

    moveX (n) {
        this.x += n;
    }

    moveY (n) {
        this.y += n;
    }

    talk () {
       
    }

    bomb () {

    }

    stress () {

    }

    dead () {
        this.alive = false;
        this.setActive(false);
        this.setTexture("baddies", this.alignment.DEAD);
        //this.destroy();
    }
    
    convert () {
        this.flipped = true;
        this.trust = 5; 
    }  

    flipSides(alignment) {

    }

    trustDecrease () {
        if(this.trust > 0) {
            this.trust -= 1;
        }
        else {
            this.convert();    
        }   
    }

    lifeDecrease (damage) {
        if(this.health > 0) {
            this.health -= damage;
        }
        else {
            this.dead();    
        }
    }

    changeCoat () {
        const GRAY = 3;
        this.setTexture("baddies", GRAY);    
        this.f = GRAY;
    }

    
    //this.flipped = false;
}    