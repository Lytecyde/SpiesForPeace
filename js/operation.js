export default class Operation {
    constructor() {
        this.title = this.makeRandomTitle();
    }
    
    makeRandomTitle(){
        var title = ["bomb"];
        return title[Math.random() * title.length];
    }
}