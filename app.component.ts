import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  createForm!: FormGroup
  customers: any;
  constructor(private fb: FormBuilder,private appService: AppService) {
    
  }
  

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadForm()
    this.get()


  }
  loadForm(){
    this.createForm=this.fb.group({
      id: [0],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      emailAddress:["",Validators.required],
      phoneNumber:[""],
      address:[""],
      companyName:[""],
      designation:[""]
      
    })
  }
  get(){
    this.appService.getAllCustomer().subscribe(res =>{
      console.log(res);
      this.customers = res; 
    })
  }
  save() {
    if(this.createForm.valid){

    
    if (this.createForm.value.id) {
      this.appService.updateCustomer(this.createForm.value).subscribe(response => {
        console.log('Customer Updated:', response);
        this.get(); 
        this.createForm.reset({ id:0 }); 
      });
    } else {
      
      this.appService.createCustomer(this.createForm.value).subscribe(response => {
        console.log('Customer Created:', response);
        this.get(); 
        this.createForm.reset({ id:0 }); 
      });
    }
  }else{
    alert("Please enter all required fields")
  }
  }
  
  delete(id:number){
    this.appService.deleteCustomer(id).subscribe(res =>{
      this.get()
    })
  }
  update(data: any) {
    this.createForm.patchValue(data); 
  }

}

