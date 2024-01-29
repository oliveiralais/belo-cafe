import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Gleba } from 'src/app/dashboard/models/gleba';
import { GlebaService } from 'src/app/dashboard/services/gleba.service';

@Component({
  selector: 'app-update-gleba',
  templateUrl: './update-gleba.component.html',
  styleUrls: ['./update-gleba.component.css'],
})
export class UpdateGlebaComponent {
  glebaFormGroup!: FormGroup;
  gleba!: Gleba;
  glebaId!: number;
  proprietary!: User;

  constructor(
    private glebaService: GlebaService,
    private router: Router,
    private route: ActivatedRoute,
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

    this.glebaId = this.route.snapshot.params['id'];

    this.getProprietary(+localStorage.getItem('user_id')!);
    this.initializeForm(this.glebaId);
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

  initializeForm(id: number): void {
    this.glebaService.getById(id).subscribe({
      next: (gleba) => {
        this.glebaFormGroup.patchValue(gleba);
      },
    });
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
      this.proprietary,
      this.glebaId
    );
  }

  onSubmit(): void {
    if (this.glebaFormGroup.invalid) {
      this.glebaFormGroup.markAllAsTouched();
      return;
    } else {
      this.gleba = this.createGleba();

      this.glebaService.update(this.gleba).subscribe({
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
