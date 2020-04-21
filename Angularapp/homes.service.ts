import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data} from "./models/data.model"

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  };

@Injectable()
export class HomesService{
    age1 : number;
    data1 :string;
    constructor(private http:HttpClient){}

    private baseUrl = 'http://127.0.0.1:5000/hello';

    setData(data : Data)
    {
        // console.log("Age :"+data.enteredAge);
        // console.log("Age :"+data.enteredGender);
        // console.log("Age :"+data.total_bilirubin);
        // console.log("Age :"+data.direct_bilirubin);
        // console.log("Age :"+data.alkaline_phosphotase);
        // console.log("Age :"+data.alamine_aminotransferase);
        // console.log("Age :"+data.aspartate_aminotransferase);
        // console.log("Age :"+data.albumin);
        // console.log("Age :"+data.total_proteins);
        // console.log("Age :"+data.albumin_and_globulin_ratio);
        this.data1=JSON.stringify(data);
        console.log(this.data1);
        this.http.post<string>(this.baseUrl,this.data1,httpOptions).subscribe(data2=>{
            if(data2=="1")
           alert("The patient is likely to have a  liver failure.");
           else{
            alert("The patient is not likely to have a liver  failure.");
           }
          
        });

    }

    getAge()
    {
        console.log("Age :"+this.age1);
    }

  
    }

