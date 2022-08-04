import { Component,AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AlertService } from 'ngx-alerts';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  passForm: FormGroup;


  public lat;
  public lng;
  
  ipAddress: any;
  http: any;

  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router, private alertService: AlertService) {
      this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });

    this.passForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
    });
    $(document).ready(function() {

      $(".show-password, .hide-password").on('click', function() {
        var passwordId = $(this).parents('li:first').find('input').attr('id');
        if ($(this).hasClass('show-password')) {
          $("#" + passwordId).attr("type", "text");
          $(this).parent().find(".show-password").hide();
          $(this).parent().find(".hide-password").show();
        } else {
          $("#" + passwordId).attr("type", "password");
          $(this).parent().find(".hide-password").hide();
          $(this).parent().find(".show-password").show();
        }
      });
    });
  }

  ngOnInit(): void {
    this.getCurrentLocation();  
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#id_password');
   
    togglePassword.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // toggle the eye slash icon
      this.classList.toggle('fa-eye-slash');
  });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;      
    });
    }
    else {
      this.alertService.warning("Geolocation is not supported by this browser.");
    }
  }


  passreset(passForm1) {
    if(this.email_id.status == 'INVALID') {
      this.alertService.warning('Please Enter Valid Email Address');
      $('#email').focus();
    }
    else {      
      this.dataService.resetPassword(passForm1.value.email).subscribe(data => {
            if(data.status) {
              this.alertService.success("Password has been sent to your registered email");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } 
            else {
              this.alertService.danger("This email is not Registered");
            }
          },
        );
    }

  }

  postdata(angForm1) { //alert(angForm1.value.mobile); //deb
    
    if (this.email.status == 'INVALID') {
      this.alertService.warning('Please Enter Your Email Address');
      $('#email').focus();
    }
    else if (this.password.status == 'INVALID') {
      this.alertService.warning('Please Enter Your Password');
      $('#password').focus();
    }
    else {
      localStorage.setItem('lat', this.lat);
      localStorage.setItem('lng', this.lng);
      this.dataService.userlogin(angForm1.value.email, angForm1.value.password,this.lat,this.lng)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status) {
              if (data.result) {
                
                localStorage.setItem('token', data.result.email);
                localStorage.setItem('country_code', data.result.country);
                localStorage.setItem('subscription_end_date', data.result.subscription);
                localStorage.setItem('lead_bonus', data.result.lead_count);
                localStorage.removeItem('lat');
                localStorage.removeItem('lng');
                this.router.navigate(['/']);

              }else {
                this.alertService.danger("User name or password is incorrect");
              }
            } else {
              this.alertService.danger("Please Try again later");
            }
          },
        );
    }
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get email_id() { return this.passForm.get('email'); }

  ngAfterViewInit(){
    $(document).ready(function(){
      $("#forgot_pass").click(function(){
      $('#sign_id').hide();
      $('#reset_id').show();
      });
    });
}


}
