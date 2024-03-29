import { Employee } from './employee';

export class SalariedEmployee extends Employee {
    private  weeklySalary:number;
    constructor(firstName:string,lastName:string,socialSecurityNumber:string,weeklySalary:number){
        super(firstName,lastName,socialSecurityNumber)
        if (weeklySalary < 0.0) {
            throw new Error(
            "Weekly salary must be >= 0.0"); }
            this.weeklySalary = weeklySalary;
    }

    // return salary.
    public setWeeklySalary(weeklySalary:number) {
        if(weeklySalary < 0.0) {
            throw new Error("weekly salary must be >= 0.0");
        }
        this.weeklySalary = weeklySalary;
    };

    public getWeeklySalary() { return this.weeklySalary};

    public override earnings = ():number => {return this.getWeeklySalary()};
    
    public override toString = ():string => {
        return `salaried employee:  ${super.toString()}, weekly salary ${this.getWeeklySalary()}`;
    }
}