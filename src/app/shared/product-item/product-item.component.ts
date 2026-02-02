import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductModel } from '@core/models/product_model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input() product!: ProductModel;
}
