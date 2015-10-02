from sklearn.preprocessing import OneHotEncoder
import pandas as pd
df = pd.read_csv("https://dataminingproject.googlecode.com/svn-history/r44/DataMiningApp/datasets/Iris/iris.csv")
d = df.groupby("Species").first()
d.reset_index(inplace= True)
enc = OneHotEncoder()
enc.fit_transform(d["Species"].values)