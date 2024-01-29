import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';
import { CompraExt } from 'src/app/dashboard/models/compraExt';
import { CompraExtService } from 'src/app/dashboard/services/compra-ext.service';

@Component({
  selector: 'app-new-compra',
  templateUrl: './new-compra.component.html',
  styleUrls: ['./new-compra.component.css'],
})
export class NewCompraComponent {
  compraFormGroup!: FormGroup;
  compra!: CompraExt;
  user!: User;

  constructor(
    private compraService: CompraExtService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.compraFormGroup = this.formBuilder.group({
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      descricao: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      data: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}'),
      ]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{2} [0-9]{5} [0-9]{5} [0-9]'),
      ]),
      valor: new FormControl('', [Validators.required]),
      razaoSocial: new FormControl('', [Validators.required]),
      cpfCnpj: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}'),
      ]),
    });
  }

  onSubmit() {}
}
