import { gql } from "@apollo/client";

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String){
    createRoom(name: $name) {
      id 
    }
  }
`;

const ADD_PARTICIPANT_TO_ROOM = gql`
  mutation AddParticipantToRoom($roomId: ID, $alias: String){
    addParticipantToRoom(id: $roomId, alias: $alias) {
      id 
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($alias: String) {
    createUser(alias: $alias) {
      token
    }
  }
`;

const SAVE_AND_CHECK_ANSWER = gql`
  mutation SaveAndCheckAnswer($answer: Any, $roomId: ID) {
    saveAndCheckAnswer(answer: $answer, roomId: $roomId)
  }
`;
export {
  CREATE_ROOM,
  ADD_PARTICIPANT_TO_ROOM,
  CREATE_USER,
  SAVE_AND_CHECK_ANSWER,
};
