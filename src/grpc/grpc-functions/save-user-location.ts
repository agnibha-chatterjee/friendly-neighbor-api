import {client} from '../grpc-client'

interface SaveClientData {
  userId: string
  location: Location
  radius: number
}

export const saveUserLocation = (properties: SaveClientData) => {
     client.saveUserLocation(
    {
      userId: properties.userId,
      location: properties.location,
      radius: properties.radius,
    },
    (err: string, data: { success: boolean }) => {
      if (err) console.log(`ERROR - ${err}`);
      if (data.success) {
        console.log(`Updated user - ${properties.userId}`, data);
      }
    }
  );
}
