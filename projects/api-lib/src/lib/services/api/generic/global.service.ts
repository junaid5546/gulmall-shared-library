import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERVER_IP } from "../../../constants/config";
import { ItemDataManiputeService } from "../../data-manipulation/item-data-manipute.service";
import { map } from "rxjs";
import { Item } from "../../../classes/items/item";
@Injectable({ providedIn: "root" })
export class GlobalService {
    private appBaseUrl = SERVER_IP;

  constructor(
    public http: HttpClient,
    private itemDataManipulation: ItemDataManiputeService
  ) {}
  
  public globalSearch = async (keyword:string,userPublicId:number,pageNumber: number) => {
    let url = `get-keyword?pageNumber=${pageNumber}`;
    return await this.http
      .post<Item[]>(`${this.appBaseUrl}/${url}`,{"keyword":keyword,"userId":userPublicId})
      .pipe(map((items: any) => this.itemDataManipulation.toClass(items.data)));
  };

}
