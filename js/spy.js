export default class Spy extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, f)
    {
        super(scene, x, y, texture, f);
        this.scene = scene;
        this.texture = texture;
        this.f = f; //frame
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.alive = true;
        this.stress = 5;
        this.trust = 5;
        this.desire = [];
        this.bombs =  3;
        this.flipped = false;
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
    changeCoat () {
        const GRAY = 3;
        this.setTexture("baddies", GRAY);    
        this.f = GRAY;
    }
    //this.flipped = false;
}    