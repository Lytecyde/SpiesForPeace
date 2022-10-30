export default class CityCreator {
    avenue = [];
    city = [];
    constructor() {
        this.createCity();
    };

    createAvenue () {
      var house = [
        [3,3,3,3,3,6,6,3],
        [0,0,0,0,3,2,2,3],
        [0,0,0,0,3,2,2,3],
        [0,0,0,0,3,2,2,3],
        [0,4,4,0,3,2,2,3],
        [3,3,3,3,3,6,6,3],
        [1,1,1,1,7,8,8,7],
        [1,1,1,1,7,8,8,7]
      ];

      var park = [
        [3,3,3,3,3,6,6,3],
        [9,9,9,9,3,2,2,3],
        [9,9,9,9,3,2,2,3],
        [9,9,9,9,3,2,2,3],
        [9,9,9,9,3,2,2,3],
        [3,3,3,3,3,6,6,3],
        [1,1,1,1,7,8,8,7],
        [1,1,1,1,7,8,8,7]
      ];
      
      var promenade = [
        [3,3,3,3,3,6,6,3],
        [9,3,3,9,3,2,2,3],
        [3,3,3,3,3,2,2,3],
        [3,3,3,3,3,2,2,3],
        [9,3,3,9,3,2,2,3],
        [3,3,3,3,3,6,6,3],
        [1,1,1,1,7,8,8,7],
        [1,1,1,1,7,8,8,7]
      ];
      //TODO park
      //carpark/promenade/plaza
      
      var rowsinhouse = 8;
      var avenue = [];
      
      var a = [];
      var randomBlock = Math.floor(Math.random() * 4 );
      var recreationals = [park, promenade]; 
      var recreationalSpaces = recreationals.length;
      var randomRecreation = 
        Math.random() > (1 / recreationalSpaces) ?
        park.slice():
        promenade.slice();
      
      for ( var j = 0; j < rowsinhouse; j++) {
        //console.log(avenue);
        //TODO: makeBlocks () {};
        var block = [];
        
        for (let i = 0; i < 4; i++) {
          block[i] = randomBlock == i ? 
            randomRecreation[j] : house[j];  
        };
        
        a = a.concat(block[0], block[1], block[2], block[3]);
      }
      avenue = a;
      this.avenue = avenue.slice();
      return avenue;
    };

    createCity() {
      var avenue = [];
      var avenues = 3;

      var city = [];
      //console.log(this.avenue.length);
      for (var i = 0; i < avenues; i++) {   
        avenue = this.createAvenue();
        city = city.concat(avenue);
      }
      //console.log(this.city.length);
      this.city = city;
    }

    getLevel() {
      //console.log("city "  + this.city);
      return this.city;
    }
}