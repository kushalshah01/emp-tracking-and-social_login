export class PremisesModel {
    id: string;
    name: string;
    country: string;
    location: string;
    capacity: number;
    floorPlan: any;
    noOfQr: number;
    isActive: boolean;
    constructor(init?: Partial<PremisesModel>) {
        Object.assign(this, init);
    }
}

export class FileData {
    name: string;
    lastModified: any;
    lastModifiedDate: any;
    size: any;
    type: any;
    webkitRelativePath: any;
}


