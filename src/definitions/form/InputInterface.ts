import BaseElementInterface from "./BaseElementInterface";
import InputType from "./InputType";

export default interface InputInterface extends BaseElementInterface {
  type: InputType;

  placeholder?: string;
  form?: string;

  //type file
  accept?: string;
  capture?: boolean;

  //type image
  alt?: string;
  height?: number;
  width?: number;

  //type numeric
  min?: number;
  max?: number;
  step?: number;

  //type password, search, tel, text, url
  maxlength?: number;
  minlength?: number;

  //type password, text, tel
  pattern?: string;
}
