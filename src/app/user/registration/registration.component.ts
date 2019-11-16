import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { userLogin } from './../../shared/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: userLogin = new userLogin();
  myForm: FormGroup;

  constructor(public service: UserService,
    // tslint:disable-next-line: align
    fb: FormBuilder
  ) {

    // tslint:disable-next-line: new-parens
    this.myForm = fb.group(new userLogin());
  }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          // this.toastr.success('New user created!', 'Registration successful.');
          alert('New user created!');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                //   this.toastr.error('Username is already taken', 'Registration failed.');
                alert('Username is already taken');
                break;

              default:
                //  this.toastr.error(element.description, 'Registration failed.');
                alert('element.description');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
