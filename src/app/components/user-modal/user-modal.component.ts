import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/libs/utils/utils.utils';
import { HTMLCodes, HttpResponse } from 'src/app/models/httpResponse.model';
import User from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogMode, ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @ViewChild('modal') private modal?: ModalComponent
  @Input() title: string = 'Nuevo Usuario';
  mode: DialogMode = DialogMode.New;
  user: User = new User();
  readOnly: boolean = false;
  types = ['Cliente', 'Admin'];
  form = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required]),
    lastname: new FormControl<string | null>('', [Validators.required]),
    email: new FormControl<string | null>('', [Validators.required]),
    type: new FormControl<'Admin' | 'Cliente' | ''>('', [Validators.required]),
    active: new FormControl<boolean>(false),
  });

  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
  ) { }

  open(mode: DialogMode, user?: User) {
    this.mode = mode;
    this.setModel(user);
    this.setTitle();
    this.setReadability();
    return this.modal?.open(mode, {
      centered: true,
      size: 'lg'
    });
  }

  close(reset?: boolean) {
    this.modal?.close();
    if (reset) {
      this.reset();
    }
  }

  dismiss(reset?: boolean) {
    this.modal?.dismiss();
    if (reset) {
      this.reset();
    }
  }

  ngOnInit(): void {
  }

  reset() {
    this.user = new User();
    this.form.reset();
  }

  setTitle() {
    if (this.mode === DialogMode.New) {
      this.title = 'Nuevo Usuario';
    } else if (this.mode === DialogMode.View || this.mode === DialogMode.PartialView) {
      this.title = 'Detalles del Usuario: ' + this.user?.name;
    } else if (this.mode === DialogMode.Edit || this.mode === DialogMode.PartialEdit) {
      this.title = 'Editar Usuario: ' + this.user?.name;
    }
  }

  setReadability() {
    this.readOnly = this.mode === DialogMode.View || this.mode === DialogMode.PartialView;
    this.readOnly ? this.form.controls.name.disable() : this.form.controls.name.enable();
    this.readOnly ? this.form.controls.lastname.disable() : this.form.controls.lastname.enable();
    this.readOnly ? this.form.controls.email.disable() : this.form.controls.email.enable();
    this.readOnly ? this.form.controls.type.disable() : this.form.controls.type.enable();
    this.readOnly ? this.form.controls.active.disable() : this.form.controls.active.enable();
  }

  setModel(user?: User) {
    if (user) {
      this.user = new User(Utils.clone(user));
      console.log(this.user);
      this.form.controls.name.setValue(this.user.name);
      this.form.controls.lastname.setValue(this.user.lastName);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.type.setValue(this.user.type);
      this.form.controls.active.setValue(this.user.active);
    } else {
      this.form.controls.name.setValue('');
      this.form.controls.lastname.setValue('');
      this.form.controls.email.setValue('');
      this.form.controls.type.setValue('');
      this.form.controls.active.setValue(false);
    }
  }

  onClickHandler(event: any) {
    const button = event.target.name;
    if (button === 'save') {
      this.save();
    } else if (button === 'cancel') {
      this.dismiss(true);
    }
  }

  async save() {
    this.user.name = this.form.controls.name.value || '';
    this.user.type = this.form.controls.type.value || 'Cliente';
    this.user.lastName = this.form.controls.lastname.value || '';
    this.user.email = this.form.controls.email.value || '';
    this.user.active = this.form.controls.active.value || false;
    try {
      if(this.mode === DialogMode.New){
        const createdUser = await this.usersService.addUser(this.user);
      } else {
        const updatedUser = await this.usersService.updateUser(this.user);
      }
      const message = DialogMode.Edit ? 'El Usuario se ha actualizado correctamente.' : 'El Usuario se ha creado correctamente.';
      this.toastService.success({
        header: 'Producto Creado',
        message: message,
      });
      this.close(true);
    } catch (error) {
      const err = error as HttpResponse<User>;
      if (err.htmlCode === HTMLCodes.FORBIDDEN || err.htmlCode === HTMLCodes.UNAUTHORIZED) {
        this.toastService.error({
          header: 'No autorizado',
          message: 'No esta autorizado para ejecutar esta operación',
        });
      } else {
        const message = DialogMode.Edit ? 'Ha ocurrido un error actualizando el usuario.' : 'Ha ocurrido un error creando el usuario.';
        this.toastService.error({
          header: 'Error',
          message: message
        });
      }
    }
  }

}
