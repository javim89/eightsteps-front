import { RoomStatusEnum, UserStatusEnum, QuestionsTypeEnum } from "./constants/constants.tsx";

export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface User {
    id?: string;
    name?: string;
    surname?: string;
    alias?: string;
  }

  interface UserBot {
    id?: string;
    name?: string;
    surname?: string;
    alias?: string;
  }

  interface Category {
    name: string;
    mainColor: string;
  }

  interface Question {
    id: string,
    question: string,
    helperText: string,
    type: QuestionsTypeEnum
  }

  interface Answer {
    answer: any,
    isAnswerCorrect: boolean,
  }
  interface ParticipantWithAnswer {
    user: User,
    bot: UserBot,
    answers: Answer[]
    status: UserStatusEnum
    showQuestion: boolean
  }
  interface Step {
    participants: ParticipantWithAnswer[];
    step: number;
    category: Category;
    askQuestion: number;
    questions: Question[];
  }

  interface Room {
    id: string;
    isPrivate: boolean;
    name: string;
    password: string;
    status: RoomStatusEnum;
    steps: Step[];
    participants: number;
    currentStep: number;
  }

  interface GetAllRoomsData {
    getAllRooms: Room[];
  }

  interface GetRoomByIdData {
    getRoomById: Room;
    roomSubscription?: Room
  }

  interface RoomsStateI {
    openDialog: boolean;
    title?: string;
    contentText?: string;
    validationSchema: any;
    onSubmit: any;
    bodyForm: any;
    loadingButtonText?: string;
  }

}
