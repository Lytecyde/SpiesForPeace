export default class Resource {
    constructor(typeCode) {
        this.resource = this.resourceType(typeCode);
    }

    resourceType(typeCode) {
        const RESOURCE_TYPE_ICONS = [
            "💵",
            "💾",
            "🤝",
            "🍸"
        ]; 
        const RESOURCE_TYPE_NAMES = [
            "MONEY",
            "INFORMATION",
            "CONTACT",
            "EXCITEMENT"
            //TODO: add additional resources
            //, "STATUS" //: 4
            //, "INSPIRATION" //: 5
        ];
        return RESOURCE_TYPE_NAMES[typeCode];
    }
}    
