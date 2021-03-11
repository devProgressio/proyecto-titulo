import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid || !this.registerForm.get('terminos').value) {
      return;
    }
      // Realizar el posteo
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        (resp) => {
          // Navegar al dashboard
          this.router.navigateByUrl('/');
        },
        (err) => {
          //Sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        }
      );

  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return pass1 !== pass2 && this.formSubmitted ? true : false;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      return pass1Control.value === pass2Control.value
        ? pass2Control.setErrors(null)
        : pass2Control.setErrors({ noEsIgual: true });
    };
  }
}
