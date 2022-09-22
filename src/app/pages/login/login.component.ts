import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERROR_STATUS, HTMLCodes } from 'src/app/models/httpResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl<string | null>('', Validators.required),
    password: new FormControl<string | null>('', Validators.required),
    remember: new FormControl<boolean>(false),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  onClickHandler() {
    if (this.form.valid) {
      const email = this.form.controls.email.value || '';
      const password = this.form.controls.password.value || '';
      const remember = this.form.controls.remember.value || false;
      this.authService.login(email, password, remember).then(() => {
        this.authService.authorized = true;
        this.router.navigate(['']);
      }).catch((error) => {
        if (error.htmlCode === HTMLCodes.NOT_FOUND || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
          if(error.status === ERROR_STATUS.INACTIVE_USER_STATUS){
            this.toastService.error({
              header: 'Usuario Inactivo',
              message: 'El usuario está inactivo. ¿Quieres que te enviemos una nueva solicitud de activación?', link: {
                text: 'Enviar',
                url: '/activar',
                local: true,
              },
            });
          } else {
            this.toastService.error({
              header: 'Credenciales Incorrectas',
              message: 'El usuario no existe o las credenciales son incorrectas. Compruebe su usuario y contraseña',
            })
          }
        } else {
          this.toastService.error({
            header: 'Error iniciando sesión',
            message: 'Ha ocurrido un error iniciando sesión. Inténtelo de nuevo más tarde.',
          });
        }
      });
    }
  }

}
