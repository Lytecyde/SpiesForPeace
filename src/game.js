import City from "./city.js";

export default class Game extends Phaser.Scene {

    constructor(){
        super('Game');
        this.helloText;
        this.cursors;
        //this.city;
    }

    preload () {
        this.load.bitmapFont("arcade", "/assets/font/arcade.png", "/assets/font/arcade.xml");
    }
    
    create () {
        this.helloText = this.add.bitmapText(401, 301, "arcade", "PACIFISTS!");
        
        this.cursors = this.input.keyboard.createCursorKeys();
       
        this.scene.add('city', City, true, { x: 800, y: 600 });
    }
     
    update () {
        
        if (this.cursors.left.isDown) {
            this.helloText.x -= 10;
        }
        if (this.cursors.right.isDown) {
            this.helloText.x += 10;
        }
        if (this.cursors.up.isDown) {
            this.helloText.y -= 10;
        }
        if (this.cursors.down.isDown) {
            this.helloText.y += 10;
        }   
        if (this.helloText.x > 1000) {
            this.helloText.x = -200
        }
        if (this.helloText.x < -210) {
            this.helloText.x = 990
        }

    } 
    
}