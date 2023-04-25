export default class Job {
    constructor() {
        this.title = this.setRandomTitle();
        this.numberOfJobs = 4;
        this.type = Math.random() * this.numberOfJobs;
        this.resource = this.setResource();
    }

    setRandomTitle() {
        var titles = ["Banker", "Programmer", "Police", "Businessman", "Celebrity", "Artist"];
        return titles[this.type];
    }

    setResource() {
        var resources = ["money", "information", "force", "cooperation", "contacts", "fun"];
        return resources[this.type];
    }
    
    
}