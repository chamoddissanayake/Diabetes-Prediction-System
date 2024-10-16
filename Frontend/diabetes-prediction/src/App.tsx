import React from 'react';
import DiabetesPrediction from "./DiabetesPrediction";
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  return (
   <div>
       <SnackbarProvider maxSnack={3}>
           <DiabetesPrediction/>
       </SnackbarProvider>
   </div>
  );
}

export default App;
