import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Funcionario } from 'src/app/dashboard/models/funcionario';
import { FuncionarioService } from 'src/app/dashboard/services/funcionario.service';

@Component({
  selector: 'app-new-funcionario',
  templateUrl: './new-funcionario.component.html',
  styleUrls: ['./new-funcionario.component.css']
})
export class NewFuncionarioComponent {
  funcionarioFormGroup!: FormGroup;
  funcionario!: Funcionario;
  usuario!: User;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.funcionarioFormGroup = this.formBuilder.group({

      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
      ]),

      telefone: new FormControl(''),

      funcao: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),

      salario: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

    });

    this.getUsuario(+localStorage.getItem('user_id')!);
  }

  get nome() {
    return this.funcionarioFormGroup.get('nome');
  }
  get cpf() {
    return this.funcionarioFormGroup.get('cpf');
  }
  get telefone() {
    return this.funcionarioFormGroup.get('telefone');
  }
  get funcao() {
    return this.funcionarioFormGroup.get('funcao');
  }
  get salario() {
    return this.funcionarioFormGroup.get('salario');
  }

  getUsuario(id: number): any {
    this.funcionarioService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
    });
  }

  createFuncionario(): Funcionario {
    return new Funcionario(
      this.nome!.value,
      this.cpf!.value,
      this.telefone!.value,
      this.funcao!.value,
      this.salario!.value,
      this.usuario
    );
  }

  onSubmit(): void {
    if (this.funcionarioFormGroup.invalid) {
      this.funcionarioFormGroup.markAllAsTouched();
      return;
    } else {
      this.funcionario = this.createFuncionario();

      this.funcionarioService.save(this.funcionario).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/funcionarios']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
