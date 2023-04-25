export default class Resource {
    RESOURCE_TYPE_NAMES = [
        "MONEY",
        "INFORMATION",
        "COOPERATION",
        "EXCITEMENT"
        //TODO: add additional resources
        //, "STATUS" //: 4
        //, "INSPIRATION" //: 5
    ];

    RESOURCE_TYPE_ICONS = [
        "💵",
        "📂",//💾
        "🤝",
        "🍸"
    ]; 

    constructor(typeCode) {
        this.resource = this.resourceType(typeCode);
    }

    constructor() {
        this.resource = this.resourceType(
            Math.floor(
                Math.random() * 
                this.RESOURCE_TYPE_NAME.length
            )
        );
    }

    resourceType(typeCode) {
        
        return RESOURCE_TYPE_NAME[typeCode];
    }
}    
