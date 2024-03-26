import Mesto from "./Mesto";
export default class Osoba{
    private _o!:number;
    private _ime!:string;
    private _prezime!:string;
    private _datumRodjenja!:Date;
    private _starost!:number;
    private _jmbg!:string;
    private _brojTelefona!:string;
    private _rodnoMesto!:Mesto;
    private _prebivaliste!:Mesto;

    constructor(o:number,ime:string,prezime:string,datumRodjena:Date,starost:number,jmbg:string,brojTelefona:string,rodnoMestoId:number){
        this._o=o;
        this._ime=ime;
        this._prezime=prezime;
        this._datumRodjenja=datumRodjena;
        this._starost=starost;
        this._jmbg=jmbg;
        this._brojTelefona=brojTelefona;
        this._rodnoMesto = new Mesto().setM(rodnoMestoId);
        this._prebivaliste= new Mesto();
    }

    get o():number{
        return this.o;
    }
    set o(value:number){
        this._o=value;
    }
    get ime():string{
        return this._ime;
    }
    set ime(value:string){
        this._ime=value;
    }
    get prezime():string{
        return this._prezime;
    }
    get datumRodjenja():Date{
        return this._datumRodjenja;
    }
    set datumRodjenja(value:Date){
        this._datumRodjenja=value;
    }
    get starost():number{
        return this._starost;
    }
    set starost(value:number){
        this._starost=this.starost;
    }
    get jmbg():string{
        return this._jmbg;
    }
    set jmbg(value:string){
        this._jmbg = value;
    }
    get brojTelefona(){
        return this._brojTelefona;
    }
    set beojTelefona(value:string){
        this._brojTelefona=value;
    }
    get rodnoMesto():Mesto{
        return this._rodnoMesto;
    }
    set rosdnoMesto(value:Mesto){
        this._rodnoMesto=value;
    }
    get prebivaliste():Mesto{
        return this._prebivaliste;
    }
    set prebivaliste(value:Mesto){
        this._prebivaliste=value;
    }

    public static getAttributes():string[]{
        return ["ИД","Име","Презиме","Датум рођења","Старост","ЈМБГ","Број телефона","Родно место"]
    }
}