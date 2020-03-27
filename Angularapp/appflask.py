# Importing flask module in the project is mandatory 
# An object of Flask class is our WSGI application. 
from flask import Flask
from flask import Response 
from flask_cors import CORS,cross_origin
from flask import jsonify, json
from flask import request
import pickle
import numpy as np

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
def hello_world(): 
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
    #print(age,gender,total_bilirubin,direct_bilirubin,alkaline_phosphotase,alamine_aminotransferase,aspartate_aminotransferase,total_proteins,albumin,albumin_and_globulin_ratio)

    print(response.values())

    prediction = model.predict([np.array(list(response.values()))])
    output =prediction[0]
    print(output)
    #return Response(output)
    if(output==0):
        return Response("0")
    else:
         return Response("1")

    
    


  
# main driver function 
if __name__ == '__main__': 
  
    # run() method of Flask class runs the application  
    # on the local development server. 
    app.run() 