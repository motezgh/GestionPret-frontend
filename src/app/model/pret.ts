import { AppUser } from "./app-user";
import { Etat } from "./etat";
import { TypePret } from "./type-pret";

export class Pret {
    id:number;
    montant:number;
    dureeRemboursement:number;
    echeance:number;
    description:string;
    debutRemb:Date;
    finRemb:Date;
    etat:Etat ;
    typePret=new TypePret();
    user=new AppUser();
    user_id:number;
    createdAt:Date;
}
