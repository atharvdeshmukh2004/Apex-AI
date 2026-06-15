import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
data = pd.read_excel("career_ml_dataset.xlsx", header=3)

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


















#Using this code





# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.feature_extraction.text import TfidfVectorizer
# import joblib

# # 1. Load dataset
# df = pd.read_excel("career_ml_dataset.xlsx", header=3)

# # Clean
# df.columns = df.columns.str.strip()
# df = df.loc[:, ~df.columns.str.contains("^Unnamed")]

# # Drop unnecessary columns
# df = df.drop(columns=["student_id", "name", "city"], errors="ignore")

# # 2. Encode categorical features
# categorical_cols = [
#     'education_level', 'stream', 'learning_style',
#     'work_preference', 'risk_appetite', 'location_preference'
# ]

# feature_encoders = {}
# for col in categorical_cols:
#     le = LabelEncoder()
#     df[col] = le.fit_transform(df[col].astype(str))
#     feature_encoders[col] = le

# # 3. Encode target
# target_encoder = LabelEncoder()
# df['career_cluster'] = target_encoder.fit_transform(df['career_cluster'])

# # 4. TF-IDF for aspirations
# tfidf = TfidfVectorizer(max_features=100)
# asp_matrix = tfidf.fit_transform(df['aspirations'].fillna('')).toarray()

# asp_df = pd.DataFrame(asp_matrix, columns=[f"asp_{i}" for i in range(asp_matrix.shape[1])])

# # 5. Combine features
# X_numeric = df.drop(columns=["career_cluster", "aspirations"])
# X = pd.concat([X_numeric, asp_df], axis=1)
# y = df["career_cluster"]

# # 6. Scale numeric features
# scaler = StandardScaler()
# numeric_cols = [
#     'percentage_score', 'soft_analytical', 'soft_creative',
#     'soft_communication', 'soft_leadership', 'soft_teamwork'
# ]
# X[numeric_cols] = scaler.fit_transform(X[numeric_cols])

# # 7. Train-test split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.15, random_state=42, stratify=y
# )

# # 8. Train model
# model = RandomForestClassifier(
#     n_estimators=300,
#     class_weight='balanced',
#     n_jobs=-1,
#     random_state=42
# )

# model.fit(X_train, y_train)

# # 9. Save everything
# joblib.dump(model, "career_model.pkl")
# joblib.dump(feature_encoders, "feature_encoders.pkl")
# joblib.dump(target_encoder, "target_encoder.pkl")
# joblib.dump(tfidf, "tfidf.pkl")
# joblib.dump(scaler, "scaler.pkl")
# joblib.dump(list(X.columns), "feature_names.pkl")

# print(f"✅ Accuracy: {model.score(X_test, y_test)*100:.2f}%")






