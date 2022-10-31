import Alignment from "./alignment.js";
import StressBar from "./stressBar.js";
import TrustBar from "./trustBar.js";
export default class Spy extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, f, codename, alignment)
    {
        super(scene, x, y, texture, f);
        this.scene = scene;
        this.texture = texture;
        this.f = f; //frame from the spritesheet
        scene.add.existing(this);
        this.x = x;
        this.y = y;
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
        this.stressBar = new StressBar(x, y, this.scene);
        this.trustBar = new TrustBar(x, y, this.scene, this.trust);
        //scene.add(this.trustBar);
        
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