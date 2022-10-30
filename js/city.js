import Level from "./level.js"
import AlignmentBar from "./alignmentBar.js"
import Meeting from "./meeting.js";
import Spy from "./spy.js";
import StressBar from "./stressBar.js";
import TrustBar from "./trustBar.js";
import CityCreator from "./cityCreator.js";
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
        this.allWhiteTrustBars = [];
        this.allWhiteStressBars = [];
        this.blackTimer = 0;
        this.whiteTimer = 0;
        this.bomb;
        this.bombtimer = 0;
        this.bombRespawnTimer = 0;
        this.bombmade = true;
        this.city;
        this.textMeetingSymbol;

        this.lastTalkedWhiteSpyIndex = 9;
        this.lastTalkedBlackSpyIndex = 9;
    }

    preload() {
        this.load.spritesheet(
            'city-tiles',
            '/assets/tileart/darkcity2.png',
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
        this.load.spritesheet(
            'bomb',
            '/assets/spritesheet/bomb.png',
            {
                frameWidth: 16,
                frameHeight: 16,
                spacing: 0
            }
        );
        this.load.spritesheet(
            'explosion',
            '/assets/spritesheet/explosions.png',
            {
                frameWidth: 32,
                frameHeight: 32,
                spacing: 0
            }
        );
    }   

    createLevelMapCity (scene) 
    {
        this.city = new CityCreator();
        this.city.createCity();
        var level = this.city.getLevel().slice();
        const w = 32;
        const h = 24;
        let levelMapData = Array.from(Array(w), () => new Array(h));
        
        var i = 0;
        
        for (let height = 0; height < h; height++) {  
        for (let width = 0; width < w; width++ ) {
            levelMapData[height][width] = level[i];
            i++;
        }
        }
        return levelMapData;
    } 

    create (scene) {
         
        var levelMapData = this.createLevelMapCity(scene);
        var mapCity = this.make.tilemap({data: levelMapData, tileWidth: 32, tileHeight: 32});
        var tiles = mapCity.addTilesetImage('city-tiles');
        var layer = mapCity.createLayer(0, tiles, 0, 0);

        
        //contact management at meeting
        this.isInContact = false;
        this.isInTalks = false;
        this.brush = false;

        
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
        /*
        var avenue = map.addTilesetImage(
            'city-tiles'
        );

        var layer = map.createLayer(0, avenue, 0, 0);
         
        layer;
        */    
        this.anims.create({
            key: 'bang',
            frames: this.anims.generateFrameNumbers(
              'explosion',
             { start: 0, end: 11 }),
            defaultTextureKey: null,
  
            // time
            delay: 0,
            frameRate: 24,
            duration: null,
            skipMissedFrames: true,
  
            // repeat
            repeat: 0,
            repeatDelay: -1,
            yoyo: false,
  
            // visible
            showOnStart: false,
            hideOnComplete: true
          });    

        // alignments by % levels
        this.alignmentBar = new AlignmentBar(this);
        this.alignmentBar.decrease();
        this.alignmentBar.draw();

        //spies
        this.spy1 = new Spy(this, 30, 30, "baddies", 2);
        this.textMeetingSymbol = this.add.text(this.spy1.x , this.spy1.y, '', { font: '32px Courier', fill: '#000000' });

        this.spy2 = new Spy(this, 16, 30, "baddies", 3); 

        this.meeting = new Meeting(this.spy1, this.spy2); 

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
        //TODO:set random locations for each spy 
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
            this.allBlackStressBars[index].setStressLevel(5);
            this.allWhiteStressBars[index].setStressLevel(5);
            this.allBlackStressBars[index].draw();
            this.allWhiteStressBars[index].draw();
        }

        //all trustbars
        for (let index = 0; index < 16; index++) {     
            var trust = spyblack[index].trust;
            this.allBlackTrustBars[index] = new TrustBar(spyblack[index].x, spyblack[index].y, this, trust);
            trust = spywhite[index].trust;
            this.allWhiteTrustBars[index] = new TrustBar(spywhite[index].x, spywhite[index].y, this, trust);
        }

        for (let index = 0; index < 16; index++) {
            this.allBlackTrustBars[index].draw(0);
            this.allWhiteTrustBars[index].draw(5);
        }    
        
        //this.spy2.frame = 2;

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
        this.blackTimer += delta;
        this.whiteTimer += delta;
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
        this.textMeetingSymbol.setPosition(this.spy1.x , this.spy1.y - 32);
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

        //bomb
        this.bombRespawnTimer += delta;
        this.bombtimer += delta;
        
        if(this.bombRespawnTimer > 3000 && this.bombmade)
        {
            this.bombmade = false;
            var randomX = Math.random() * 10;
            var randomY = Math.random() * 10;  
            this.bomb = this.physics.add.sprite(randomX * 32, randomY * 32, 'bomb');  
        } 

        const BOMBTICKTIME = 5000;
        if (this.bombRespawnTimer > 3000 + BOMBTICKTIME) 
        {
            var blast = this.physics.add.sprite(this.bomb.x, this.bomb.y, "explosion"); 
            blast.play('bang');
            this.bomb.destroy();
            this.bombmade = true;
            this.bombRespawnTimer = 0;
        } 
       


        //bombeffects
        for (let index = 0; index < 16; index++) 
        {
            var spyStressBar = this.allBlackStressBars[index];
            if(this.bomb){
                var stressShock = Math.floor(spyStressBar.stressCausedByBomb(this.bomb.x, this.bomb.y));
            }
            console.log(stressShock);
            spyStressBar.setStressLevel(stressShock);
            spyStressBar.draw();
            //overall stress level

            //dead?

            //defuse
        }
        
        
        //meeting of 2spies
        for (let index = 0; index < 16; index++) 
        {
            this.meeting.isInContact(this.spy1, this.spy2);
        }    
        //peacebuilder meeting spies
        var spyBlack = this.spyBlackGroup.getChildren();
        for (let index = 0; index < 16; index++) 
        {
            this.meeting = new Meeting(this.spy1, spyBlack[index]);
            this.meeting.isInContact(this.spy1, spyBlack[index]);
            if (this.meeting.begins)
            { 
                this.alignmentBar.decrease();
                //console.log(spy[index].trust);
                this.textMeetingSymbol.setText("💬");
                this.lastTalkedBlackSpyIndex = index;    
                while(this.blackTimer > 1500) {
                    spyBlack[index].trustDecrease();
                    this.allBlackTrustBars[index].drawBlack(spyBlack[index].trust);
                    this.blackTimer -= 1500;
                }
                //finish talk if meeting is successful conversion
                if(spyBlack[index].flipped) {
                    this.textMeetingSymbol.setText("");
                }   
            }     
        }

        //white spies
        var spyWhite = this.spyWhiteGroup.getChildren();
        for (let index = 0; index < 16; index++) 
        {
            this.meeting = new Meeting(this.spy1, spyWhite[index]);
            this.meeting.isInContact(this.spy1, spyWhite[index]);
            if (this.meeting.begins)
            { 
                this.alignmentBar.decrease();
                //console.log(spy[index].trust);
                this.textMeetingSymbol.setText("💬");
                this.lastTalkedWhiteSpyIndex = index;    
                while(this.whiteTimer > 1500) {
                    spyWhite[index].trustDecrease();
                    this.allWhiteTrustBars[index].drawWhite(spyWhite[index].trust);
                    this.whiteTimer -= 1500;  
                }
                //finish talk if meeting is successful conversion
                if(spyWhite[index].flipped) {
                    this.textMeetingSymbol.setText("");
                } 
            }
        }
         
        //stop talk if successful
        var lastWhiteSpy = spyWhite[this.lastTalkedWhiteSpyIndex];
        if(!this.meeting.checkOverlap(this.spy1, lastWhiteSpy)) {
            this.textMeetingSymbol.setText("");
        }
       

        var lastBlackSpy = spyBlack[this.lastTalkedBlackSpyIndex];
        if(!this.meeting.checkOverlap(this.spy1, lastBlackSpy)) {
            this.textMeetingSymbol.setText("");
        }
            //spy2
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
            //this.textMeetingSymbol.setText("");
        }

        //change spy
        var spyblack = this.spyBlackGroup.getChildren();
        var spywhite = this.spyWhiteGroup.getChildren();
        for (let index = 0; index < 16; index++) {
            if(spyblack[index].flipped == true ) {
                spyblack[index].changeCoat();              
            }
            if(spywhite[index].flipped == true) {
                spywhite[index].changeCoat();
            }
        }
    }
}