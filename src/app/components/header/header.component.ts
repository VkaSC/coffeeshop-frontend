import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTMLCodes } from 'src/app/models/httpResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onClickHandler() {
    this.authService.logout().then(() => {
      this.router.navigate(['']);
      this.authService.authorized = false;
      this.authService.loggedUser = undefined;
    }).catch((error) => {
      this.authService.authorized = false;
      this.authService.loggedUser = undefined;
      if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
        this.toastService.error({
          header: 'Sin Autorización',
          message: 'No tiene permiso para realizar esta operación.',
        })
      } else {
        this.toastService.error({
          header: 'Error cerrando sesión',
          message: 'Ha ocurrido un error iniciando sesión. Inténtelo de nuevo más tarde.',
        });
      }
    });
  }

}
