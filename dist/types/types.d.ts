export declare type Location = {
    latitude: number;
    longitude: number;
};
export declare enum RequestType {
    Request = "request",
    Offering = "offering"
}
export declare enum OrderStatus {
    Created = "created",
    Ongoing = "ongoing",
    Complete = "complete"
}
export declare type FindNearbyRequestsData = {
    requests: Array<{
        postId: string;
        distance: number;
    }>;
    metaResult: {
        success: boolean;
    };
};
