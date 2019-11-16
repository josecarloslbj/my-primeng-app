//import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userLogin } from './../../shared/user.model';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: userLogin = new userLogin();
  visibleSidebar;
  mensagem: any = '';

  constructor(private service: UserService,
              private router: Router
    ,         //private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }

  efetuarLogin(event: Event) {
    event.preventDefault();
    this.service.login(this.user).subscribe(
      (res: any) => {

        if (res.authenticated === false) {

          //this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          //alert('Incorrect username or password.');
          this.visibleSidebar = true;
          this.mensagem = 'Incorrect username or password';
          return;
        }

        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status === 400) {
          // this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          alert('Incorrect username or password.');
        } else {
          console.log(err);
        }
      }
    );
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status === 400) {
          // this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          alert('Incorrect username or password.');
        } else {
          console.log(err);
        }
      }
    );
  }

  toggleResetPswd(e) {
    e.preventDefault();
    //$('#logreg-forms .form-signin').toggle() // display:block or none
    //$('#logreg-forms .form-reset').toggle() // display:block or none
  }

  toggleSignUp(e) {
    e.preventDefault();
    //$('#logreg-forms .form-signin').toggle(); // display:block or none
    //$('#logreg-forms .form-signup').toggle(); // display:block or none
  }

  // $(() => {
  //   // Login Register Form
  //   //$('#logreg-forms #forgot_pswd').click(toggleResetPswd);
  //   //$('#logreg-forms #cancel_reset').click(toggleResetPswd);
  //   //$('#logreg-forms #btn-signup').click(toggleSignUp);
  //   //$('#logreg-forms #cancel_signup').click(toggleSignUp);
  // })
}
