import { Observer } from "mobx-react-lite";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../components/formElements/TextInput";
import FormStateCommon from "../state/FormStateCommon";
import FormStateGlobal from "./FormState";

export const FormExample = () => {
  return (
    <Observer>
      {() => {
        return (
          <>
            <h2> XXX </h2>

            <Form>
              <TextInput
                state={FormStateGlobal}
                stateKey="firstName"
                placeHolder="Name"
              ></TextInput>

              <TextInput
                state={FormStateGlobal}
                stateKey="lastName"
                placeHolder="Last Name"
              ></TextInput>

              <TextInput
                state={FormStateGlobal}
                stateKey="phone"
                placeHolder="Phone"
              ></TextInput>

              {FormStateGlobal.data.firstName.length > 0 && (
                <TextInput
                  state={FormStateGlobal}
                  stateKey="extraPhone"
                  placeHolder="Extra"
                ></TextInput>
              )}

              <Button
                onClick={() => {
                  FormStateGlobal.validateAll();
                  console.log(FormStateGlobal);
                }}
              >
                Submit
              </Button>
            </Form>
          </>
        );
      }}
    </Observer>
  );
};

export default FormExample;
