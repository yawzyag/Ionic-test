import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const InputControl: React.FC<{
  selectedVal: "mkg" | "ftlbs";
  onSelectVal: (value: "mkg" | "ftlbs") => void;
}> = (props) => {
  const { selectedVal, onSelectVal } = props;
  const inputChangeHandle = (event: CustomEvent) => {
    onSelectVal(event.detail.value);
  };
  return (
    <IonSegment value={selectedVal} onIonChange={inputChangeHandle}>
      <IonSegmentButton value="mkg">
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};
export default InputControl;
