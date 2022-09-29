import { Component, OnInit, isDevMode, ViewChild } from '@angular/core';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import DateUtils from './libs/utils/date.utils';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cafetería IES Profesor Tomás Hormigo';
  @ViewChild('alertModal') alertModal?: AlertModalComponent;

  constructor(
    public authService: AuthService,
    public alertService: AlertService,
  ){

  }

  get mainStyle(){
    return this.authService.loggedUser?.type === 'Admin' ? 'main-admin' : 'main';
  }

  ngOnInit() {
    setTimeout(() => {
      this.alertService.setModal(this.alertModal);
    }, 500);
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
