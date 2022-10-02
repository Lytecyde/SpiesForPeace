import Level from "./level.js"
import AlignmentBar from "./alignmentBar.js"
import Meeting from "./meeting.js";
import Spy from "./spy.js";
import StressBar from "./stressBar.js";
import TrustBar from "./trustBar.js";
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
        this.stressBar;
        this.spyGroup;
        this.allBlackStressBars = [];
        this.allBlackTrustBars = [];
        this.allWhiteStressBars = [];
        this.timer = 0;
    }

    preload() {
        this.load.spritesheet(
            'city-tiles',
            '/assets/spritesheet/city32.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                margin: 0,
                spacing: 0
                
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
        map.createLayer(0, tileset, 0, 0);

        // alignments by % levels
        this.alignmentBar = new AlignmentBar(this);
        this.alignmentBar.decrease();
        this.alignmentBar.draw();

        //spies
        this.spy1 = new Spy(this, 30, 30, "baddies", 2);
        //this.spy1.frame = 4;

        this.spy2 = new Spy(this, 16, 30, "baddies", 3); 

        var group_config = {
            classType: Phaser.GameObjects.Sprite,
            defaultKey: null,
            defaultFrame: null,
            active: true,
            maxSize: -1,
            runChildUpdate: false,
            createCallback: null,
            removeCallback: null,
            createMultipleCallback: null
        };   

        this.spyBlackGroup = this.add.group(group_config);    
        this.spyWhiteGroup = this.add.group(group_config);
        for (let index = 0; index < 16; index++) {
            var x = index % 4;
            x += 1;
            var y = (index - (index % 4)) / 4;
            y += 1;
            this.spyBlackGroup.add(new Spy(this, x * 64, y * 64, "baddies", 0));
            this.spyWhiteGroup.add(new Spy(this, x * 64 + 32, y * 64, "baddies", 5));
        }
        
        //BARS
        
        //STRESS
        this.stressBar = new StressBar(this.spy1.x, this.spy1.y, this);
        this.stressBar.draw();



        //all stressbars
        var spyblack = this.spyBlackGroup.getChildren();
        var spywhite = this.spyWhiteGroup.getChildren();
        for (let index = 0; index < 16; index++) {     
            this.allBlackStressBars[index] = new StressBar(spyblack[index].x, spyblack[index].y, this);
            this.allWhiteStressBars[index] = new StressBar(spywhite[index].x, spywhite[index].y, this);
        }

        for (let index = 0; index < 16; index++) {
            this.allBlackStressBars[index].draw();
            this.allWhiteStressBars[index].draw();
        }

        for (let index = 0; index < 16; index++) {
            this.allBlackStressBars[index].draw();
        }

        //all trustbars
        for (let index = 0; index < 16; index++) {     
            var trust = spyblack[index].trust;
            this.allBlackTrustBars[index] = new TrustBar(spyblack[index].x, spyblack[index].y, this, trust);
            
        }


        for (let index = 0; index < 16; index++) {
            this.allBlackTrustBars[index].draw(5);
        }    

        
        //this.spy2.frame = 2;

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
        this.timer += delta;
        //movement
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
        //movement is within borders  
        if (this.spy1.x > 720) {
            this.spy1.x = 720;
        }
        if (this.spy1.x < 0) {
            this.spy1.x = 0;
        }
        if (this.spy1.y > 444) {
            this.spy1.y = 444;
        }
        if (this.spy1.y < 0) {
            this.spy1.y = 0;
        }
        
        //
        this.stressBar.draw(this.spy1.x, this.spy1.y); 

        

        //meeting of 2spies
        for (let index = 0; index < 16; index++) 
        {
            this.meeting.isInContact(this.spy1, this.spy2);
        }    
        //peacebuilder meeting spies
        for (let index = 0; index < 16; index++) 
        {
            var spy = this.spyBlackGroup.getChildren();
            this.meeting.isInContact(this.spy1, spy[index]);
            if (this.meeting.begins)
            {
                //console.log("al decrease");
                this.alignmentBar.decrease();
                
                console.log(spy[index].trust);
                while(this.timer > 1500) {
                    spy[index].trustDecrease();
                    this.allBlackTrustBars[index].draw(spy[index].trust);
                    this.timer -= 1500;
                }    
            }
        }        

        if (this.meeting.begins)
        {
            //console.log("al decrease");
            this.alignmentBar.decrease();
            this.spy2.trustDecrease();
        }
        //autoconvert opposing player to your side
        if(this.spy2.flipped == true) {
            console.log("changed frame " + this.spy2.f);
            this.spy2.changeCoat();
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

        for (let index = 0; index < 16; index++) {
            var spyblack = this.spyBlackGroup.getChildren();
            if(spyblack[index].flipped == true ) {
                spyblack[index].changeCoat();
            }
        }
    }
}