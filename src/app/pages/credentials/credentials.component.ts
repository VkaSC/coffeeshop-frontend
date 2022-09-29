import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { StrUtils } from 'src/app/libs/utils/str.utils';
import { HTMLCodes } from 'src/app/models/httpResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  title = 'Cambiar Contraseña';
  token?: string;
  create: boolean = false;

  form = new FormGroup({
    password: new FormControl<string | null>('', Validators.required),
    confirm: new FormControl<string | null>('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {

  }

  ngOnInit(): void {
    this.route.url.subscribe((url: UrlSegment[]) => {
      const result = url.filter(element => {
        return StrUtils.containsIgnorecase(element.path, 'crear');
      });
      this.create = result.length > 0;
      if (this.create) {
        this.title = 'Establecer Contraseña';
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  onClickHandler() {
    if (this.form.valid) {
      const email = this.form.controls.password.value || '';
      const password = this.form.controls.confirm.value || '';
      if (email !== password) {
        this.toastService.error({
          header: 'Error en la confirmación',
          message: 'La Contraseña y la confirmación de la contraseña no coinciden.',
        });
        return;
      }
      this.authService.recovery(this.token || '', password).then(() => {
        this.toastService.error({
          header: 'Contraseña cambiada',
          message: 'La Contraseña se ha cambiado correctamente. Ahora puede iniciar sesión en la aplicación.',
        });
        this.router.navigate(['/login']);
      }).catch((error) => {
        if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
          this.toastService.error({
            header: 'No autorizado',
            message: 'No esta autorizado para ejecutar esta operación',
          })
        } else {
          this.toastService.error({
            header: 'Error cambiando contraseña',
            message: 'Ha ocurrido un error cambiando la contraseña. Inténtelo de nuevo más tarde.',
          });
        }
      });
    }
  }

}
