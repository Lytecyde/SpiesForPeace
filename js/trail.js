import Locations from "./startLocations.js";

export default class Trail {
    constructor(index) {
        //this.start = {x: 0, y: 0};
        this.start = this.makeStart(index % 16); 
        this.end = this.makeEnd();
        this.distance = this.getDistance();
        this.distanceX = this.getDistanceX();
        this.distanceY = this.getDistanceY()
        this.path = this.makePath(this.start, this.end); 
    }

    getStarts() {
        var starts = [
            {x:4, y:4}, {x:12, y:4}, {x:20, y:4},  {x:28, y:4},
            {x:4, y:12}, {x:12, y:12},{x:20, y:12}, {x:28, y:12},
            {x:4, y:20}, {x:12, y:20},{x:20, y:20}, {x:28, y:20}
            //{x:4, y:28}, {x:12, y:28},{x:20, y:28}, {x:28, y:28}
        ];
        return starts;
    }

    makeStart(index) {
        //console.log(index.toString());
        var starts = this.getStarts();
        var randomNumber = starts[Math.floor(starts.length * Math.random())];
        //DEBUG
        var values = Object.values(randomNumber);
        var valueX = values[0];
        var valueY = values[1];
        console.log("starts @ :" + values[0] + "     " + values[1]);
        var start = {x:values[0] * 32 + 16, y:values[1] * 32 + 32};
       
        
        return start;
    }

    makeEnd () {
        const tilesPerBlock = 8;
        var starts = this.getStarts();
        do{ 
            var randomEnd = starts[Math.floor(starts.length * Math.random())];
        }
        while(((randomEnd.x == this.start.x)  
                && (randomEnd.y == this.start.y) )
                );
        var ends = {x: randomEnd.x * 32 + 16, y: randomEnd.y * 32  + 32} ;

        return ends;
    }

    getSpeed() {
        if(this.getDistanceX >= this.getDistanceY) {
            return (this.getDistanceX /8);
        } else {
            
            return (this.getDistanceY / 8);
        }
        
    }

    getDistanceX () {
        return Math.abs(this.start.x  - this.end.x);
    }

    getDistanceY () {
        return Math.abs(this.start.y  - this.end.y);
    }

    getDistance () {
        //Manhattan distance
        var distance = Math.abs(this.start.x  - this.end.x) + 
        Math.abs(this.start.y  - this.end.y);
        return distance;
    }
 
    makePath (start, end) {
        var line1 = new Phaser.Curves.Line([start.x, start.y, start.x, end.y]);
        var line2 = new Phaser.Curves.Line([start.x, end.y, end.x, end.y]); 
        var path = new Phaser.Curves.Path();
        path.add(line1);
        path.add(line2);
        return path; 
    }

    getPath() {
        return this.path;
    }

}