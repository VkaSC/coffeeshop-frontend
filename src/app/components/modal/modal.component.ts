import { Component, OnInit, ViewChild, Injectable, TemplateRef, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export enum DialogMode {
  New,
  View,
  PartialView,
  Edit,
  PartialEdit,
  Delete
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {

  opened: boolean = false;
  @Input() title: string = '';
  @ViewChild('modal') private modalContent?: TemplateRef<ModalComponent>
  private modalRef?: NgbModalRef

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  open(mode?: DialogMode, options?: NgbModalOptions) {
    return new Promise<boolean>((resolve, reject) => {
      if (!options) {
        options = {};
      }
      options.scrollable = true;
      this.opened = false;
      this.modalRef = this.modal.open(this.modalContent, options);
      this.modalRef.result.then(resolve, reject);
    });
  }

  close() {
    if (this.modalRef) {
      this.modalRef.close('closed');
      this.opened = false;
    }
  }

  dismiss() {
    if (this.modalRef) {
      this.modalRef.dismiss('dismissed');
      this.opened = false;
    }
  }

  isOpen() {
    return this.opened;
  }

}
