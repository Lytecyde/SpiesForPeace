import AlignmentBar from "./alignmentBar.js";
import Spy from "./spy.js"

export default class Meeting {
    construct(spy1, spy2) {
        this.contact = false;
        this.isInTalks = false;
        this.spy1 = spy1;
        this.spy2 = spy2; 
        this.begins = false;
        this.finished = false;
    }
    
    checkOverlap(spy1, spy2) {
        var boundsA = spy1.getBounds() ;
        
        var boundsB = spy2.getBounds() ;
        
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    
    }

    isInContact(spy1, spy2) {
        this.begins = false; 
        if (this.checkOverlap(spy1, spy2)) 
        { 
            this.contact = true;
            this.finished = false;           
        }
        else {
            this.contact = false;
            this.isInTalks = false;  
        }
        //event of talking happens 
        if (this.contact && !this.isInTalks) {
            //console.log("spy meets spy, there is a cold brush");
            this.isInTalks = true;
            this.begins = true;
        }else {
            this.finished = true;
        }
        
        return this.isInTalks;  
    }

    poisonAttack(spy) {
        console.log("CROAK!");
        spy.dead();
    }
}