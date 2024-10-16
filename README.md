
# Diabetes Prediction System


This diabetes prediction application leverages machine learning to assess the risk of diabetes based on user-provided health metrics. Users can submit key data points—such as glucose levels, BMI, and age—via a simple web interface. The application utilizes a trained neural network model to generate predictions, offering insights into potential diabetes outcomes. With built-in error handling for missing data, it ensures a user-friendly experience while providing crucial health insights.
## Run Locally

Install Python 3.10.0


  https://www.python.org/downloads/release/python-3100/

Install Node 21.6.2


  https://nodejs.org/en/blog/release/v21.6.2


Clone the project

```bash
  git clone https://github.com/chamoddissanayake/Diabetes-Prediction-System.git
```

Go to Frontend Folder

```bash
  Frontend > diabetes-prediction
```

Install dependencies

```bash
  npm install
```

Start the Frontend

```bash
  npm start
```

Go to Frontend Web App

```bash
  http://localhost:3000/
```

Go to Backend Folder

```bash
  Backend >
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the Backend

```bash
  python app.py
```
## Tech Stack

**Backend:** Flask (Python)

**Frontend:** React (Typescript)

**Machine Learning Library:** Keras (with TensorFlow as backend)

**Data Manipulation:** Pandas (Python)

**Model Storage:** H5 format (for saving the trained Keras model)

**Web Technologies:**

    RESTful API
    JSON for data interchange
    CORS for cross-origin resource sharing
## Usage/Examples


POST Method

```bash
http://localhost:5004/predict
```

Request
```javascript
Has Diabetes: 
{
  "pregnancies": 6,
  "glucose": 148,
  "blood_pressure": 72,
  "skin_thickness": 35,
  "insulin": 0,
  "bmi": 33.6,
  "diabetes_pedigree_function": 0.627,
  "age": 50
}

No Diabetes:
{
  "pregnancies": 1,
  "glucose": 89,
  "blood_pressure": 66,
  "skin_thickness": 23,
  "insulin": 94,
  "bmi": 28.1,
  "diabetes_pedigree_function": 0.107,
  "age": 21
} 

```
Response
```javascript
Has Diabetes:
{
    "predictedState": 1
}

No Diabetes:
{
    "predictedState": 0
}

```
