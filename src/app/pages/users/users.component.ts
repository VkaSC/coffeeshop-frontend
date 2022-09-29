import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogMode } from 'src/app/components/modal/modal.component';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal.component';
import { HTMLCodes } from 'src/app/models/httpResponse.model';
import User from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userModal') private userModal?: UserModalComponent
  users?: User[];
  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  new() {
    this.userModal?.open(DialogMode.New)?.then((reason) => {
      this.loadUsers();
    }).catch(reason => {

    });
  }

  view(user: User) {
    this.userModal?.open(DialogMode.View, user)?.then((reason) => {

    }).catch(reason => {

    });
  }

  edit(user: User) {
    this.userModal?.open(DialogMode.Edit, user)?.then((reason) => {
      this.loadUsers();
    }).catch(reason => {

    });
  }

  delete(user: User) {
    this.alertService.alert({
      title: 'Eliminar Usuario',
      message: 'Va a eliminar el usuario ' + user.name + ' ' + user.lastName + '. ¿Seguro?',
    })?.then(() => {
      this.usersService.deleteUser(user).then(() => {
        this.loadUsers();
        this.toastService.success({
          header: 'Usuario Eliminado',
          message: 'El Usuario ha sido eliminado correctamente',
        });
      }).catch((error) => {
        if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
          this.toastService.error({
            header: 'No autorizado',
            message: 'No esta autorizado para ejecutar esta operación',
          });
        } else {
          this.toastService.error({
            header: 'Error',
            message: 'Ha ocurrido un error eliminando el usuario'
          });
        }
      });
    }).catch(() => {

    });
  }

  loadUsers() {
    this.usersService.listUsers({
      expand: true,
    }).then((productsResult: User[] | undefined) => {
      this.users = productsResult;
    }).catch((error) => {
      this.toastService.error({
        header: 'Error',
        message: 'Ha ocurrido un error cargando los usuarios.',
      });
    });
  }

}
