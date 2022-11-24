import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemOrder } from 'src/app/models/ItemOrder';
import { AddressService } from 'src/app/services/address.service';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  items : ItemOrder[] = []
  total : number = 0;
  selectedAddress : any = {}
  addresses : any[] = [];
  user : any = {}
  constructor(private addressService : AddressService, 
              private orderService : OrderService,
              private router: Router) { }

  orderForm: FormGroup;

  ngOnInit(): void {
  

    this.getItems()
    this.getAddress()
    
  }
  getItems(){
    this.orderForm = new FormGroup({
      address : new FormControl('',[Validators.required])
    })
    this.items = JSON.parse(localStorage.getItem('cart'))
    this.total = 0 
    if(this.items){
      console.log(this.items)
      for(let i = 0; i < this.items.length; i++){
        this.total += this.items[i].item.price * this.items[i].quantity
      }
      this.total.toFixed(2)
      console.log(this.total)
    }
  }
  deleteItem(item:ItemOrder){
    let index = this.items.lastIndexOf(item)
    this.items.splice(index,1)
    console.log(this.items)
    localStorage.setItem('cart',JSON.stringify(this.items))
    this.getItems()
  }
  getAddress(){
    this.addressService.getAddresses(this.user.id).subscribe(
      data=>{
        this.addresses = data.content
        console.log(data.content);
        
      }
    )
  }
  setAddress(address:any){
    this.selectedAddress = address
    console.log(this.selectedAddress)
  }

  sendOrder(){
    console.log(this.orderForm.value)
    let order = {
      items : this.items,
      total : this.total,
      address : this.selectedAddress,
      user: JSON.parse(localStorage.getItem("user"))
    }
    this.orderService.saveOrder(order).subscribe(
      data => {
        Swal.fire({
          title: 'Order save succesfully!',
          text: 'Thanks for buy with us!',
        })
        this.items=[]
        localStorage.removeItem("cart")
        this.router.navigate(['shop'])
        
      },
      error=>{
        Swal.fire({
          title: 'Error!',
          text: 'Error saving order!' + error.message,

        })
      }
    )
  }

}
