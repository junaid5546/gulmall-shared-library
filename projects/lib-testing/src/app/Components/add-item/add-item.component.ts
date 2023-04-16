import { Component, OnInit } from '@angular/core';
import { CategoriesService, Cloth, Color, Icategory, IchildSubCat, IsubCategory, Item, Size, Image } from 'api-lib';
import { Observable } from 'rxjs';
@Component({
  selector: 'lib-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  allCategories: Observable<Icategory[]> | undefined;
  items:Item[]=[];
  constructor(private categories:CategoriesService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  addItem = () =>{
    
    
      
       let color:Color[] = [new Color('en',"","id1","lskd")];
   let size:Size[] = [new Size('en',"","id")]
    let image:Image = new Image();
    
    
    
  }

  // GET ALL CATEGORIES
  // RETURNS THE LIST OF CATEGORY
  getAllCategories = async() => {
    this.allCategories =  (await this.categories.getAllCategories());
    this.allCategories.subscribe((res:any)=>{
      console.log("All categories",res);
    })
    }

}
