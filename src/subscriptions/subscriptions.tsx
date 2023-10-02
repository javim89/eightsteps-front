import { gql, TypedDocumentNode } from "@apollo/client";

const ROOM_SUBSCRIPTION: TypedDocumentNode<GetRoomByIdData> = gql`
  subscription RoomSubscription($id: ID) {
    roomSubscription(id: $id) {
      id
      isPrivate
      name
      participants
      steps {
        category {
          mainColor
          name
        }
        step
        participants {
          name
          surname
          alias
        }
      }
    }
}`;

export default ROOM_SUBSCRIPTION;
