import { gql, TypedDocumentNode } from "@apollo/client";

interface Data {
  getAllRooms: Room[];
}

const GET_ROOMS: TypedDocumentNode<Data> = gql`
  query GetAllRooms {
    getAllRooms {
      id
      name
      participants {
        id
      }
    }
  }
`;

const GET_ROOM_BY_ID = gql`
  query GetRoomById($id: ID) {
    getRoomById(id: $id) {
      id
      isPrivate
      name
      participants {
        name
        surname
      }
    }
  }
`;

export {
  GET_ROOM_BY_ID,
  GET_ROOMS,
};
