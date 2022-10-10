import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { ItemOrder } from 'src/app/models/ItemOrder';
import { ItemService } from 'src/app/services/item.service';
import { Form } from '@angular/forms';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild('closeButton') closebutton:any

  page : number = 0;
  size : number = 16;
  items:any[] = []
  itemOrder :ItemOrder
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    this.getItems()
    this.itemOrder = new ItemOrder()
  }

  
  
  
  getItems(){
    this.itemService.getAllItems(this.page,this.size,"id","desc").subscribe(
      data=>{
        this.items = data.content
        console.log(data)
      }
    )
  }
  setItem(item:any){
    console.log(item)
    this.itemOrder.item=item
    console.log(this.itemOrder)
  }
  saveCart(){
    let cart = JSON.parse(localStorage.getItem('cart'))
    if(cart == null){
      cart = []
      cart.push(this.itemOrder)
    }else{
      let index = cart.findIndex((itemOrder:ItemOrder)=>itemOrder.item.id == this.itemOrder.item.id)
      if(index == -1){
        cart.push(this.itemOrder)
      }else{
        cart[index].quantity += this.itemOrder.quantity
      }
      
    }
    console.log(cart)
    this.closebutton.nativeElement.click()
    this.itemOrder = new ItemOrder()
    localStorage.setItem('cart',JSON.stringify(cart))
  }


}
