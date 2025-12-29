import csv
import pandas as pd
import xgboost as xgb
import train_test_split from sklearn.model_selection
trn = open('C:/Users/omara/Downloads/Personal/AI Model/reviews.csv', mode='r')

df = pd.read_csv(trn)
print(pd.get_dummies(df, df.columns[df.dtypes == 'object']))
X = df
y = df
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
xgb_classifier = xgb.XGBClassifier()
xgb_classifier.fit(X_train, y_train)
predictions = xgb_classifier.predict(X_test)
print(predictions)
print("Accuracy of Model::",accuracy_score(y_test,predictions))