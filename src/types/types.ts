export type Location = {
  latitude: number;
  longitude: number;
};

export enum RequestType {
  Request = 'request',
  Offering = 'offering',
}

export enum OrderStatus {
  Created = 'created',
  Ongoing = 'ongoing',
  Complete = 'complete'
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
