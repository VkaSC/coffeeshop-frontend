import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/libs/utils/utils.utils';
import Allergen from 'src/app/models/allergen-model';
import { HTMLCodes, HttpResponse } from 'src/app/models/httpResponse.model';
import Product from 'src/app/models/product.model';
import { AllergensService } from 'src/app/services/allergens.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';
import { DialogMode, ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @ViewChild('modal') private modal?: ModalComponent
  @Input() title: string = 'Nuevo Producto';
  mode: DialogMode = DialogMode.New;
  product: Product = new Product();
  readOnly: boolean = false;
  groups = ['Grupo 1', 'Grupo 2', 'Grupo 3'];
  categories = ['Cafe', 'Desayunos', 'Bocadillos', 'Refrescos'];
  allergens: Allergen[] = [];
  form = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required]),
    type: new FormControl<'Grupo 1' | 'Grupo 2' | 'Grupo 3' | ''>('', [Validators.required]),
    category: new FormControl<'Cafe' | 'Desayunos' | 'Refrescos' | 'Bocadillos' | ''>('', [Validators.required]),
    details: new FormControl<string | null>('', [Validators.required]),
    price: new FormControl<number | null>(0, [Validators.required, Validators.pattern('[0-9,\.]+')]),
  });

  get availableAllergens() {
    const availableAllergens: Allergen[] = [];
    for (const allergen of this.allergens) {
      const filter = this.product?.allergens?.filter((element) => {
        return element.id === allergen.id;
      });
      if (!filter || filter.length === 0) {
        availableAllergens.push(allergen);
      }
    }
    return availableAllergens;
  }

  constructor(
    private productsService: ProductsService,
    private allergensService: AllergensService,
    private toastService: ToastService,
  ) { }

  open(mode: DialogMode, product?: Product) {
    this.mode = mode;
    this.setModel(product);
    this.setTitle();
    this.setReadability();
    this.loadAllergens();
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
    this.product = new Product();
    this.form.reset();
  }

  setTitle() {
    if (this.mode === DialogMode.New) {
      this.title = 'Nuevo Producto';
    } else if (this.mode === DialogMode.View || this.mode === DialogMode.PartialView) {
      this.title = 'Detalles del Producto: ' + this.product?.name;
    } else if (this.mode === DialogMode.Edit || this.mode === DialogMode.PartialEdit) {
      this.title = 'Editar Producto: ' + this.product?.name;
    }
  }

  setReadability() {
    this.readOnly = this.mode === DialogMode.View || this.mode === DialogMode.PartialView;
    this.readOnly ? this.form.controls.name.disable() : this.form.controls.name.enable();
    this.readOnly ? this.form.controls.category.disable() : this.form.controls.category.enable();
    this.readOnly ? this.form.controls.type.disable() : this.form.controls.type.enable();
    this.readOnly ? this.form.controls.details.disable() : this.form.controls.details.enable();
    this.readOnly ? this.form.controls.price.disable() : this.form.controls.price.enable();
  }

  setModel(product?: Product) {
    if (product) {
      this.product = new Product(Utils.clone(product));
      console.log(this.product);
      this.form.controls.name.setValue(this.product.name);
      this.form.controls.category.setValue(this.product.category);
      this.form.controls.type.setValue(this.product.type);
      this.form.controls.details.setValue(this.product.details);
      this.form.controls.price.setValue(this.product.price);
    } else {
      this.form.controls.name.setValue(null);
      this.form.controls.category.setValue('');
      this.form.controls.type.setValue('');
      this.form.controls.details.setValue(null);
      this.form.controls.price.setValue(0);
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

  addAllergen(allergen: Allergen) {
    this.product?.allergens?.push(allergen);
  }

  removeAllergen(allergen: Allergen) {
    this.product.allergens = this.product?.allergens?.filter((element) => { return element.id !== allergen.id }) || [];
  }

  async loadAllergens() {
    try {
      this.allergens = await this.allergensService.listAllergens({
        all: true,
      }) || [];
    } catch (err) {
      const error = err as HttpResponse<Allergen[]>;
      if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
        this.toastService.error({
          header: 'No autorizado',
          message: 'No esta autorizado para ejecutar esta operación',
        });
      } else {
        this.toastService.error({
          header: 'Error cargando los pedidos de hoy',
          message: 'Ha ocurrido un error cargando los pedidos de hoy. Inténtelo de nuevo más tarde',
        });
      }
    }
  }

  async save() {
    this.product.name = this.form.controls.name.value || '';
    this.product.type = this.form.controls.type.value || 'Grupo 1';
    this.product.category = this.form.controls.category.value || 'Cafe';
    if (Utils.isNull(this.form.controls.price.value)) {
      this.product.price = 0;
    } else {
      this.product.price = this.form.controls.price.value || 0;
    }
    this.product.details = this.form.controls.details.value || '';
    try {
      if (this.mode === DialogMode.New) {
        const createdProduct = await this.productsService.addProduct(this.product);
      } else {
        const updatedProduct = await this.productsService.updateProduct(this.product);
      }
      const message = DialogMode.Edit ? 'El Producto se ha actualizado correctamente.' : 'El Producto se ha creado correctamente.';
      this.toastService.success({
        header: 'Producto Creado',
        message: message,
      });
      this.close(true);
    } catch (error) {
      const err = error as HttpResponse<Product>;
      if (err.htmlCode === HTMLCodes.FORBIDDEN || err.htmlCode === HTMLCodes.UNAUTHORIZED) {
        this.toastService.error({
          header: 'No autorizado',
          message: 'No esta autorizado para ejecutar esta operación',
        });
      } else {
        const message = DialogMode.Edit ? 'Ha ocurrido un error actualizando el producto.' : 'Ha ocurrido un error creando el producto.';
        this.toastService.error({
          header: 'Error',
          message: message
        });
      }
    }
  }

}
