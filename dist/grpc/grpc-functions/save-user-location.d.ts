import { Location } from '../../types/types';
interface SaveClientData {
    userId: string;
    location: Location;
    radius: number;
}
export declare const saveUserLocation: (properties: SaveClientData) => void;
export {};
