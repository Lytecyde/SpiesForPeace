import Level from "./level.js"
import AlignmentBar from "./alignmentBar.js"
import Meeting from "./meeting.js";
import Spy from "./spy.js";
import StressBar from "./stressBar.js";
import TrustBar from "./trustBar.js";
import CityCreator from "./cityCreator.js";
import Alignment from "./alignment.js";
import LifeBar from "./lifeBar.js";
import Bomb from "./bomb.js";
import Suitcase from "./suitcase.js";
export default class City extends Phaser.Scene 
{
    constructor(){
        super({ key: 'City', physics: { default: 'arcade', arcade: { gravity: { y: 0 } } } });
        this.level;
        this.alignmentBar;
        this.spy1;
        this.spy2;
        this.isInContact;
        this.isInTalks;
        this.meeting;
        this.brush;
        this.stressBar;
        this.lifeBar;

        this.spyGroup;
        this.allBlackStressBars = [];
        this.allWhiteStressBars = [];
        this.blackTimer = 0;
        this.whiteTimer = 0;
        this.blastImage;
        this.bombers = [];
        this.bomb;
        this.bombtimer = 0;
        this.bombRespawnTimer = 0;
        this.BOMBTICKTIME = 3000;
        this.bombmade = true;
        this.city;
        this.textMeetingSymbol;
        this.deadSprite;
        this.alignment = new Alignment(2);
        this.lastTalkedWhiteSpyIndex = 9;
        this.lastTalkedBlackSpyIndex = 9;
        this.tweens;
        this.graphics;
        this.bombs =[];
        this.monitoring;
        this.monitoringText = "HELLO, WORLD MONITOR";
        this.suitcase;
        this.preppers;
        this.spies = [];
        this.suitcaseGroup;
        this.suitcaseRespawnTimer = 0;
        this.isSuitcasePlaced = true;
        this.pickup;
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
        this.load.spritesheet(
            'suitcase',
            '/assets/sprites/suitcase.png',
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

    countBombers() {
        const bombers = this.spies.filter(spy => spy.mission.operation.title === 'bomber').length;
        console.log(bombers);
        return bombers;
    }

    countPreppers() {
        const prepperLength = this.spies.filter(spy => spy.mission.operation.title === 'prepper').length;
        return prepperLength;
    }

    create (scene) {
        var levelMapData = this.createLevelMapCity(scene);
        var mapCity = this.make.tilemap({data: levelMapData, tileWidth: 32, tileHeight: 32});
        var tiles = mapCity.addTilesetImage('city-tiles');
        var layer = mapCity.createLayer(0, tiles, 0, 0);
        //this.graphics = this.add.graphics();
        var timeline = this.tweens.createTimeline();

        this.anims.create({
            key: 'suitcaseplaced',
            frames: this.anims.generateFrameNumbers('suitcase', {
              start: 0,
              end: 0
            }),
            defaultTextureKey: null,
            // time
            delay: 0,
            frameRate: 24,
            duration: 5000,
            //skipMissedFrames: true,
  
            // repeat
            repeat: 0,
            repeatDelay: -1,
            yoyo: false,
  
            // visible
            showOnStart: true,
            hideOnComplete: true
          });

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
    
        this.monitoring = this.add.text(600, 50, this.monitoringText, {fontSize: '32px', color: '#000000', backgroundColor: '#ffffff'});
        this.add.existing(this.monitoring);

        // alignments by % levels
        this.alignmentBar = new AlignmentBar(this);
        this.alignmentBar.decrease();
        this.alignmentBar.draw();

        

        //spies
        this.spy1 = new Spy(this, "baddies", 2, 900, this.alignment.PEACE);
        this.textMeetingSymbol = this.add.text(this.spy1.x , this.spy1.y, '', { font: '32px Courier', fill: '#000000' });

        this.spy2 = new Spy(this, "baddies", 3, 700, this.alignment.PEACE);  


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

        this.spyGroup = this.physics.add.group();
        this.suitcaseGroup = this.physics.add.group();
        this.spyBlackGroup = this.add.group(group_config);    
        this.spyWhiteGroup = this.add.group(group_config);
        this.preppers = this.add.group(group_config);
        //DOING: set random locations for each spy

        var numberOfSpies = 3;
        var timelinesBlack = [];
        var timelinesWhite = [];
       
        console.log("make spies");
        for (let index = 0; index < numberOfSpies; index++) {
            console.log("movement");
            //timelinesBlack[index] = this.tweens.createTimeline();
            //timelinesWhite[index] = this.tweens.createTimeline();
            
            var codenameBlack = index;
            var blackSpy = new Spy(this, "baddies", 0, codenameBlack, this.alignment.BLACK);
            this.spyGroup.add(blackSpy);
            var spy = blackSpy;
            var randomblack = Math.random();
            timelinesBlack[index] =  randomblack > 0.5 ? spy.movementRight() : spy.movementLeft(); 
            timelinesBlack[index]; 
            
            var codenameWhite = index + numberOfSpies;
            var whiteSpy = new Spy(this, "baddies", 5, codenameWhite, this.alignment.WHITE);
            this.spyGroup.add(whiteSpy);
            var spy = whiteSpy;
            var randomwhite = Math.random();
            timelinesWhite[index] = randomwhite > 0.5 ? spy.movementRight() : spy.movementLeft(); 
            timelinesWhite[index];
        }
        //spies

        this.spies = this.spyGroup.getChildren();


        this.makeBombers();
        //makepreppers
        this.spies.forEach(function(spy){
            if(spy.mission.operation.title === "prepper") {
                    this.preppers.add(spy);
            }
        }, this);

        this.monitoringText = "prep" + this.preppers.length;


        this.preppers.children.iterate(function(spy) {
            //create suitcase
            //place suitcase on the journey of the spy
            this.suitcase = new Suitcase(this, spy, 'suitcase', 0);            
            this.suitcaseGroup.add(this.suitcase);
            spy.mission.operation.makeOperation("prepper");
            spy.mission.operation.run();
        }, this);

        //💭!!

        this.physics.add.collider(this.suitcaseGroup, this.spyGroup, function(suitcase, spy) {
            
            if(suitcase.spy.codename !== spy.codename){
                switch (suitcase.contains.resource){ 
                    case "MONEY" : {
                        console.log("money 1 gold");
                        spy.money++;
                        break;
                    }
                    case "INFORMATION" : {
                        console.log("info");
                        spy.info++;
                        break;
                    }
                    case "CONTACT" : {
                        console.log("contact for collab");
                        spy.contacts++;
                        break;
                    }
                    case "EXCITEMENT": {
                        console.log("fun time");
                        spy.excitement++;
                        break;
                    }
                    default : {
                        console.log("bomb terra");
                        spy.bomb++;
                    }
                }
                suitcase.destroy();
            }
        });         
        //BARS
        
        //STRESS updates spy 
        //FIXME: spy's stressbar 
        this.stressBar = new StressBar(this.spy1.x, this.spy1.y, this);
        this.stressBar.draw();
        //LIFE updates
        this.lifeBar = new LifeBar(this.spy1.x, this.spy1.y, this);
        this.lifeBar.draw();
        //CURSORKEYS
        this.cursors = this.input.keyboard.createCursorKeys();


        this.time.addEvent({
            delay: 5000, 
            callback: () => {
                this.isSuitcasePlaced = false;
                this.makePreppers(); 
                console.log("preppers" + this.countPreppers());
                var randomIndex = Math.floor(Math.random() * this.countPreppers());
                var prepper = this.preppers[randomIndex];
                if(this.countPreppers() > 0 && !this.isSuitcasePlaced) {
                    console.log(" prepper " + randomIndex + " places the suitcase");
                    
                    this.suitcase = new Suitcase(this, prepper, 'suitcase', 0);
                    this.add.existing(this.suitcase);
                    this.suitcase.create();
                    this.suitcaseGroup.add(this.suitcase);
                    //this.play(this.suitcase);
                    console.log("suitcase placed @ " + prepper.x + "  "  + prepper.y);
                    //this.isSuitcasePlaced = true;
                };
                
                //this.suitcaseRespawnTimer = 0;
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 3000, 
            callback: () => {
                this.makeBombers(); 
                console.log("bombers" + this.countBombers());
                var bomberIndex = Math.floor(Math.random() * this.countBombers());
                var bomber = this.bombers[bomberIndex];
                if(this.countBombers() > 0) {
                    console.log(" bomber " + bomberIndex + " places the bomb");
                    this.bomb = new Bomb(this, bomber.x, bomber.y, 'bomb');
                    this.add.existing(this.bomb);
                    this.bomb.spawn();
                    console.log("bomb placed @ " + bomber.x + "  "  + bomber.y);   
                }
                this.bombRespawnTimer = 0;
            },
            callbackScope: this,
            loop: true
        });
    }//CREATE() ENDS

    makeBombers(){  
        this.bombers = []
        this.spies.forEach( (spy) => {
            if(spy.mission.operation.title == "bomber") {
                this.bombers.push(spy); 
            }
        });
        //shuffle the array
        this.bombers = this.bombers.sort((a, b) => 0.5 - Math.random());
    }

    makePreppers(){  
        this.preppers = []
        this.spies.forEach( (spy) => {
            if(spy.mission.operation.title == "prepper") {
                this.preppers.push(spy); 
            }
        });
        //shuffle the array
        this.preppers = this.preppers.sort((a, b) => 0.5 - Math.random());
    }

    update (time, delta) {
        
        this.monitoringText = this.bombers.length + "  p:" + this.countPreppers();
        this.monitoring.setText(this.monitoringText);
        //graphics.clear();
        
        this.blackTimer += delta;
        this.whiteTimer += delta;
        //player spy movement
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
        if (this.spy1.x > 32 * 8 * 4) {
            this.spy1.x = 32 * 8 * 4;
        }
        if (this.spy1.x < 0) {
            this.spy1.x = 0;
        }
        if (this.spy1.y > 32 * 8 * 3) {
            this.spy1.y = 32 * 8 * 3;
        }
        if (this.spy1.y < 0) {
            this.spy1.y = 0;
        }   

        //
        this.stressBar.draw(this.spy1.x, this.spy1.y); 
        this.lifeBar.draw(this.spy1.x, this.spy1.y)

        
        //bomb
        this.bombRespawnTimer += delta;
        time = time + delta;
        this.suitcaseRespawnTimer += delta; 
        /*console.log("bombers" + this.bombers.length);
        var respawnTimeTEST = 3000;//(Math.floor(Math.random() * 15) * 100) + 1500;
        if(this.bombRespawnTimer > respawnTimeTEST && this.bombmade)
        {
            //pick a bomber from those remaining spies
            this.makeBombers(); 
            console.log(this.countBombers());
            var bomberIndex = Math.floor(Math.random() * this.countBombers());
            var bomber = this.bombers[bomberIndex];
            if(this.countBombers() > 0) {
                console.log(" bomber " + bomberIndex + " places the bomb");
                this.bomb = new Bomb(this, bomber.x, bomber.y, 'bomb');
                this.add.existing(this.bomb);
                this.bomb.spawn();
                console.log("bomb placed @ " + bomber.x + "  "  + bomber.y);   
            }
            this.bombRespawnTimer = 0;
        }
        */
        this.suitcaseGroup = this.physics.add.group();
        this.suitcaseGroup.children.iterate(function(s) {
            this.add.existing(s);
            s.create();
        }, this);

        this.bombtimer += delta;
        //console.log("bombtimer " + this.bombtimer);
        //peacebuilder meeting spies and converting them
        this.spies.forEach(function(spy){
            this.meeting = new Meeting(this.spy1, spy);
            this.meeting.isInContact(this.spy1, spy);
            if (this.meeting.begins) 
            { 
                this.alignmentBar.decrease();
                //console.log(spy[index].trust);
                this.textMeetingSymbol.setText("💬");
                
                while(this.blackTimer > 1500) {
                    spy.trustDecrease();
                    spy.trustBar.drawBlack(spy.trust);
                    this.blackTimer -= 1500;
                }
                //finish talk if meeting ends with a successful conversion
                if(spy.flipped) {
                    this.textMeetingSymbol.setText("");
                    spy.mission.operation.title = "peaceworker";
                }   
            }
        }, this);

        //suitcase placement
        //this.preppers.clear(true, true);

        this.spies.forEach(function(spy){
            spy.hoverIndicators();
        }, this);

        //ALIGNMENTBAR WORK    
        if (this.meeting.begins)
        {
            //console.log("al decrease");
            this.alignmentBar.decrease();
        } 
        
        //TRY: autoconvert opposing player to your side
        if(this.spy2.flipped == true) {
            console.log("changed frame " + this.spy2.f);
            this.spy2.changeCoat();
            let baddieIndices = [2, 4];//spy sprite frames
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
        this.spies.forEach(function(spy) {
            if(spy.flipped == true ) {
                spy.changeCoat();              
            } 
        }, this);
        
    }
}