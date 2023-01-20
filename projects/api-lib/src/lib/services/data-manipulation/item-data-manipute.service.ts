import { Injectable } from "@angular/core";
import { Color } from "../../classes/generic/color";
import { Size } from "../../classes/generic/size";
import { Cloth } from "../../classes/items/fashion/cloths/cloths";
import { Item } from "../../classes/items/item";
import { Shoes } from "../../classes/items/fashion/foot-wear/shoes";

@Injectable({
  providedIn: "root",
})
export class ItemDataManiputeService {
  constructor() {}

  public toClass = (items: any): Item[] => {
    let filteredItems = items.filter((item: any) => item.Price != 0);
    let classifiedItems: Item[] = [];
    filteredItems.forEach((item: any) => {
      console.log("ITEM CAT: ", item);
      switch (item.status) {
        case "inactive":
          classifiedItems.push(this.toCloth(item));
          break;
        case "active":
          classifiedItems.push(this.toShoes(item));
          break;
        default:
          break;
      }
    });
    console.log("ITEM IN DATA MANIPULATION ", classifiedItems);
    return classifiedItems;
  };

  public toCloth = (item: any): Cloth => {
    let clothAvailableColor: Color[] = [];
    let clothAvailableSize: Size[] = [];

    item.available_color.forEach((color: any) => {
      let dummyColor: Color = new Color(localStorage.getItem("language")||"","");
      clothAvailableColor.push(dummyColor);
    });

    item.available_color.forEach((x: any) => {
      let dummyColor: Size = new Size(localStorage.getItem("language")||"","");
      clothAvailableSize.push(dummyColor);
    });

    let cloth: Cloth = new Cloth();
    return cloth;
  };

  public toShoes = (item: any): Shoes => {
    let clothAvailableColor: Color[] = [];
    let clothAvailableSize: Size[] = [];

    item.available_color.forEach((color: any) => {
      let dummyColor: Color = new Color(localStorage.getItem("language")||"","");
      clothAvailableColor.push(dummyColor);
    });

    item.available_color.forEach((x: any) => {
      let dummyColor: Size = new Size(localStorage.getItem("language")||"","");
      clothAvailableSize.push(dummyColor);
    });

    let shoe: Shoes = new Shoes();
    return shoe;
  };
}