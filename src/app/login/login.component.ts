import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: ['',Validators.required],
      password: ['',Validators.required],
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signup")

      .subscribe(res => {
        const user = res.find((a: any) => {
      return a.mail === this.loginForm.value.mail && a.password === this.loginForm.value.password
        });
        if (user) {
          alert("login success");
          this.loginForm.reset();
          this.router.navigate(['navbar']);
        } else {
          alert("user not found");
        }
      }, err => {
        alert("something went wrong");
      })
  }
}