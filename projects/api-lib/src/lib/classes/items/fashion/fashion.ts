import { Item } from "../item";
import { Color } from "../../generic/color";
import { Size } from "../../generic/size";
export abstract class Fashion extends Item {

    private availableColor:Color[] = [];
    private availableSize:Size[] = [];

    constructor(){
        super();
    }

    setAvailableColor =(color:Color[])=>{
        this.availableColor = color;
    }

    setAvailableSize = (size:Size[]) => {
    this.availableSize = size;
    }

    public override getRequiredFields(){
        return {message: "Kinly select size and color", options:[{name:'size',list:this.availableSize},{name:'color',list:this.availableColor}]};
    } 
   
}