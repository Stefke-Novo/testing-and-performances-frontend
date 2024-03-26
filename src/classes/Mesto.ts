export default class Mesto{
    private _m!: number;
    private _pttBroj!:string;
    private _naziv!:string;
    private _brojStanovnika!:number;

    constructor(){
    }
    get m():number{
        return this._m;
    }
    get pptBroj():string{
        return this._pttBroj;
    }
    set pttBroj(value:string){
        this._pttBroj = value;
    }
    get naziv():string{
        return this._naziv;
    }
    set naziv(value:string){
        this._naziv=value;
    }
    get brojStanovnika():number{
        return this._brojStanovnika;
    }
    set brojStanovnika(value:number){
        this._brojStanovnika=value;
    }
    public setM(value:number):Mesto{
        this._m=value;
        return this;
    }
    public setPttBroj(value:string):Mesto{
        this._pttBroj=value;
        return this;
    }
    public setNaziv(value:string):Mesto{
        this._naziv=value;
        return this;
    }
    public setBrojStanovnika(value:number):Mesto{
        this._brojStanovnika=value;
        return this;
    }
}