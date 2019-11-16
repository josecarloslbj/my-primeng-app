import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userLogin } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    user: userLogin = new userLogin();
    formModel: FormGroup;

    constructor(private fb: FormBuilder, private http: HttpClient) {

        this.formModel = this.fb.group(new userLogin(), { validator: this.comparePasswords });

        this.formModel.controls.name.setValidators([Validators.required, Validators.minLength(4)]);
        this.formModel.controls.email.setValidators(Validators.email);
        this.formModel.controls.login.setValidators([Validators.required, Validators.minLength(4)]);
        this.formModel.controls.password.setValidators([Validators.required, Validators.minLength(4)]);
        this.formModel.controls.confirmPassword.setValidators([Validators.required, Validators.minLength(4)]);
    }


    readonly BaseURI = 'https://localhost:5001/api';

    // formModel = this.fb.group({
    //     UserName: ['', Validators.required],
    //     Email: ['', Validators.email],
    //     FullName: [''],
    //     Passwords: this.fb.group({
    //         Password: ['', [Validators.required, Validators.minLength(4)]],
    //         ConfirmPassword: ['', Validators.required]
    //     }, { validator: this.comparePasswords })

    // });



    comparePasswords(fb: FormGroup) {
        const confirmPswrdCtrl = fb.get('confirmPassword');
        // passwordMismatch
        // confirmPswrdCtrl.errors={passwordMismatch:true}
        if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
            if (fb.get('password').value !== confirmPswrdCtrl.value) {
                confirmPswrdCtrl.setErrors({ passwordMismatch: true });
            } else {
                confirmPswrdCtrl.setErrors(null);
            }
        }
    }

    register() {

        // const body = {
        //     UserName: this.formModel.value.UserName,
        //     Email: this.formModel.value.Email,
        //     FullName: this.formModel.value.FullName,
        //     Password: this.formModel.value.Passwords.Password
        // };

        return this.http.post(this.BaseURI + '/login/cadastrar', this.formModel.value);
    }

    login(formData) {

        //return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
        // formData = {};
        // formData.UserID = 'usuario02';
        // formData.AccessKey = '531fd5b19d58438da0fd9afface43b3c';
        console.log(formData);
        const url = 'https://localhost:5001/api/Login';

        return this.http.post(url, formData);
    }

    getUserProfile() {
        return this.http.get(this.BaseURI + '/UserProfile');
    }
}
