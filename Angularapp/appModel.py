# Import the Libraries 
import pandas as pd
import numpy as np 
import matplotlib.pyplot as plt 
from sklearn import svm, datasets
import pickle
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report,confusion_matrix
from sklearn.ensemble import GradientBoostingClassifier

from sklearn.model_selection import train_test_split
  
# Import some Data from the iris Data Set 
liver1 = pd.read_csv(r"C:\Users\admin\Desktop\Project Data\Flask Files\newsmote.csv") 
  
# Take only the first two features of Data. 
# To avoid the slicing, Two-Dim Dataset can be used 
  
X = liver1.iloc[: ,0:10] 
y = liver1.Dataset


X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=.25)
  
#lr_list=[0.05,0.075,0.1,0.25,0.5,0.75,1]
lr_list=[0.75]
for learning_rate in lr_list:
    gb_clf=GradientBoostingClassifier(n_estimators=20,learning_rate=learning_rate,max_features=2,max_depth=2,random_state=0)
    gb_clf.fit(X_train,y_train)
    #print("learning_rate",learning_rate)
    #print("accuracy_score(training):{0:.3f}".format(gb_clf.score(X_train,y_train)))
    #print("accuracy_score(testing):{0:.3f}".format(gb_clf.score(X_test,y_test)))
  


pickle.dump(gb_clf, open('model.pkl','wb'))

# model = pickle.load(open('model.pkl','rb'))
# print(model.predict([[17,1,0.9,0.3,202,22,19,7.4,4.1,1.2]]))
