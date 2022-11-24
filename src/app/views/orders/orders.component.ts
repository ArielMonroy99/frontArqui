import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] =[]
  totalItems :number = 0
  totalArray: any [] = []
  order:any = {
    user: {},
    total: 0,
    address:{}
  }
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }
  page: number = 1; 
  size: number = 10;
  link: string = '';
  getOrders() {
    this.orderService.getOrders(this.page-1,this.size).subscribe(orders => {
      this.orders = orders.content;
      console.log(this.orders);
      this.totalItems = Math.ceil(orders.totalElements/this.size)
      console.log(orders)
      this.totalArray= this.getTotalPages()
    })
  }
  setOrder(order: any) {
    console.log(order);
    this.link = `https://www.google.com/maps/search/?api=1&query=${order.address.latitude},${order.address.longitude}`;
    this.order = order;
  }
  updateOrderStatus(order:any,status:number) {
    let confirmationText = `Set order status to ${status === 2 ? 'Delivered' : 'Rejected'}`;
    let resultText = `Order status set to ${status === 2 ? 'Delivered' : 'Rejected'}`;
    Swal.fire({
      title: 'Are you sure?',
      text: confirmationText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if(result.isConfirmed) {
        this.orderService.updateOrderStatus(order.id, status).subscribe(data => {
          Swal.fire({
            title: 'Success',
            text: resultText,
            icon: 'success',
          })
          this.getOrders();
        })
      }
    })
  }
  getTotalPages():number[]{
    console.log(this.page, this.totalItems)
    if(this.totalItems<=5){
      let array : number[] = []
      for(let i =0 ; i < this.totalItems; i++){
        array.push(i+1)
      }
      console.log(array);
      return array
    }
    if(this.page === this.totalItems) return [this.totalItems-4,this.totalItems-3,this.totalItems-2,this.totalItems-1,this.totalItems]
    if(this.page === (this.totalItems-1)) return [this.totalItems-3,this.totalItems-2,this.totalItems-1,this.totalItems,this.totalItems+1]
    if(this.page <5) return [1,2,3,4,5]

    return [this.page-2,this.page-1,this.page,this.page+1,this.page+2]
  }
  
  setPage(page:number){
    this.page = page
    this.getOrders()
  }
  nextPage(){
    this.page++
    this.getOrders()
  }
  previousPage(){
    this.page--
    this.getOrders()
  }
  
}
