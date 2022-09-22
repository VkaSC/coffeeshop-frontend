import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERROR_STATUS, HTMLCodes } from 'src/app/models/httpResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.css']
})
export class RememberComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl<string | null>('', Validators.required),
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
      this.authService.sendRecoveryEmail(this.form.controls.email.value || '').then((result) => {
        this.toastService.success({
          header: 'Correo enviado',
          message: 'Se ha enviado correctamente el correo electrónico para reestableer la contraseña'
        });
      }).catch((error) => {
        if (error.htmlCode === HTMLCodes.NOT_FOUND) {
          this.toastService.error({
            header: 'Usuario no encontrado',
            message: 'El email no se corresponde con ningún usuario registrado'
          });
        } else {
          this.toastService.error({
            header: 'Error enviando el email',
            message: 'Ha ocurrido un error enviando el email. Inténtelo de nuevo más tarde.'
          });
        }
      });
    }
  }

}
