import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AllergenModalComponent } from 'src/app/components/allergen-modal/allergen-modal.component';
import { DialogMode } from 'src/app/components/modal/modal.component';
import Allergen from 'src/app/models/allergen-model';
import { HTMLCodes } from 'src/app/models/httpResponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { AllergensService } from 'src/app/services/allergens.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.component.html',
  styleUrls: ['./allergens.component.css']
})
export class AllergensComponent implements OnInit {

  @ViewChild('allergenModal') private allergenModal?: AllergenModalComponent
  allergens: Allergen[] = [];

  constructor(
    private allergensService: AllergensService,
    private toastService: ToastService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
  ) { }
  

  ngOnInit(): void {
    this.loadAllergens();
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  new() {
    this.allergenModal?.open(DialogMode.New)?.then((reason) => {
      this.loadAllergens();
    }).catch(reason => {

    });
  }

  view(product: Allergen) {
    this.allergenModal?.open(DialogMode.View, product)?.then((reason) => {

    }).catch(reason => {

    });
  }

  edit(product: Allergen) {
    this.allergenModal?.open(DialogMode.Edit, product)?.then((reason) => {
      this.loadAllergens();
    }).catch(reason => {

    });
  }

  delete(allergen: Allergen) {
    this.alertService.alert({
      title: 'Eliminar Alérgeno',
      message: 'Va a eliminar el alérgeno ' + allergen.name + '. ¿Seguro?',
    })?.then(() => {
      this.allergensService.deleteAllergen(allergen).then(() => {
        this.loadAllergens();
        this.toastService.success({
          header: 'Alérgeno Eliminado',
          message: 'El Alérgeno ha sido eliminado correctamente',
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
            message: 'Ha ocurrido un error eliminando el alérgeno'
          });
        }
      });
    }).catch(() => {

    });
  }

  loadAllergens() {
    this.allergensService.listAllergens({
      expand: true,
      order: 'ASC',
      orderBy: ['name'],
    }).then((allergensResult: Allergen[] | undefined) => {
      this.allergens = allergensResult || [];
    }).catch((error) => {
      this.toastService.error({
        header: 'Error',
        message: 'Ha ocurrido un error cargando los alérgenos.',
      });
    });
  }
  

}
