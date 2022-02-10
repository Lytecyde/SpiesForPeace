import AlignmentBar from "./alignmentBar.js";

export default class Meeting {
    construct(spy1, spy2) {
        this.contact = false;
        this.isInTalks = false;
        this.spy1 = spy1;
        this.spy2 = spy2; 
        this.begins = false;
    }
    
    checkOverlap(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        
        var boundsB = spriteB.getBounds();
        
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    
    }

    isInContact(spy1, spy2) {
        this.begins = false; 
        if (this.checkOverlap(spy1, spy2)) 
        { 
            this.contact = true;           
        }
        else {
            this.contact = false;
            this.isInTalks = false;    
        }
        //event of talking happens 
        if (this.contact && !this.isInTalks) {
            console.log("spy meets spy, there is a cold brush");
            this.isInTalks = true;
            this.begins = true;
        }
        
        return this.isInTalks;  
    }

    poisonAttack(spy) {
        console.log("CROAK!");
        spy.dead();
    }
}