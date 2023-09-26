import { gql, TypedDocumentNode } from "@apollo/client";

const GET_ROOMS: TypedDocumentNode<GetAllRoomsData> = gql`
  query GetAllRooms {
    getAllRooms {
      id
      name
      participants
    }
  }
`;

const GET_ROOM_BY_ID: TypedDocumentNode<GetRoomByIdData> = gql`
  query GetRoomById($id: ID) {
    getRoomById(id: $id) {
      id
      isPrivate
      name
      steps {
        category {
          mainColor
          name
        }
        step
        participants {
          name
          surname
        }
      }
    }
  }
`;

export {
  GET_ROOM_BY_ID,
  GET_ROOMS,
};
