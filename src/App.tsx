import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonAlert,
} from "@ionic/react";
import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/InputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [result, setResult] = useState<number>();
  const [alertError, setAlertError] = useState<string>();
  const [selectedMethod, setSelectedMethod] = useState<"mkg" | "ftlbs">("mkg");
  const weightRef = useRef<HTMLIonInputElement>(null);
  const heightRef = useRef<HTMLIonInputElement>(null);
  const calculateBmi = () => {
    const enterWeight = weightRef.current!.value;
    const enterHeight = heightRef.current!.value;

    if (
      !enterHeight ||
      !enterWeight ||
      +enterHeight <= 0 ||
      +enterWeight <= 0
    ) {
      setAlertError("Please Enter Valid Input");
      return;
    }

    const weigthConverted = selectedMethod === "ftlbs" ? 2.2 : 1;
    const weigth = +enterWeight / weigthConverted;

    const heightConvert = selectedMethod === "ftlbs" ? 2.2 : 1;
    const height = +enterHeight / heightConvert;
    const bmi = weigth / (height * height);

    setResult(bmi);
  };
  const resetInputs = () => {
    weightRef.current!.value = "";
    heightRef.current!.value = "";
    setResult(undefined);
  };

  const clearError = () => {
    setAlertError("");
  };

  const onSelectVal = (selectedVal: "mkg" | "ftlbs") => {
    resetInputs()
    setSelectedMethod(selectedVal);
  };

  return (
    <>
      <IonAlert
        isOpen={!!alertError}
        message={alertError}
        buttons={[
          {
            text: "Okay",
            handler: () => {
              clearError();
            },
          },
        ]}
      ></IonAlert>
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  onSelectVal={onSelectVal}
                  selectedVal={selectedMethod}
                ></InputControl>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({selectedMethod === "mkg" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight (
                    {selectedMethod === "mkg" ? "kilograms" : "lbs"})
                  </IonLabel>
                  <IonInput type="number" ref={weightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <BmiControls
              calculateBmi={calculateBmi}
              resetInputs={resetInputs}
            ></BmiControls>

            {result && <BmiResult result={result}></BmiResult>}
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
