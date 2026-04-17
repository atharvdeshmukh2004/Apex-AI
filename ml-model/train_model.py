# import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import LabelEncoder
# import joblib

# # Load dataset (real header is on row index 3)
# data = pd.read_excel("career_ml_dataset.xlsx", header=3)

# # Clean column names
# data.columns = data.columns.str.strip()

# # Remove unnamed/empty columns
# data = data.loc[:, ~data.columns.str.contains("^Unnamed")]

# # FIX 1: Drop identifier/non-feature columns
# # 'student_id', 'name', 'city' are identifiers — not predictive features.
# # Original code only dropped 'student_id'; 'name' and 'city' must also be removed.
# data = data.drop(columns=["student_id", "name", "city"], errors="ignore")

# print("Columns:", list(data.columns))

# # FIX 2: Encode ALL categorical columns — not just dtype 'object'
# # Pandas can store string columns as StringDtype (not 'object'), which the
# # original dtype == "object" check misses, causing the model.fit() to crash
# # with: "ValueError: could not convert string to float"
# encoders = {}
# for column in data.columns:
#     if data[column].dtype == "object" or isinstance(data[column].dtype, pd.StringDtype):
#         le = LabelEncoder()
#         data[column] = le.fit_transform(data[column].astype(str))
#         encoders[column] = le

# # Features and target
# X = data.drop("career_cluster", axis=1)
# y = data["career_cluster"]

# # Train model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X, y)

# # Save model and encoders
# joblib.dump(model, "career_model.pkl")
# joblib.dump(encoders, "encoders.pkl")

# print("Model trained successfully!")
# print("Career classes:", encoders["career_cluster"].classes_)

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
data = pd.read_excel("career_ml_dataset_v5.xlsx", header=3)

# Clean column names
data.columns = data.columns.str.strip()

# Remove unnamed/empty columns
data = data.loc[:, ~data.columns.str.contains("^Unnamed")]

# Drop identifier columns AND aspirations (free text — not a usable feature)
data = data.drop(columns=["student_id", "name", "city", "aspirations"], errors="ignore")

print("Columns:", list(data.columns))

# Encode categorical columns
encoders = {}
for column in data.columns:
    if data[column].dtype == "object" or isinstance(data[column].dtype, pd.StringDtype):
        le = LabelEncoder()
        data[column] = le.fit_transform(data[column].astype(str))
        encoders[column] = le

# Features and target
X = data.drop("career_cluster", axis=1)
y = data["career_cluster"]

print("Features used:", list(X.columns))
print("Training on", len(X), "samples...")

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save
joblib.dump(model, "career_model.pkl")
joblib.dump(encoders, "encoders.pkl")

print("✅ Model retrained successfully!")
print("Career classes:", list(encoders["career_cluster"].classes_))