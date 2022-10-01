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
        this.trust = 3;
        this.desire = [];
        //should have a trust bar
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
        this.trust = 2; 
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
        let baddieIndices = [2, 4];
        let frameIndex = [4, 2];
        if (this.f == baddieIndices[0]) {
            console.log("flipped to 4" + frameIndex);
            this.setTexture("baddies", frameIndex[0]);    
            this.f = frameIndex[0];
        }
        else {
            this.setTexture("baddies", frameIndex[1]);    
            this.f = frameIndex[1];
        }
        this.flipped = false;
    }    
}