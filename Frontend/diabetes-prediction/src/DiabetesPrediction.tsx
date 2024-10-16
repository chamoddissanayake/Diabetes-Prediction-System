import React, {useState} from 'react';
import {Tooltip} from 'react-tooltip';
import './DiabetesPrediction.css';
import loadingGif from './assets/loading.gif';
import axios from 'axios';
import {SnackbarProvider, useSnackbar} from 'notistack';

const DiabetesPrediction: React.FC = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [formData, setFormData] = useState({
        age: '',
        pregnancies: '',
        glucose: '',
        blood_pressure: '',
        skin_thickness: '',
        insulin: '',
        bmi: '',
        diabetes_pedigree_function: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [networkResponse, setNetworkResponse] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        ['age', 'pregnancies', 'glucose', 'blood_pressure', 'skin_thickness', 'insulin', 'bmi', 'diabetes_pedigree_function'].forEach(field => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = `This field is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const finalObj = {
                age: Number(formData.age),
                pregnancies: Number(formData.pregnancies),
                glucose: Number(formData.glucose),
                blood_pressure: Number(formData.blood_pressure),
                skin_thickness: Number(formData.skin_thickness),
                insulin: Number(formData.insulin),
                bmi: Number(formData.bmi),
                diabetes_pedigree_function: Number(formData.diabetes_pedigree_function),
            };

            // const input_data = [final.age, final.pregnancies, final.glucose, final.blood_pressure, final.skin_thickness, final.insulin, final.bmi, final.diabetes_pedigree_function];
            sendData(finalObj);
        }
    };

    const sendData = async (finalObj: any) => {

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5004/predict', finalObj);
            setNetworkResponse(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("1");
            console.error('Error:', error);
            setIsLoading(false);
            enqueueSnackbar('Error: ' + error, {variant: 'error'});
        }
    };

    const handleSample = () => {
        setFormData({
            pregnancies: '6',
            glucose: '148',
            blood_pressure: '72',
            skin_thickness: '35',
            insulin: '0',
            bmi: '33.6',
            diabetes_pedigree_function: '0.627',
            age: '50'
        });
        setErrors({});
    };


    const handleSample2 = () => {
        setFormData({
            pregnancies: '1',
            glucose: '89',
            blood_pressure: '66',
            skin_thickness: '23',
            insulin: '94',
            bmi: '28.1',
            diabetes_pedigree_function: '0.107',
            age: '21'
        });
        setErrors({});
    };

    return (
        <div className="container">
            <div className="title-container">
                <h4><b>Diabetes Prediction System</b></h4>
            </div>

            <div className='form-result-container'>
                <div className="form-section">
                    <div className="form-field">
                        <label className='bold-gen'>Age <span data-tooltip-id="tooltip-age"
                                                              data-tooltip-content="Enter your age">ⓘ</span></label>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={formData.age}
                            onChange={handleChange}
                            min={1}
                            max={100}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.age && <span className="error">{errors.age}</span>}
                        <Tooltip id="tooltip-age"/>
                    </div>

                    <div className="form-field">
                        <label className='bold-gen'>Pregnancies <span data-tooltip-id="tooltip-pregnancies"
                                                                      data-tooltip-content="Enter your Pregnancies">ⓘ</span></label>
                        <input
                            type="number"
                            name="pregnancies"
                            className="form-control"
                            value={formData.pregnancies}
                            onChange={handleChange}
                            min={0}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.pregnancies && <span className="error">{errors.pregnancies}</span>}
                        <Tooltip id="tooltip-pregnancies"/>
                    </div>

                    <div className="form-field">
                        <label className='bold-gen'>Glucose <span data-tooltip-id="tooltip-glucose"
                                                                  data-tooltip-content="Enter your glucose level">ⓘ</span></label>
                        <input
                            type="number"
                            name="glucose"
                            className="form-control"
                            value={formData.glucose}
                            onChange={handleChange}
                            min={0}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.glucose && <span className="error">{errors.glucose}</span>}
                        <Tooltip id="tooltip-glucose"/>
                    </div>

                    <div className="form-field">
                        <label className='bold-gen'>Blood Pressure <span data-tooltip-id="tooltip-blood_pressure"
                                                                         data-tooltip-content="Enter Blood Pressure">ⓘ</span></label>
                        <input
                            type="number"
                            name="blood_pressure"
                            className="form-control"
                            value={formData.blood_pressure}
                            onChange={handleChange}
                            min={0}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.blood_pressure && <span className="error">{errors.blood_pressure}</span>}
                        <Tooltip id="tooltip-blood_pressure"/>
                    </div>


                    <div className="form-field">
                        <label className='bold-gen'>Skin Thickness <span data-tooltip-id="tooltip-skin_thickness"
                                                                         data-tooltip-content="Skin Thickness">ⓘ</span></label>
                        <input
                            type="number"
                            name="skin_thickness"
                            className="form-control"
                            value={formData.skin_thickness}
                            onChange={handleChange}
                            min={0}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.skin_thickness && <span className="error">{errors.skin_thickness}</span>}
                        <Tooltip id="tooltip-skin_thickness"/>
                    </div>

                    <div className="form-field">
                        <label className='bold-gen'>Insulin <span data-tooltip-id="tooltip-insulin"
                                                                  data-tooltip-content="Insulin Level">ⓘ</span></label>
                        <input
                            type="number"
                            name="insulin"
                            className="form-control"
                            value={formData.insulin}
                            onChange={handleChange}
                            min={0}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.insulin && <span className="error">{errors.insulin}</span>}
                        <Tooltip id="tooltip-insulin"/>
                    </div>


                    <div className="form-field">
                        <label className='bold-gen'>BMI ( Body mass index ) <span data-tooltip-id="tooltip-bmi"
                                                              data-tooltip-content="BMI Level ( Body mass index )">ⓘ</span></label>
                        <input
                            type="number"
                            name="bmi"
                            className="form-control"
                            value={formData.bmi}
                            onChange={handleChange}
                            min={0}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.bmi && <span className="error">{errors.bmi}</span>}
                        <Tooltip id="tooltip-bmi"/>
                    </div>

                    <div className="form-field">
                        <label className='bold-gen'>Diabetes Pedigree Function <span
                            data-tooltip-id="tooltip-diabetes_pedigree_function"
                            data-tooltip-content="diabetes_pedigree_function ">ⓘ</span></label>
                        <input
                            type="number"
                            name="diabetes_pedigree_function"
                            className="form-control"
                            value={formData.diabetes_pedigree_function}
                            onChange={handleChange}
                            min={0}
                            onKeyDown={(event) => !/[0-9.]/.test(event.key) || event.key === "Backspace" || (event.key === "." && event.currentTarget.value.includes(".")) ? event.preventDefault() : null}
                        />
                        {errors.diabetes_pedigree_function &&
                            <span className="error">{errors.diabetes_pedigree_function}</span>}
                        <Tooltip id="tooltip-diabetes_pedigree_function"/>
                    </div>


                    <button className="submitBtn bold-gen" onClick={handleSubmit}>Check Status</button>
                    <div className='fill-btn-container'>
                        <label onClick={handleSample}>Fill Sample</label>
                    </div>
                    <div className='fill-btn-container'>
                        <label onClick={handleSample2}>Fill Sample 2</label>
                    </div>

                    {isLoading &&
                        <div className="loading-container">
                            <img src={loadingGif} alt="Loading..." width="70px"/>
                        </div>
                    }
                </div>

                {networkResponse &&
                    <div className='result-container'>
                        {(networkResponse && networkResponse.predictedState === 0) &&
                            <div className="result-section-healthy">
                                <h2>Result</h2>
                                <p>This Person has Does not have Diabetes 😊</p>
                            </div>
                        }

                        {(networkResponse && networkResponse.predictedState === 1) &&
                            <div className="result-section-unhealthy">
                                <h2>Result</h2>
                                <p>This Person has diabetes 😔</p>
                            </div>
                        }
                    </div>
                }

            </div>

        </div>
    );
};

export default DiabetesPrediction;
