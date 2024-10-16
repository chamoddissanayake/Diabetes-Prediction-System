from flask import Flask, request, jsonify
from prediction_service.predict_service import predict_outcome_service
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Ensure required fields are present
    required_fields = ['pregnancies', 'glucose', 'blood_pressure', 'skin_thickness', 'insulin', 'bmi', 'diabetes_pedigree_function', 'age']
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing data fields'}), 400
    
    # Call the service function to get prediction
    val = predict_outcome_service(
        data['pregnancies'], data['glucose'], data['blood_pressure'],
        data['skin_thickness'], data['insulin'], data['bmi'],
        data['diabetes_pedigree_function'], data['age']
    )
    
    return jsonify({'predictedState': val}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)
