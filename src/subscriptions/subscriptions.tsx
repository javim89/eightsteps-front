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

const ROOM_TIMER_SUBSCRIPTION: TypedDocumentNode<RoomTimer> = gql`
  subscription RoomTimerSubscription($roomTimerSubscriptionId: ID) {
    roomTimerSubscription(id: $roomTimerSubscriptionId) {
      miliseconds
      seconds
      progress
    }
}`;

export { ROOM_SUBSCRIPTION, ROOM_TIMER_SUBSCRIPTION };
