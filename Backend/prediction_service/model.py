from keras.models import Sequential
from keras.layers import Dense
import pandas as pd
import os

MODEL_PATH = './prediction_service/saved_model.h5'

def load_or_train_model():
    # Check if model is already trained and saved
    if os.path.exists(MODEL_PATH):
        from keras.models import load_model
        model = load_model(MODEL_PATH)
    else:
        # Load dataset
        data = pd.read_csv('diabetes.csv')
        x = data.drop('Outcome', axis=1)
        y = data['Outcome']
        
        # Define the Keras model
        model = Sequential()
        model.add(Dense(12, input_dim=8, activation='relu'))
        model.add(Dense(8, activation='relu'))
        model.add(Dense(1, activation='sigmoid'))
        
        # Compile the model
        model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
        
        # Train the model
        model.fit(x, y, epochs=150, batch_size=10)
        
        # Save the trained model
        model.save(MODEL_PATH)
    
    return model
