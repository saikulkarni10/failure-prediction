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
     
        this.data1=JSON.stringify(data);
        console.log(this.data1);
        this.http.post<string>(this.baseUrl,this.data1,httpOptions).subscribe(data2=>{
          
           if(data2=="1")
            {
            document.body.style.backgroundColor="blue";
            document.body.style.backgroundImage="url('../assets/img/background3.jpg')";

              document.write("<h2><b>The patient is likely to have a liver failure.</b></h2><br> <br> <br>");
              if(data.total_bilirubin>1.2)
            {
              document.write("The total bilirubin is high. It should be in range of 1 to 1.2<br> <br> <br>");
            }
            else if(data.total_bilirubin<1)
            {
              document.write("The total bilirubin is low. It should be in range of 1 to 1.2mg/dl<br> <br> <br>");
            }
            document.write("The total bilirubin is low. It should be in range of 1 to 1.2mg/dl<br> <br> <br>");
            if(data.direct_bilirubin>0.3)
            {
              document.write("The direct bilirubin is high. It should be less than 0.3mg/dl<br> <br> <br>");
            }
            if(data.alamine_aminotransferase>60)
            {
              document.write("The alamine aminotransferase is high. It should be in range of 20 to 60 units per litre<br> <br> <br>");
            }
            if(data.alamine_aminotransferase<20)
            {
              document.write("The alamine aminotransferase is low. It should be in range of 20 to 60 units per litre<br> <br> <br>");
            }
            if(data.total_proteins<6)
            {
              document.write("The total proteins is low. It should be in range of 6 to 8.5<br> <br> <br>");
            }
            if(data.total_proteins>8.5)
            {
              document.write("The total proteins is high. It should be in range of 6 to 8.5<br> <br> <br>");
            }
            if(data.albumin>5)
            {
              document.write("The albumin is high. It should be in range of 3.5 to 5 gm/l<br> <br> <br>");
            }
            if(data.albumin<3.5)
            {
              document.write("The albumin is low. It should be in range of 3.5 to 5 gm/l <br> <br> <br>");
            }
            if(data.albumin_and_globulin_ratio>3.5)
            {
              document.write("The albumin and globulin ratio is high. It should be in range of 2 to 3.5 <br> <br>  <br>");
            }
            if(data.albumin_and_globulin_ratio<2)
            {
              document.write("The albumin and globulin ratio is low. It should be in range of 2 to 3.5 <br> <br> <br>");
            }

            }
           else{
             
            document.body.style.backgroundColor="gray";
            document.write("<h2><b>The patient is not likely to have a liver failure.</b></h2><br> <br> <br>");
            if(data.total_bilirubin>1.2)
            {
              document.write("The total bilirubin is high. It should be in range of 1 to 1.2mg/dl <br> <br> <br>");
            }
            else if(data.total_bilirubin<1)
            {
              document.write("The total bilirubin is low. It should be in range of 1 to 1.2mg/dl <br> <br> <br>");
            }
            
            if(data.direct_bilirubin>0.3)
            {
              document.write("The direct bilirubin is high. It should be less than 0.3mg/dl <br> <br> <br>");
            }
            if(data.alamine_aminotransferase>60)
            {
              document.write("The alamine aminotransferase is high. It should be in range of 20 to 60 units per litre <br> <br> <br>");
            }
            if(data.alamine_aminotransferase<20)
            {
              document.write("The alamine aminotransferase is low. It should be in range of 20 to 60 units per litre <br> <br> <br>");
            }
            if(data.total_proteins<6)
            {
              document.write("The total proteins is low. It should be in range of 6 to 8.5 <br> <br> <br>");
            }
            if(data.total_proteins>8.5)
            {
              document.write("The total proteins is high. It should be in range of 6 to 8.5 <br> <br> <br>");
            }
            if(data.albumin>5)
            {
              document.write("The albumin is high. It should be in range of 3.5 to 5 gm/l <br> <br> <br>");
            }
            if(data.albumin<3.5)
            {
              document.write("The albumin is low. It should be in range of 3.5 to 5 gm/l  <br> <br> <br>");
            }
            if(data.albumin_and_globulin_ratio>3.5)
            {
              document.write("The albumin and globulin ratio is high. It should be in range of 2 to 3.5 <br> <br> <br>");
            }
            if(data.albumin_and_globulin_ratio<2)
            {
              document.write("The albumin and globulin ratio is low. It should be in range of 2 to 3.5 <br><br> <br>");
            }

           }
          
        });

    }

    getAge()
    {
        console.log("Age :"+this.age1);
    }

  
    }

