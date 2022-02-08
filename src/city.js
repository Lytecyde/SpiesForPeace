import Level from "./level.js"
import AlignmentBar from "./alignmentBar.js"

export default class City extends Phaser.Scene 
{
    constructor(){
        super('City');
        this.level;
        this.alignmentBar;
    }

    preload() {
        this.load.spritesheet(
            'city-tiles',
            '/assets/spritesheet/city.png',
            {
                frameWidth: 16,
                frameHeight: 16,
                margin: 0,
                spacing: 1
                
            }
        );
        this.load.spritesheet(
            'baddies',
            '/assets/spritesheet/baddies.png',
            {
                frameWidth: 16,
                frameHeight: 16,
                spacing: 0
            }
        );
    }   

    create (scene) {
        
        //demo city block
        this.scene = scene;
        let level = new Level();
        let m = level.getCityMap();

        const tileSize = 16;
        const config = {
            data: m,
            tileWidth: tileSize,
            tileHeight: tileSize,
        };
        let map = this.make.tilemap(config);
        const tileset = map.addTilesetImage(
            'city-tiles',
            'city-tiles',
            16,
            16,
            0,
            0
            );
        let layer = map.createLayer(0, tileset, 400, 300);

        // alignments by % levels
        this.alignmentBar = new AlignmentBar(this);
        this.alignmentBar.draw();

        //spies
        
        
        let spy1 = this.add.sprite(64, 60, "baddies");

        spy1.setFrame(0)
        
           
        let spy2 = this.add.sprite(30, 60, "baddies");

        spy2.setFrame(2);

    }

    update (time, delta) {

    }
}