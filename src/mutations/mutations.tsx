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

export {
  CREATE_ROOM,
  ADD_PARTICIPANT_TO_ROOM,
};
