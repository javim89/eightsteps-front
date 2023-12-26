import { gql, TypedDocumentNode } from "@apollo/client";

const ROOM_SUBSCRIPTION: TypedDocumentNode<GetRoomByIdData> = gql`
  subscription RoomSubscription($id: ID) {
    roomSubscription(id: $id) {
      id
      isPrivate
      name
      participants
      status
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
          answers {
            answer
            isAnswerCorrect
          } 
          status
          showQuestion
        }
        askQuestion
        questions {
          question
          type
          helperText
          id
        }
      }
    }
}`;

export default ROOM_SUBSCRIPTION;
