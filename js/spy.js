import Alignment from "./alignment.js";
import Bombing from "./bombing.js";
import Mission from "./mission.js";
import StressBar from "./stressBar.js";
import TrustBar from "./trustBar.js";
import LifeBar from "./lifeBar.js";
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
        this.health = 4;
        this.codename = codename;
        this.stress = 5;
        this.trust = 5;
        this.desire = [];
        this.bombs =  3;
        this.flipped = false;
        this.alignment = new Alignment(alignment);
        this.mission = new Mission(codename);
        //this.mission.trail(codename);
        this.x = this.getLocationX() * 8;
        this.y = this.getLocationY() * 8;
        this.stressBar = new StressBar(this.x, this.y, this.scene);
        this.lifeBar = new LifeBar(this.x, this.y, this.scene);
        this.trustBar = new TrustBar(this.x, this.y, this.scene, this.trust);
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.tween;
    }

    getLocationX() {
        return this.mission.trail.start.x ;
    }

    getLocationY() {
        return this.mission.trail.start.y;
    }

    hoverIndicators() {
        this.stressBar.x = this.x;
        this.stressBar.y = this.y - 12;
        this.stressBar.draw(this.stress);

        this.lifeBar.x =this.x;
        this.lifeBar.y = this.y - 16;
        this.lifeBar.draw(this.health);

        this.trustBar.x = this.x;
        this.trustBar.y = this.y;
        this.trustBar.draw(this.trust);
    }

    moveX (n) {
        this.x += n;
       
    }

    moveY (n) {
        this.y += n;
       
    }

    movementRight() {
        var spy = this;
        this.tween = this.scene.tweens.timeline( {
                targets: spy,
                duration: Math.floor(spy.mission.trail.distanceX * 5), //spy.mission.trail.distance,
                ease: 'Linear',
                yoyo: false,
                //repeat: -1,
                loop: -1,
                tweens:[                    
                    {
                        x: {from:spy.mission.trail.start.x, to:spy.mission.trail.end.x},
                        y: {from:spy.mission.trail.start.y, to:spy.mission.trail.start.y},
                    },
                    {
                        x: {from:spy.mission.trail.end.x, to:spy.mission.trail.end.x},
                        y: {from:spy.mission.trail.start.y, to:spy.mission.trail.end.y},
                    },
                    {
                        x: {from:spy.mission.trail.end.x, to:spy.mission.trail.end.x},
                        y: {from:spy.mission.trail.end.y, to:spy.mission.trail.start.y},
                    },
                    {
                        x: {from:spy.mission.trail.end.x, to:spy.mission.trail.start.x},
                        y: {from:spy.mission.trail.start.y, to:spy.mission.trail.start.y},
                    }
                ],  
            })
        return this.tween;
        
    }

    movementLeft() {
        var spy = this;
        this.tween = this.scene.tweens.timeline( {
            targets: spy,
            duration: Math.floor(spy.mission.trail.distanceY * 5),
            //hold: Math.random() * 800,
            ease: 'Linear',
            yoyo: false,
            loop: -1,
            //repeat: -1, 
            tweens:[              
                //go left      
                {
                    x: {from:spy.mission.trail.end.x, to:spy.mission.trail.start.x},
                    y: {from:spy.mission.trail.start.y, to:spy.mission.trail.start.y},
                },
                //go down
                {
                    x: {from:spy.mission.trail.start.x, to:spy.mission.trail.start.x},
                    y: {from:spy.mission.trail.start.y, to:spy.mission.trail.end.y},
                },
                //go up
                {
                    x: {from:spy.mission.trail.start.x, to:spy.mission.trail.start.x},
                    y: {from:spy.mission.trail.end.y, to:spy.mission.trail.start.y},
                },
                //go right
                {
                    x: {from:spy.mission.trail.start.x, to:spy.mission.trail.end.x},
                    y: {from:spy.mission.trail.start.y, to:spy.mission.trail.start.y},
                }
            ],  
        })
        return this.tween;
    
    }

    talk () {
       
    }

    bombing () {
        new Bombing();
    }

    stress () {

    }

    dead () {
        this.alive = false;
        this.setActive(false);
        //dead body 
        this.setTexture("baddies", this.alignment.DEADBLACK);
        this.setTexture("baddies", this.alignment.DEADWHITE);
        //this.tween.stop();
        this.destroy();
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
            console.log("dead spy");
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