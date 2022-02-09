import Level from "./level.js"
import AlignmentBar from "./alignmentBar.js"

export default class City extends Phaser.Scene 
{
    constructor(){
        super('City');
        this.level;
        this.alignmentBar;
        this.spy1;
    }

    preload() {
        this.load.spritesheet(
            'city-tiles',
            '/assets/spritesheet/city32.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                margin: 0,
                spacing: 1
                
            }
        );
        this.load.spritesheet(
            'baddies',
            '/assets/spritesheet/baddies.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                spacing: 0
            }
        );
    }   

    create (scene) {
        
        //demo city block
        this.scene = scene;
        let level = new Level();
        let m = level.getCityMap();

        const tileSize = 32;
        const config = {
            data: m,
            tileWidth: tileSize,
            tileHeight: tileSize,
        };
        let map = this.make.tilemap(config);
        const tileset = map.addTilesetImage(
            'city-tiles',
            'city-tiles',
            32,
            32,
            0,
            0
            );
        let layer = map.createLayer(0, tileset, 400, 300);

        // alignments by % levels
        this.alignmentBar = new AlignmentBar(this);
        this.alignmentBar.draw();

        //spies
        
        
        this.spy1 = this.add.sprite(400, 300, "baddies");

        this.spy1.setFrame(0);
        
           
        let spy2 = this.add.sprite(480, 300, "baddies");

        spy2.setFrame(2);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
        if (this.cursors.left.isDown) {
            this.spy1.x -= 1;
        }
        if (this.cursors.right.isDown) {
            this.spy1.x += 1;
        }
        if (this.cursors.up.isDown) {
            this.spy1.y -= 1;
        }
        if (this.cursors.down.isDown) {
            this.spy1.y += 1;
        }   
        if (this.spy1.x > 720) {
            this.spy1.x = 720;
        }

        if (this.spy1.x < 400) {
            this.spy1.x = 400;
        }

        if (this.spy1.y > 444) {
            this.spy1.y = 444;
        }
        if (this.spy1.y < 300) {
            this.spy1.y = 300;
        }

    }
}