type RoomData = {
code: string;
building: string;
floor: number;
room:string;
ar_coords: {x:number; y:number; z: number };
};

const mockRooms: Record<string, RoomData> = {
   CS101: {
    code: 'CS101',
    building: 'IT Block',
    floor: 2,
    room: 'G204',
    ar_coords: {x:0, y: 0, z: -3},
      },


};