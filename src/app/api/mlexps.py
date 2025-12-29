import numpy as np
import pandas as pd
import json
import sys
from sklearn import preprocessing, metrics
from sklearn.ensemble import RandomForestClassifier
# from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

def predict(data):
   dataset = pd.read_csv('C:/Users/omara/Downloads/Personal/AI Model/src/db/skydata.csv')
   X = dataset[['u', 'g', 'r', 'i', 'z', 'redshift']]
   y = dataset[['class']]
   u = data.get("u", [])
   g = data.get("g", [])
   r = data.get("r", [])
   i = data.get("i", [])
   z = data.get("z", [])
   rshift = data.get("rshift", [])

   norm = preprocessing.Normalizer().fit(X)
   X = norm.transform(X)
   X = np.asarray(X)

   lb = preprocessing.LabelBinarizer()
   y = lb.fit_transform(y)
   y = np.asarray(y)
   y = np.squeeze(y)

   X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
   unique_elements_train, counts_elements_train = np.unique(y_train, return_counts=True)
   unique_elements_test, counts_elements_test = np.unique(y_test, return_counts=True)

   rf = RandomForestClassifier()
   rf.fit(X_train, y_train)
   y_pred = [rf.predict([[u, g, r, i, z, rshift]])]
   # y_pred = [rf.predict([[20, 17, 17, 20, 17, 0.00001]])]
   if(y_pred[0] == 0):
      return json.dumps('galaxy')
   if(y_pred[0] == 1):
      return json.dumps('star')
#    print('Confusion Matrix:\n', metrics.confusion_matrix(y_test, y_pred))
#    print('Precision Score:', metrics.precision_score(y_test, y_pred))
#    print('Recall:', metrics.recall_score(y_test, y_pred))
#    print('F1 Score:', metrics.f1_score(y_test, y_pred))

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    response = predict(input_data)
    print(response)