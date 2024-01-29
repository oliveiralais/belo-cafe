import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user';
import { Venda } from 'src/app/dashboard/models/venda';
import { VendaService } from 'src/app/dashboard/services/venda.service';

@Component({
  selector: 'app-new-venda',
  templateUrl: './new-venda.component.html',
  styleUrls: ['./new-venda.component.css'],
})
export class NewVendaComponent {
  vendaFormGroup!: FormGroup;
  Venda!: Venda;
  user!: User;

  constructor(
    private vendaService: VendaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.vendaFormGroup = this.formBuilder.group({
      data: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}'),
      ]),
      valor: new FormControl('', [Validators.required]),
      qtdCafe: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {}
}
