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
  totalItems :number = 0
  page : number = 1;
  size : number = 16;
  items:any[] = []
  itemOrder :ItemOrder
  totalArray: any [] = []
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    this.getItems()
    this.itemOrder = new ItemOrder()
  }
  getItems(){
    this.itemService.getAllItems(this.page,this.size,"id","desc").subscribe(
      data=>{
        this.items = data.content
        this.totalItems = Math.ceil(data.totalElements/this.size)
        console.log(data)
      }
    )
    this.totalArray= this.getTotalPages()
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
  getTotalPages():number[]{
    console.log(this.page, this.totalItems)
    if(this.page === this.totalItems) return [this.totalItems-4,this.totalItems-3,this.totalItems-2,this.totalItems-1,this.totalItems]
    if(this.page === (this.totalItems-1)) return [this.totalItems-3,this.totalItems-2,this.totalItems-1,this.totalItems,this.totalItems+1]
    if(this.page <5) return [1,2,3,4,5]
    return [this.page-2,this.page-1,this.page,this.page+1,this.page+2]
  }
  setPage(page:number){
    this.page = page
    this.getItems()
  }
  nextPage(){
    this.page++
    this.getItems()
  }
  previousPage(){
    this.page--
    this.getItems()
  }

}
