import Locations from "./startLocations.js";

export default class Trail {
    constructor(index) {
        this.start = {x: 0, y: 0};
        this.start = this.makeStart(index % 16); //black and white appear on the same locations
        this.end = this.makeEnd();
        this.distance = this.getDistance();
    }

    makeStart(index) {
        console.log(index.toString());
        var starts = [
            {x:4, y:4}, {x:12, y:4}, {x:20, y:4},  {x:28, y:4},
            {x:4, y:12}, {x:12, y:12},{x:20, y:12}, {x:28, y:12},
            {x:4, y:20}, {x:12, y:20},{x:20, y:20}, {x:28, y:20},
            {x:4, y:28}, {x:12, y:28},{x:20, y:28}, {x:28, y:28}
        ];
        var s = starts[Math.floor(starts.length * Math.random())];
        //DEBUG
        var values = Object.values(s);
        var valueX = values[0];
        var valueY = values[1];
        console.log("starts @ :" + values[0] + "     " + values[1]);
        var start = {x:values[0] * 32 + 32, y:values[1] * 32 + 48};
        //this.start.y= starts.startLocations[index];
        
        return start;
    }

    makeEnd() {
        var xRandom = (Math.floor(Math.random() * 3) + 1);
        xRandom = (xRandom * 8) + Math.random() * (- 2) + Math.random() * 2 + 1;
        var yRandom = Math.floor(Math.random() * 4) + 1;
        yRandom = (yRandom * 8) + Math.random() * (- 2) + Math.random() * 2 + 1;
        var ends = {x: 0, y: 0};
        ends.x = this.start.x + (xRandom * 32);
        ends.y = this.start.y + (yRandom * 32); 
        return ends;
    }

    getDistance() {
        //Manhattan distance
        var distance = Math.abs(this.start.x  - this.end.x) + 
        Math.abs(this.start.y  - this.end.y);
        return distance;
    }
    getPath() {

    }

}