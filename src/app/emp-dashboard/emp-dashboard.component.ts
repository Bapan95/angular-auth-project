import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../share/api.service';
import { EmpModel } from './emp-dash board.model';
@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  formValue !: FormGroup;
  empModelObj: EmpModel = new EmpModel();
  empData !: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      first: [''],
      last: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmp();
  }
  postEmpDetails() {
    this.empModelObj.first = this.formValue.value.first;
    this.empModelObj.last = this.formValue.value.last;
    this.empModelObj.email = this.formValue.value.email;
    this.empModelObj.mobile = this.formValue.value.mobile;
    this.empModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.empModelObj)
      .subscribe(res => {
        console.log(res);
        alert("emp added successfully");
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllEmp();
      },
        err => {
          alert("properly insert the fields");

        })
  }
  getAllEmp() {
    this.api.getEmployee()
      .subscribe(res => {
        this.empData = res;
      })
  }
  deleteEmp(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("employee record deleted");
        // this.formValue.reset();
        this.getAllEmp();
      })
  }
  onEdit(row: any) {
    this.empModelObj.id = row.id;
    this.formValue.controls['first'].setValue(row.first);
    this.formValue.controls['last'].setValue(row.last);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmpDetails() {
    this.empModelObj.first = this.formValue.value.first;
    this.empModelObj.last = this.formValue.value.last;
    this.empModelObj.email = this.formValue.value.email;
    this.empModelObj.mobile = this.formValue.value.mobile;
    this.empModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.empModelObj,this.empModelObj.id)
    .subscribe(res => {
      console.log(res);
      alert("update successfully");
      let ref = document.getElementById('close');
      ref?.click();
      this.formValue.reset();
      this.getAllEmp();
    })
  }
}