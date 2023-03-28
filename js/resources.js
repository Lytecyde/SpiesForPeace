export default class Resources {
    constructor(typeCode) {
        this.resource = this.resourceType(typeCode);
    }

    resourceType(typeCode) {
        const ResourceTypeCode = [
            "MONEY",
            "INFORMATION",
            "COOPERATION",
            "EXCITEMENT"
            //TODO: add additional resources
            //, "STATUS" //: 4
            //, "INSPIRATION" //: 5
        ];
        return ResourceTypeCode[typeCode];
    }
}    
