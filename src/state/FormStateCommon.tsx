import Validator from "validatorjs";
import { makeObservable, observable } from "mobx";

abstract class FormStateCommon {
  abstract validations: any;
  $errors: any = {};
  data: any;

  constructor() {
    makeObservable(this, { $errors: observable });
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  handleInputChange(e: any) {
    const target = e.target as HTMLInputElement;
    (this.data as any)[target.getAttribute("name")] = e.target.value;
  }

  handleInputBlur(e: any) {
    const currentKey = e.target.getAttribute("name");
    const v = new Validator(this.data, this.validations);
    v.check();

    this.$errors[currentKey] = v.errors.has(currentKey)
      ? v.errors.get(currentKey)
      : null;
  }

  validateAll() {
    const v = new Validator(this.data, this.validations);
    if (v.check()) {
      this.$errors = {};
      return true;
    }

    this.$errors = v.errors.all();
    return false;
  }
}

export default FormStateCommon;
