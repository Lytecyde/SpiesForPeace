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
        this.health = 5;
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

    refreshIndicators(stress, lifeDecrease) {
        this.stress = stress;
        this.health = this.health - lifeDecrease;
    }

    hoverStressBar() {
        this.stressBar.x = this.x;
        this.stressBar.y = this.y - 16;
        this.stressBar.draw(this.stress);
    }

    hoverLifeBar() {
        this.lifeBar.x =this.x;
        this.lifeBar.y = this.y - 20;
        this.lifeBar.draw(this.health);
    }

    hoverTrustBar() {
        this.trustBar.x = this.x;
        this.trustBar.y = this.y -24;
        this.trustBar.draw(this.trust);
    }

    hoverIndicators() {
        console.log("health " + this.health + "   stress" + this.stress);
        this.hoverStressBar();
        this.hoverLifeBar();
        this.hoverTrustBar();
    }

    removeHoverIndicators() {
        this.stressBar.destroy();
        this.lifeBar.destroy();
        this.trustBar.destroy();
    }

    moveX(n) {
        this.x += n;
       
    }

    moveY (n) {
        this.y += n;
       
    }

    movementRight() {
        var spy = this;
        console.log("dist x" + spy.mission.trail.distanceX);
        console.log("dist y" + spy.mission.trail.distanceY);
        this.tween = this.scene.tweens.timeline( {
                delay:  Math.floor(Math.random()* 800),
                targets: spy,
                duration: 80, 
                ease: 'Linear',
                yoyo: false,
                //repeat: -1,
                loop: -1,
                tweens:[                    
                    {
                        duration: 8 * spy.mission.trail.distanceX,
                        x: {from:spy.mission.trail.start.x, to:spy.mission.trail.end.x},
                        y: {from:spy.mission.trail.start.y, to:spy.mission.trail.start.y},
                    },
                    {
                        duration: 8 * spy.mission.trail.distanceY,
                        x: {from:spy.mission.trail.end.x, to:spy.mission.trail.end.x},
                        y: {from:spy.mission.trail.start.y, to:spy.mission.trail.end.y},
                    },
                    {
                        duration: 8 * spy.mission.trail.distanceY, 
                        x: {from:spy.mission.trail.end.x, to:spy.mission.trail.end.x},
                        y: {from:spy.mission.trail.end.y, to:spy.mission.trail.start.y},
                    },
                    {
                        duration: 8 * spy.mission.trail.distanceX,
                        x: {from:spy.mission.trail.end.x, to:spy.mission.trail.start.x},
                        y: {from:spy.mission.trail.start.y, to:spy.mission.trail.start.y},
                    }
                ],  
            })
        return this.tween;
        
    }

    movementLeft() {
        var spy = this;
        console.log("dist x" + spy.mission.trail.distanceX);
        console.log("dist y" + spy.mission.trail.distanceY);
        this.tween = this.scene.tweens.timeline( {
            delay:  Math.floor(Math.random()* 800),
            targets: spy,
            duration: 80,
            hold: Math.random() * 80,
            ease: 'Linear',
            yoyo: false,
            loop: -1,
            //repeat: -1, 
            tweens:[              
                //go left      
                {
                    duration: 8 * spy.mission.trail.distanceX,    
                    x: {from:spy.mission.trail.end.x, to:spy.mission.trail.start.x},
                    y: {from:spy.mission.trail.start.y, to:spy.mission.trail.start.y},
                },
                //go down
                {
                    duration: 8 * spy.mission.trail.distanceY, 
                    x: {from:spy.mission.trail.start.x, to:spy.mission.trail.start.x},
                    y: {from:spy.mission.trail.start.y, to:spy.mission.trail.end.y},
                },
                //go up
                {
                    duration: 8 * spy.mission.trail.distanceY, 
                    x: {from:spy.mission.trail.start.x, to:spy.mission.trail.start.x},
                    y: {from:spy.mission.trail.end.y, to:spy.mission.trail.start.y},
                },
                //go right
                {
                    duration: 8 * spy.mission.trail.distanceX, 
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

    dead () {
        this.alive = false;
        this.setActive(false);
        //dead body 
        this.setTexture("baddies", this.alignment.DEADBLACK);
        this.setTexture("baddies", this.alignment.DEADWHITE);
        //this.tween.stop();
        this.removeHoverIndicators();
        this.destroy();
    }
    
    convert () {
        this.flipped = true;
        this.trust = 5; 
    }  

    flipSides(alignment) {

    }

    stressDecrease (stressShock) {
        if(this.stress > 0) {

            this.stress -= 2;
        }
        else {
            console.log("dead stressed spy");
            //this.dead();    
        }
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
            this.health -= 1;
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