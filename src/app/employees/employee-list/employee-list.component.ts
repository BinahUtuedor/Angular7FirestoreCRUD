import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  constructor(private service: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as object
        } as Employee;
      })
    })
  }

  onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if(confirm("Do you want to delete this record?")) {
      this.firestore.collection('employees').doc(id).delete();
      this.toastr.warning('Deleted successfully', 'EMP. Register')
    }
  }

}