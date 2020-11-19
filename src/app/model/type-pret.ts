import { EtypeName } from "./etype-name";
import { Pret } from "./pret";

export class TypePret {
    id:number;
    nameType:EtypeName;
    libelle:string;
    mnt_plafond:number;
    dureeRemb_plafond:number;
    pret:Pret[];
}
