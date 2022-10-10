import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { AddressModel } from 'src/app/models/Address';
import { UserModel } from 'src/app/models/User';
import { AddressService } from 'src/app/services/address.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  @ViewChild('closeMV') closeMv:any; 

  mapView:mapboxgl.Map
  mapAdd:mapboxgl.Map
  marker: mapboxgl.Marker
  addressForm: FormGroup
  addresses: any[] = []
  address: any;
  modalView : Element; 
  modalAdd: Element;
  control: number = 1;
  constructor(private addressService: AddressService) { }

  ngOnInit(): void {    
    (mapboxgl.accessToken as any) = environment.mapboxToken
     this.mapView = this.newMap("mapView");

    (mapboxgl.accessToken as any) = environment.mapboxToken
    this.mapAdd = this.newMap("mapAdd").on('click', (e) => {
      this.createMarker(e.lngLat.lat, e.lngLat.lng, this.mapAdd)
    });

    this.addressForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required]),
    });

    this.getAdresses();

    this.modalView = document.getElementById('viewAddress');
    this.modalView.addEventListener('shown.bs.modal', (event) => {
      this.mapView.resize()
    })
    this.modalView.addEventListener('hidden.bs.modal', (event) => {
      this.marker.remove()
    })

    this.modalAdd = document.getElementById('addAddress');
    this.modalAdd.addEventListener('shown.bs.modal', (event) => {
      this.mapAdd.resize()
    });
    this.modalAdd.addEventListener('hidden.bs.modal', (event) => {
      this.marker.remove()
    });


  }

  createMarker(lat:number , lng:number, map:mapboxgl.Map = this.mapAdd){
    console.log(lat, lng);
    if(this.marker) this.marker.remove()
    const marker = new mapboxgl.Marker({
      draggable: true,
      color: '#000'
    })
    .setLngLat([lng, lat])
    .addTo(map);
    if(map.getContainer().id === "mapView") marker.setDraggable(false)
    this.marker = marker
    console.log('nyan');
    
  }

  saveAddress(){
    if(this.control == 2){
      this.address.latitude = this.marker.getLngLat().lat
      this.address.longitude = this.marker.getLngLat().lng
      this.address.name = this.addressForm.get('name').value
      this.address.address = this.addressForm.get('address').value
      console.log(this.address);
      this.addressService.updateAddress(this.address).subscribe(
        data =>{
          console.log(data)
        }
      )

    }
    if(this.control == 1){
      let address = {
        name: this.addressForm.value.name,
        address: this.addressForm.value.address,
        latitude: this.marker.getLngLat().lat,
        longitude: this.marker.getLngLat().lng,
        user: {
          id: 1
        }
      }
      this.addressService.saveAddress(address).subscribe(
        (res) => {
        console.log(res)
        this.getAdresses()
      })
    }
    this.closeMv.nativeElement.click()
  }
  getAdresses(){
    this.addressService.getAddresses(1).subscribe(
      (res) => {
        this.addresses = res.content
        console.log(res)
      }
    )
  }
  
  newMap(container:string):mapboxgl.Map{
    return new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-68.1295867,-16.5030708],
      zoom: 15
    })
  }
  setAddress(address:any){
    this.control = 2
    this.address = address
    this.addressForm.get('name').setValue(address.name)
    this.addressForm.get('address').setValue(address.address)
    this.createMarker(address.latitude, address.longitude, this.mapAdd)
  }
  newAddress(){
    this.control=1; 
    this.addressForm.reset(); 
    if(this.marker) this.marker.remove()
    
  }

  deleteAddress(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esta accion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      this.addressService.deleteAddress(id).subscribe(
        (res) => {
          console.log(res)
          this.getAdresses()
        }
      )
    })
}

}
