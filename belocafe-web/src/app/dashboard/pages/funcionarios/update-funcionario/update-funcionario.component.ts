import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Funcionario } from 'src/app/dashboard/models/funcionario';
import { FuncionarioService } from 'src/app/dashboard/services/funcionario.service';

@Component({
  selector: 'app-update-funcionario',
  templateUrl: './update-funcionario.component.html',
  styleUrls: ['./update-funcionario.component.css'],
})
export class UpdateFuncionarioComponent {
  funcionarioFormGroup!: FormGroup;
  funcionario!: Funcionario;
  usuario!: User;
  funcionarioId!: number;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
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

      salario: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    this.funcionarioId = this.route.snapshot.params['id'];
    this.getUsuario(+localStorage.getItem('user_id')!);

    this.initializeForm(this.funcionarioId);
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

  initializeForm(id: number): void {
    this.funcionarioService.getById(id).subscribe({
      next: (funcionario) => {
        console.log(funcionario)
        this.funcionarioFormGroup.patchValue(funcionario);
      },
    });
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
      this.usuario,
      this.funcionarioId
    );
  }

  onSubmit(): void {
    if (this.funcionarioFormGroup.invalid) {
      this.funcionarioFormGroup.markAllAsTouched();
      return;
    } else {
      this.funcionario = this.createFuncionario();

      this.funcionarioService.update(this.funcionario).subscribe({
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
