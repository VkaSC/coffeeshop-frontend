import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HTMLCodes } from 'src/app/models/httpResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  token?: string;
  activating = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.authService.activate(this.token || '').then(() => {
        this.toastService.error({
          header: 'Usuario activado',
          message: 'El usuario ha sido activado correctamente. Ahora puede iniciar sesión en la aplicación.',
        });
        this.router.navigate(['/login']);
      }).catch((error) => {
        this.activating = false;
        if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
          this.toastService.error({
            header: 'No autorizado',
            message: 'No esta autorizado para ejecutar esta operación',
          })
        } else {
          this.toastService.error({
            header: 'Error iniciando sesión',
            message: 'Ha ocurrido un error activando el usuario. Inténtelo de nuevo más tarde.',
          });
        }
      });
    });
  }

}
