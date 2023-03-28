export default class Operation {
    constructor() {
        this.title = this.makeRandomTitle();
        this.makeOperation(this.title);
        this.run();
    }

    makeRandomTitle() {
        var title = ["bomber","surveiller","recruiter","prepper"];
        return title[Math.floor(Math.random() * title.length)];
    }

    makeOperation() {

    }

    run() {
        
    }
    
}