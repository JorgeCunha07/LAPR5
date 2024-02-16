import {Repo} from "../../core/infra/Repo";
import {SignUpRequest} from "../../domain/userActions/signUpRequest";


export default interface ISignUpRequestRepo extends Repo<SignUpRequest> {
  save(signUpRequest: SignUpRequest): Promise<SignUpRequest>;
  findByEmail(email: string): Promise<SignUpRequest>;
  delete(signUpRequest: SignUpRequest): Promise<boolean>;
  exists(signUpRequest: SignUpRequest): Promise<boolean>;
  getAll(): Promise<SignUpRequest[]>;
}
