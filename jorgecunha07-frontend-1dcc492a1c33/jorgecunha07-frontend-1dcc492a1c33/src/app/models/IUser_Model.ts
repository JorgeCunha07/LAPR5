export interface IUser_Model {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  userNif: string | null;  // Can be a string or null
  userNumber: string | null;  // Can be a string or null
}
