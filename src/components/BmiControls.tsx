import React from "react";
import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const BmiControls: React.FC<{
  calculateBmi: () => void;
  resetInputs: () => void;
}> = (props) => {
  const { calculateBmi, resetInputs } = props;
  return (
    <IonRow>
      <IonCol className="ion-text-left">
        <IonButton onClick={calculateBmi}>
          <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
          Calculate
        </IonButton>
      </IonCol>

      <IonCol className="ion-text-right">
        <IonButton onClick={resetInputs}>
          <IonIcon slot="start" icon={refreshOutline}></IonIcon>
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BmiControls;
