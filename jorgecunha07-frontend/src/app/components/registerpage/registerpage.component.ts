import { Component } from '@angular/core';
import { UserService } from '../../IService/services/user.service';
import { ISignUpRequestDTO } from "../../dto/ISignUpRequestDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent {
  newUser: ISignUpRequestDTO = { firstName: '', lastName: '', email: '', password: '', userNif: '', userNumber: '' };
  registrationResponse: any;
  isRegistrationSuccessful: boolean | null = null;
  consentGiven: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    if (!this.consentGiven) {
      alert('Por favor, dê o seu consentimento antes de se registrar.');
      return;
    }

    this.userService.signUpRequest(this.newUser).subscribe({
      next: (response) => {
        this.registrationResponse = response;
        this.isRegistrationSuccessful = true;
        console.log('User Request Created', response);
      },
      error: (error) => {
        console.error('Error registering user', error);
        this.isRegistrationSuccessful = false;
      }
    });
  }

  downloadPDFs(): void {

    // Logic to download multiple PDFs
      //window.open('./assets/LAPR_TP/Conformidade_RGPD_RobDroneGo.pdf', '_blank');
      //window.open('./assets/LAPR_TP/ConsentimentoRGPDProjetoRobDroneGoISEP-20231121-190238.pdf', '_blank');
      //window.open('./assets/LAPR_TP/LAPR5_RGPD.pdf', '_blank');
      window.open('./assets/LAPR_TP/PoliticaDePrivacidadeRobDroneGoISEP.pdf', '_blank');

  }

  toggleConsent(): void {
    this.consentGiven = !this.consentGiven;
  }

  goBack(){
    this.router.navigate(['mainpage']);
  }
}
