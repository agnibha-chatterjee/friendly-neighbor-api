export type Location = {
  latitude: number;
  longitude: number;
};

export enum RequestType {
  Request = 'request',
  Offering = 'offering',
}

export type FindNearbyRequestsData = {
  requests: Array<{
    postId: string;
    distance: number;
  }>;
  metaResult: {
    success: boolean;
  };
};
