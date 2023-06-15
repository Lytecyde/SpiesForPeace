import Spy from "./spy.js"
import Suitcase from "./suitcase.js"

export default class Pickup {
    construct(spy, suitcase) {
        this.contact = false;
        this.isInTalks = false;
        this.spy = spy;
        this.suitcase = suitcase; 
        this.begins = false;
        this.finished = false;
    }
    
    checkOverlap(spy, suitcase) {
        var boundsA = spy.getBounds() ;       
        var boundsB = suitcase.getBounds() ;
        
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    is(spy, suitcase) {
        this.begins = false; 
        if (this.checkOverlap(spy, suitcase)) 
        { 
            console.log("pickup the suitcase");
            //suitcase.destroy();
        }  
    }
}