import Level from "./level.js"
import AlignmentBar from "./alignmentBar.js"
import Meeting from "./meeting.js";
import Spy from "./spy.js";
export default class City extends Phaser.Scene 
{
    constructor(){
        super('City');
        this.level;
        this.alignmentBar;
        this.spy1;
        this.spy2;
        this.isInContact;
        this.isInTalks;
        this.meeting;
        this.brush;
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
        //contact management at meeting
        this.isInContact = false;
        this.isInTalks = false;
        this.brush = false;

        this.meeting = new Meeting(this.spy1, this.spy2);
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
        map.createLayer(0, tileset, 400, 300);

        // alignments by % levels
        this.alignmentBar = new AlignmentBar(this);
        this.alignmentBar.decrease();
        this.alignmentBar.draw();

        //spies
        this.spy1 = new Spy(this, 400, 300, "baddies", 0);
        //this.spy1.frame = 4;

        this.spy2 = new Spy(this, 480, 300, "baddies", 4); 
        //this.spy2.frame = 0;

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
        if (this.cursors.left.isDown) {
            this.spy1.x -=1;
        }
        if (this.cursors.right.isDown) {
            this.spy1.x +=1;
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
        //meeting of spies
        
        this.meeting.isInContact(this.spy1, this.spy2);

        if (this.meeting.begins)
        {
            console.log("al decrease");
            this.alignmentBar.decrease();
            this.spy2.trustDecrease();
        }

        if(this.spy2.flipped == true) {
            console.log("changed frame " + this.spy2.f);
            let baddieIndices = [2, 4];
            let frameIndex = [4, 2];
            if (this.spy2.f == baddieIndices[0]) {
                console.log("flipped to 4" + frameIndex);
                this.spy2.setTexture("baddies", frameIndex[0]);    
                this.spy2.f = frameIndex[0];
            }
            else {
                this.spy2.setTexture("baddies", frameIndex[1]);    
                this.spy2.f = frameIndex[1];
            }
            this.spy2.flipped = false;
        }
    }
}