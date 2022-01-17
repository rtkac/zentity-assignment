export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationAddress {
  streetName: string;
  streetNumber: string;
  suburb: string;
  stateOrProvince: string;
  complex: string;
  postalCode: string;
  city: string;
  country: string;
  addressString: string;
}

export interface Location {
  id: string;
  name: string;
  location: Coordinates;
  address: LocationAddress;
}
