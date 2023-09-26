export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface User {
    name: string;
    surname: string;
    alias?: string;
  }

  interface Category {
    name: string;
    mainColor: string;
  }

  interface Step {
    participants: User[];
    step: number;
    category: Category;
  }
  interface Room {
    id: number;
    isPrivate: boolean;
    name: string;
    password: string;
    steps: Step[];
    participants: number;
  }

  interface GetAllRoomsData {
    getAllRooms: Room[];
  }

  interface GetRoomByIdData {
    getRoomById: Room;
  }

}
