//TODO: create start locations for routes
//alsso end locations
//path between locations?
export default class Locations {

  constructor(){
    this.startLocations = 
      [{x:4, y:4}, {x:12, y:4}, {x:20, y:4},  {x:28, y:4},
      {x:4, y:12}, {x:12, y:12},{x:20, y:12}, {x:28, y:12},
      {x:4, y:20}, {x:12, y:20},{x:20, y:20}, {x:28, y:20}]
    ;
    this.locations = this.makeLocations();
  }      
  setLocations (proponents) { 
    
    var h = new Helper();
    var shuffledLocations = h.shuffle(locations);
    var i = 0;
    var l = [];
    var tileSize = {px: 32};
    l = shuffledLocations.slice();
    proponents.forEach(agent => {
      var positionX = (l[i].x ) * tileSize.px ;
      var positionY = (l[i].y ) * tileSize.px ;
      agent.setPosition(positionX, positionY);
      agent.setOrigin(0,0);
      i++;
    });
  }
  makeLocations() {
    var locations = [];
    for (var i = 0; i < 32;i++) {
      for (var j = 0; j < 24; j++){
        if(level[i][j] === 3) {
          locations.push([i, j]);
        }
      }
    }
    return locations;
  }
}