export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  enum RoomStatusEnum {
    NEW = "NEW",
    PLAYING = "PLAYING",
    FINISHED = "FINISHED",
  }
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
    helperText: string
  }
  interface ParticipantWithAnswer {
    user: User,
    bot: UserBot,
    answerOne: Boolean,
    answerTwo: any
  }
  interface Step {
    participants: ParticipantWithAnswer[];
    step: number;
    category: Category;
    question: Question;
  }

  interface Room {
    id: string;
    isPrivate: boolean;
    name: string;
    password: string;
    status: RoomStatusEnum;
    steps: Step[];
    participants: number;
    showQuestion: boolean;
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
