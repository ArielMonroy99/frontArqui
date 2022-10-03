import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ItemService } from '../../services/item.service';
import swal from 'sweetalert2';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  @ViewChild("spinner") spinner: any
  @ViewChild("closeModal") closeModal: ElementRef | undefined
  
  item:any
  page:number = 1
  size:number = 10
  totalItems:number = 0;
  items:any[] = []
  totalArray :any[] = []
  categories:any[] = []
  control = 1 
  ItemForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required,Validators.minLength(5)]),
    price: new FormControl('',[Validators.required,Validators.min(0.1) ]),
    category: new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required,Validators.min(10)]),
    stock: new FormControl('',[Validators.required,Validators.min(1)])

  })
  constructor(private itemService: ItemService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getItems()
    this.getCategories()

  }

  
  getCategories(){
    this.categoryService.getAllCategories().subscribe(
      data =>{
        this.categories = data
        console.table(this.categories)
      }
    )
  }
  getItems(){
    this.itemService.getAllItems(this.page-1,this.size).subscribe(
      data => {
        this.items = data.content
        this.totalItems = Math.ceil(data.totalElements/this.size)
        console.log( Math.ceil(data.totalElements/this.size))
      }
    )
    this.totalArray= this.getTotalPages()
  }

  deleteItem(id:number){
    swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.itemService.deleteItem(id).subscribe(
          next=>{
            swal.fire('Item Deleted!', '', 'info')
            this.getItems()
          }
        )
      } else if (result.isDenied) {
        swal.fire('Changes are not saved', '', 'info')
      }
    })
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

  setItem(item:any){
    this.ItemForm.setValue(item)
    this.control = 0 
  }

  saveValues(){
    this.spinner.nativeElement.style.display = 'inline'
    if(this.control===1){
      this.itemService.saveItem(this.ItemForm.value).subscribe(
        next=>{
          this.spinner.nativeElement.style.display = 'none'
          this.closeModal?.nativeElement.click()
          this.getItems()
        }
      )
    }else{
      console.table(this.ItemForm.value)
      this.itemService.updateItem(this.ItemForm.value).subscribe(
        next=>{
          this.spinner.nativeElement.style.display = 'none'
          this.closeModal?.nativeElement.click()
          this.getItems()
        }
      )
    }
  }

}