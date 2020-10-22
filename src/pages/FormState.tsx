import { makeObservable, observable } from "mobx";
import FormStateCommon from "../state/FormStateCommon";

class FormState extends FormStateCommon {
  firstName: String = "";
  lastName: String = "";
  phone: String = "";
  extraPhone: String = "";

  data = {
    firstName: "f",
    lastName: "l",
    phone: "",
    extraPhone: "",
  };

  validations = {
    firstName: "required|min:3",
    lastName: "required",
    extraPhone: "required_with:phone",
  };

  constructor() {
    super();
    makeObservable(this, {
      firstName: observable,
      lastName: observable,
      phone: observable,
      extraPhone: observable,

      data: observable.deep,
    });
  }
}
// Copiar todo al nuevo mural (IZQUIERDA), con un grafico del POC
// fallback 2 secs, el window de tiempo para buscar la DATA. Subtitulo de PUNTO 1 (ya tenemos Poc, etc). manejar mural: RAMI
export default new FormState();
