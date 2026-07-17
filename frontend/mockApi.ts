type RoomData = {
code: string;
building: string;
floor: number;
room:string;
ar_coords: {x:number; y:number; z: number };
building_coords: {lat:number, lng:number }
};

const mockRooms: Record<string, RoomData> = {
   G204: {
    code: 'G204',
    building: 'IT Block',
    floor: 2,
    room: 'G204',
    ar_coords: {x:0, y: 0, z: -3},
    building_coords: { lat: -25.7545, lng: 28.2314 },
      },


};


export function fetchRoomData(code: string): Promise<RoomData | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRooms[code.toUpperCase()] ?? null);
    }, 500); // fake network delay
  });
}