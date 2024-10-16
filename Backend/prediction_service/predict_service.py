import numpy as np
from prediction_service.model import load_or_train_model

# Load or train the model when service starts
model = load_or_train_model()

def predict_outcome_service(pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age):
    # Prepare input array
    input_data = np.array([[pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age]])
    
    # Make prediction
    prediction = model.predict(input_data)
    
    # Convert prediction to binary outcome
    return round(prediction[0][0])
