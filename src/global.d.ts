export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface User {
    name: string;
    surname: string;
    alias?: string;
  }
  interface Room {
    id: number;
    isPrivate: boolean;
    name: string;
    password: string;
    participants: User[];
  }
}
