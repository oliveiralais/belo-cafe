import { Component } from '@angular/core';
import { City } from '../../models/city';
import { State } from '../../models/state';
import { StateService } from '../../services/state.service';
import { CityService } from '../../services/city.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  states: State[] = [];
  cities: City[] = [];

  signupFormGroup!: FormGroup;

  constructor( private stateService: StateService,
    private cityService: CityService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.signupFormGroup = this.formBuilder.group({

      name: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),

      propertyName: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),

      uf: new FormControl("", [
        Validators.required,
      ]),

      city: new FormControl({value: "", disabled: true}, [
        Validators.required,
      ]),

      email: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),

      cpfCnpj: new FormControl("", [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(18)
      ]),

      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),

      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),

    })

    this.searchStates();
  }

  get name() { return this.signupFormGroup.get('name'); }
  get propertyName() { return this.signupFormGroup.get('propertyName'); }
  get uf() { return this.signupFormGroup.get('uf'); }
  get city() { return this.signupFormGroup.get('city'); }
  get email() { return this.signupFormGroup.get('email'); }
  get cpfCnpj() { return this.signupFormGroup.get('cpfCnpj'); }
  get password() { return this.signupFormGroup.get('password'); }
  get confirmPassword() { return this.signupFormGroup.get('confirmPassword'); }

  private createUser(): User {
    return new User(
      this.name!.value,
      this.propertyName!.value,
      this.uf!.value.sigla,
      this.city!.value,
      this.email!.value,
      this.cpfCnpj!.value,
      this.password!.value,
      this.confirmPassword!.value,
      ["user"]
    )
  }

  onSubmit(): void {

    if (this.signupFormGroup.invalid){

      this.signupFormGroup.markAllAsTouched();
      return;

    } else {

      let user: User = this.createUser();

      this.authService.signup(user).subscribe({

        next: () => {
          this.router.navigate(['/signin']);
        },

        error: err => {
          console.log('Error', err);
        }

      });

    }

  }

  handleStateSelection(): void {
    this.searchCities(this.uf!.value.id);
    this.signupFormGroup.get('city')!.enable();
  }

  searchStates(): void {
    this.stateService.getStates().subscribe(
      (data: any) => this.states = data
    )
  }

  searchCities(state: string): void {
    this.cityService.getCities(state).subscribe(
      (data: any) => this.cities = data
    )
  }

}
