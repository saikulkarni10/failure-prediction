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
from sklearn.ensemble import AdaBoostClassifier

from sklearn.ensemble import ExtraTreesClassifier
#Import scikit-learn metrics module for accuracy calculation
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier

#Import scikit-learn metrics module for accuracy calculation
# importing libraries 
from sklearn import svm
from sklearn.ensemble import VotingClassifier 
from sklearn.linear_model import LogisticRegression 
from sklearn.svm import SVC 
from sklearn.tree import DecisionTreeClassifier 
from sklearn.datasets import load_iris 
from sklearn.metrics import accuracy_score 
from sklearn import neighbors


from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
from sklearn import metrics

from xgboost import XGBClassifier

from sklearn.model_selection import train_test_split
  
# Import some Data from the iris Data Set 
liver1 = pd.read_csv(r"C:\Users\admin\Desktop\Project Data\newsmote1.csv") 
  
# Take only the first two features of Data. 
# To avoid the slicing, Two-Dim Dataset can be used 
  
X = liver1.iloc[: ,0:11].values
y = liver1.iloc[:,-1].values


X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=.25,random_state=1)
  

# lr_list=[0.75]
# for learning_rate in lr_list:
#     gb_clf=GradientBoostingClassifier(n_estimators=20,learning_rate=learning_rate,max_features=2,max_depth=2,random_state=0)
#     gb_clf.fit(X_train,y_train)
# pickle.dump(gb_clf, open('model.pkl','wb'))
lr=[0.25]
for lr1 in lr:
    model = XGBClassifier(n_estimators=700,max_depth=5,learning_rate=lr1,booster='dart',subsample=0.8,colsample_bytree=0.8,seed=27,nthread=4)
svc1=ExtraTreesClassifier(n_estimators=700,random_state=0)


# Create adaboost classifer object
abc =AdaBoostClassifier(n_estimators=300, base_estimator=svc1,learning_rate=1)



#Create random forest
rf1 = RandomForestClassifier(n_estimators=700, criterion='entropy',n_jobs = -1)

# combine the predictions of several base estimators
clf = VotingClassifier([('model', model),('abc', abc),('rf1', rf1)],weights = [3,1,1])
clf.fit(X_train, y_train)
print("accuracy_score(training):{0:.3f}".format(clf.score(X_train,y_train)))
print("accuracy_score(testing):{0:.3f}".format(clf.score(X_test,y_test)))
  

#y_pred[0]
pickle.dump(clf, open('model.pkl','wb'))
