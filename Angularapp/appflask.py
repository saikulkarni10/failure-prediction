# Importing flask module in the project is mandatory 
# An object of Flask class is our WSGI application. 
from flask import Flask
from flask import Response 
from flask_cors import CORS,cross_origin
from flask import jsonify, json
from flask import request
import pickle
import numpy as np
import pandas as pd

# Flask constructor takes the name of  
# current module (__name__) as argument. 
app = Flask(__name__) 
CORS(app)
model = pickle.load(open('model.pkl', 'rb'))


# The route() function of the Flask class is a decorator,  
# which tells the application which URL should call  
# the associated function. 
@app.route('/hello', methods=['GET','POST']) 

# ‘/’ URL is bound with hello_world() function. 
def hello(): 
    
    url_responser={}
    values_list=[]
    #res=request.get_json()
    #print(res)
    url_response=request.data.decode()      
    response=json.loads(url_response)
    age=response['enteredAge']
    gender=response["enteredGender"]
    total_bilirubin=response["total_bilirubin"]
    direct_bilirubin=response["direct_bilirubin"]
    alkaline_phosphotase=response["alkaline_phosphotase"]
    alamine_aminotransferase=response["alamine_aminotransferase"]
    aspartate_aminotransferase=response["aspartate_aminotransferase"]
    total_proteins=response["total_proteins"]
    albumin=response["albumin"]
    albumin_and_globulin_ratio=response["albumin_and_globulin_ratio"]
    
    df=pd.DataFrame()
    
    # df1= df.append({"Age":age,"Gender": gender,"Total_bilirubin":total_bilirubin,
    # "Direct_bilirubin":direct_bilirubin,"Alkaline_phosphotase":alkaline_phosphotase,
    # "Alamine_aminotransferase":alamine_aminotransferase,"Aspartate_aminotransferase":aspartate_aminotransferase,
    # "Total_proteins":total_proteins,"Albumin":albumin,"Albumin_and_globulin_ratio":albumin_and_globulin_ratio},ignore_index=True)

    df1=pd.DataFrame()
    



    print(response.values())

    prediction = model.predict([np.array(list(response.values()))])
    output =prediction[0]
    print(output)
    #return Response(output)
    if(output==0):
        df1=df.append([[age,gender,total_bilirubin,direct_bilirubin,alkaline_phosphotase,
    alamine_aminotransferase,aspartate_aminotransferase,total_proteins,albumin,albumin_and_globulin_ratio,0]])
        df1.to_csv(r"C:\Users\admin\Desktop\Project Data\TestUserData.csv",mode='a',header=False,index=False)
        return Response("0")
        
    else:
        df1=df.append([[age,gender,total_bilirubin,direct_bilirubin,alkaline_phosphotase,
    alamine_aminotransferase,aspartate_aminotransferase,total_proteins,albumin,albumin_and_globulin_ratio,1]])
        df1.to_csv(r"C:\Users\admin\Desktop\Project Data\TestUserData.csv",mode='a',header=False,index=False)
        return Response("1")

    
    


  
# main driver function 
if __name__ == '__main__': 
  
    # run() method of Flask class runs the application  
    # on the local development server. 
    app.run() 