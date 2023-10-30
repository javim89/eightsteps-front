import { gql, TypedDocumentNode } from "@apollo/client";

const ROOM_SUBSCRIPTION: TypedDocumentNode<GetRoomByIdData> = gql`
  subscription RoomSubscription($id: ID) {
    roomSubscription(id: $id) {
      id
      isPrivate
      name
      participants
      status
      showQuestion
      currentStep
      steps {
        category {
          mainColor
          name
        }
        step
        participants {
          user {
            name
            surname
            alias
          }
          bot {
            name
            surname
            alias
          }
        }
        question {
          id
          question
          helperText
        }
      }
    }
}`;

export default ROOM_SUBSCRIPTION;
