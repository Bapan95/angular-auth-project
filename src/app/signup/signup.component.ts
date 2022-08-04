import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  carousel: any;
  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // console.log('slide change');
    this.signupForm = this.formBuilder.group({
      fname: ["",Validators.required],
      lname: ["",Validators.required],
      address: ["",Validators.required],
      phone: ["",Validators.required],
      male: [""],
      female: [""],
      state: [""],
      city: [""],
      birth: ["",Validators.required],
      pincode: ["",Validators.required],
      course: ["",Validators.required],
      mail: ["",Validators.required],
      password: ["",Validators.required],
      // cpassword: [''],
    })
  }
  signUp() {
    this.http.post<any>("http://localhost:3000/signup", this.signupForm.value)
   
      .subscribe(res => {
        alert("signup successfully");
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, err => {
        alert("something goes missing")
      })
      console.log(this.signupForm.value)
  }
  ngAfterViewInit(): void {
    this.carousel.stop();
  }
}
