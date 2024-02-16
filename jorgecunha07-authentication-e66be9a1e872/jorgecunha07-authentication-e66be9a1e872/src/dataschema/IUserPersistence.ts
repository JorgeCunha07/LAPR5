export interface IUserPersistence {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
  role: string;
  userNif: string | null;  // Can be a string or null
  userNumber: string | null;  // Can be a string or null
}
