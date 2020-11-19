
import { Econtrat } from "./econtrat";
import { AppRole } from "./app-role";
import { Pret } from "./pret";
import { Erole } from './erole';

export class AppUser {
    id :number;
    nom:string;
    prenom:string;
    username:string;
    password:string;
    email:string;
    dateNaissance:Date;
    phone:string;
    photoUrl:string;
    adresse:string;
    salaire:number;
    capRemb:number;
    fonction:string;
    departement:string;
    contratType:Econtrat;
    debutContrat:Date;
    finContrat:Date;
    prets:Pret[];
    roles:string[];

}
