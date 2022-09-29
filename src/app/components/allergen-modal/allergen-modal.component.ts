import { Component, Input, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Utils } from 'src/app/libs/utils/utils.utils';
import Allergen from 'src/app/models/allergen-model';
import { HTMLCodes, HttpResponse } from 'src/app/models/httpResponse.model';
import Product from 'src/app/models/product.model';
import { AllergensService } from 'src/app/services/allergens.service';
import { ToastService } from 'src/app/services/toast.service';
import { DialogMode, ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-allergen-modal',
  templateUrl: './allergen-modal.component.html',
  styleUrls: ['./allergen-modal.component.css']
})
export class AllergenModalComponent implements OnInit {

  @ViewChild('modal') private modal?: ModalComponent
  @Input() title: string = 'Nuevo Alérgeno';
  mode: DialogMode = DialogMode.New;
  allergen: Allergen = new Allergen();
  readOnly: boolean = false;
  icon?: string | null;
  imageSrc?: string;
  imageFile?: string;
  changedImage = false;
  form = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required]),
    file: new FormControl<any>(null),
    details: new FormControl<string | null>('', [Validators.required]),
  });

  constructor(
    private allergensService: AllergensService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer,
  ) {
  }

  open(mode: DialogMode, allergen?: Allergen) {
    this.mode = mode;
    this.setModel(allergen);
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

  preview(event: any) {
    this.changedImage = true;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.imageFile = file;
    } else {
      this.imageFile = undefined;
    }
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit(): void {
  }

  reset() {
    this.allergen = new Allergen();
    this.form.reset();
    this.imageFile = undefined;
    this.imageSrc = undefined;
    this.changedImage = false;
  }

  setTitle() {
    if (this.mode === DialogMode.New) {
      this.title = 'Nuevo Alérgeno';
    } else if (this.mode === DialogMode.View || this.mode === DialogMode.PartialView) {
      this.title = 'Detalles del Alérgeno: ' + this.allergen?.name;
    } else if (this.mode === DialogMode.Edit || this.mode === DialogMode.PartialEdit) {
      this.title = 'Editar Alérgeno: ' + this.allergen?.name;
    }
  }

  setReadability() {
    this.readOnly = this.mode === DialogMode.View || this.mode === DialogMode.PartialView;
    this.readOnly ? this.form.controls.name.disable() : this.form.controls.name.enable();
    this.readOnly ? this.form.controls.details.disable() : this.form.controls.details.enable();
  }

  setModel(allergen?: Allergen) {
    if (allergen) {
      this.allergen = new Allergen(Utils.clone(allergen));
      console.log(this.allergen);
      this.form.controls.name.setValue(this.allergen.name);
      this.form.controls.details.setValue(this.allergen.details);
    } else {
      this.form.controls.name.setValue(null);
      this.form.controls.details.setValue(null);
    }
  }

  onClickHandler(event: any) {
    const button = event.target.name;
    if (button === 'save' || button === 'saveAndClose') {
      this.save(button === 'saveAndClose');
    } else if (button === 'cancel') {
      this.dismiss(true);
    }
  }

  async save(close: boolean) {
    this.allergen.name = this.form.controls.name.value || '';
    this.allergen.details = this.form.controls.details.value || '';
    try {
      if (this.mode === DialogMode.New) {
        const createdAllergen = await this.allergensService.addAllergen(this.allergen);
        this.allergen = createdAllergen || new Allergen();
      } else {
        const updatedAllergen = await this.allergensService.updateAllergen(this.allergen);
        this.allergen = updatedAllergen || new Allergen();
      }
      if (this.changedImage && this.allergen.id && this.imageFile) {
        const updatedAllergenAvatar = await this.allergensService.uploadAllergenIcon(this.allergen.id, this.imageFile);
      } else if (this.changedImage && this.allergen.id && !this.imageFile) {
        const deletedAllergenAvatar = await this.allergensService.deleteAllergenIcon(this.allergen.id);
      }
      let message = DialogMode.Edit ? 'El Alérgeno se ha actualizado correctamente.' : 'El Alérgeno se ha creado correctamente.';
      this.toastService.success({
        header: 'Producto Creado',
        message: message,
      });
      this.close(true);
    } catch (error) {
      const err = error as HttpResponse<Allergen>;
      if (err.htmlCode === HTMLCodes.FORBIDDEN || err.htmlCode === HTMLCodes.UNAUTHORIZED) {
        this.toastService.error({
          header: 'No autorizado',
          message: 'No esta autorizado para ejecutar esta operación',
        });
      } else {
        const message = DialogMode.Edit ? 'Ha ocurrido un error actualizando el alérgeno.' : 'Ha ocurrido un error creando el alérgeno.';
        this.toastService.error({
          header: 'Error',
          message: message
        });
      }
    }
  }

}
