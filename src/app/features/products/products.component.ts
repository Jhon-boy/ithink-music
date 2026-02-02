import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@core/models/product_model';
import { ProductController } from './controller/product_controller';
import { ProductItemComponent } from '@shared/product-item/product-item.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];
  errorMessage = '';

  constructor(private productController: ProductController) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(showLoader = true): void {
    this.errorMessage = '';
    this.productController.getProducts(showLoader).subscribe({
      next: resp => {
        if (resp.success && resp.data) {
          this.products = resp.data;
        } else {
          this.errorMessage = resp.message || 'No se pudieron cargar los productos.';
        }
      },
      error: () => {
        this.errorMessage = 'Error al cargar los productos.';
        this.products = [];
      },

    });
  }
}
