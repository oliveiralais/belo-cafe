import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SigninUser } from '../../models/signin-user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinFormGroup!: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.signinFormGroup = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),

      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
    });
  }

  get email() { return this.signinFormGroup.get('email'); }
  get password() { return this.signinFormGroup.get('password'); }

  private createUser(): SigninUser {
    return new SigninUser(
      this.email!.value,
      this.password!.value
    )
  }

  onSubmit(): void {

    if (this.signinFormGroup.invalid){

      this.signinFormGroup.markAllAsTouched();
      return;

    } else {

      const signinUser = this.createUser();

      this.authService.signin(signinUser).subscribe({

        next: (response) => {
          console.log(response)
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user_email', response.email);
          localStorage.setItem('user_id', response.id);
          this.router.navigate(['/dashboard']);
        },

        error: err => {
          console.log('Error', err);
        }

      });

    }

  }


}
