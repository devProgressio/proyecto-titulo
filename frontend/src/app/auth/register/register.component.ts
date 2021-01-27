import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { Login } from 'src/interfaces/login';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {


  checked: boolean = false;
  showPassword: boolean = false;
  login: Login;
  form: FormGroup;
  
  constructor(private primengConfig: PrimeNGConfig, private loginService: LoginService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
