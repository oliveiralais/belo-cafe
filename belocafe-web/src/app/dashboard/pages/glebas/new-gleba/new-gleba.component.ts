import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlebaService } from '../../../services/gleba.service';
import { Gleba } from 'src/app/dashboard/models/gleba';
import { User } from 'src/app/dashboard/models/user';

@Component({
  selector: 'app-new-gleba',
  templateUrl: './new-gleba.component.html',
  styleUrls: ['./new-gleba.component.css'],
})
export class NewGlebaComponent {
  glebaFormGroup!: FormGroup;
  gleba!: Gleba;
  proprietary!: User;

  constructor(
    private glebaService: GlebaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.glebaFormGroup = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),

      area: new FormControl('', [Validators.required, Validators.min(0)]),

      horizontalSpacing: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

      verticalSpacing: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),

      plants: new FormControl('', [Validators.required, Validators.min(0)]),

      variety: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),

      altitude: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    this.getProprietary(+localStorage.getItem('user_id')!);
  }

  get name() {
    return this.glebaFormGroup.get('name');
  }
  get area() {
    return this.glebaFormGroup.get('area');
  }
  get horizontalSpacing() {
    return this.glebaFormGroup.get('horizontalSpacing');
  }
  get verticalSpacing() {
    return this.glebaFormGroup.get('verticalSpacing');
  }
  get plants() {
    return this.glebaFormGroup.get('plants');
  }
  get variety() {
    return this.glebaFormGroup.get('variety');
  }
  get altitude() {
    return this.glebaFormGroup.get('altitude');
  }

  getProprietary(id: number): any {
    this.glebaService.getProprietary(id).subscribe({
      next: (proprietary) => {
        this.proprietary = proprietary;
      },
    });
  }

  createGleba(): Gleba {
    return new Gleba(
      this.name!.value,
      this.area!.value,
      this.horizontalSpacing!.value,
      this.verticalSpacing!.value,
      this.plants!.value,
      this.variety!.value,
      this.altitude!.value,
      this.proprietary
    );
  }

  onSubmit(): void {
    if (this.glebaFormGroup.invalid) {
      this.glebaFormGroup.markAllAsTouched();
      return;
    } else {
      this.gleba = this.createGleba();

      this.glebaService.save(this.gleba).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/glebas']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
