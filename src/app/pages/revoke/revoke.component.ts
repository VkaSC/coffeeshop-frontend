import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HTMLCodes } from 'src/app/models/httpResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-revoke',
  templateUrl: './revoke.component.html',
  styleUrls: ['./revoke.component.css']
})
export class RevokeComponent implements OnInit {

  token?: string;
  revoking = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.authService.revoke(this.token || '').then(() => {
        this.toastService.error({
          header: 'Usuario eliminado',
          message: 'El usuario ha sido activado eliminado correctamente.',
        });
        this.router.navigate(['/login']);
      }).catch((error) => {
        this.revoking = false;
        if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
          this.toastService.error({
            header: 'No autorizado',
            message: 'No esta autorizado para ejecutar esta operación',
          })
        } else {
          this.toastService.error({
            header: 'Error iniciando sesión',
            message: 'Ha ocurrido un error iniciando sesión. Inténtelo de nuevo más tarde.',
          });
        }
      });
    });
  }

}
