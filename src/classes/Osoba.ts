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
    set prezime(value:string){
        this._prezime=value;
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
    set brojTelefona(value:string){
        this._brojTelefona=value;
    }
    get rodnoMesto():Mesto{
        return this._rodnoMesto;
    }
    set rodnoMesto(value:Mesto){
        this._rodnoMesto=value;
    }
    get prebivaliste():Mesto{
        return this._prebivaliste;
    }
    set prebivaliste(value:Mesto){
        this._prebivaliste=value;
    }

    public setIme(value:string):Osoba{
        this._ime=value;
        return this;
    }
    public setPrezime(value:string):Osoba{
        this._prezime=value;
        return this;
    }
    public setDatumRodjenja(value:Date):Osoba{
        this._datumRodjenja=value;
        return this;
    }
    public setJmbg(value:string):Osoba{
        this._jmbg=value;
        return this;
    }
    public setBrojTelefona(value:string){
        this._brojTelefona=value;
        return this;
    }
    public setRodnoMesto(value:Mesto){
        this._rodnoMesto=value;
        return this;
    }
    public setPrebivaliste(value:Mesto){
        this._prebivaliste=value;
        return this;
    }

    public toJson(){
        return {o:this._o,ime:this._ime,prezime:this._prezime,datumRodjenja:this._datumRodjenja.toISOString(),starost:this._starost,jmbg:this._jmbg,brojTelefona:this._brojTelefona,rodno_mesto_id:this._rodnoMesto.m,rodnoMesto:this._rodnoMesto,prebivaliste:this._prebivaliste}
    }

    public static getAttributes():string[]{
        return ["ИД","Име","Презиме","Датум рођења","Старост","ЈМБГ","Број телефона","Пребивалиште","Родно место"]
    }
}