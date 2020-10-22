import { Form } from "semantic-ui-react";
import React from "react";
import { Observer } from "mobx-react-lite";

interface TextInputProps {
  state: any;
  stateKey: string;
  placeHolder?: string;
}

export const TextInput = ({ state, stateKey, placeHolder }: TextInputProps) => {
  return (
    <Observer>
      {() => {
        return (
          <Form.Input
            error={
              state.$errors[stateKey] && {
                content: state.$errors[stateKey][0],
                pointing: "below",
              }
            }
            placeholder={placeHolder}
            name={stateKey}
            value={state.data[stateKey]}
            onChange={state.handleInputChange}
            onBlur={state.handleInputBlur}
          />
        );
      }}
    </Observer>
  );
};

export default TextInput;
