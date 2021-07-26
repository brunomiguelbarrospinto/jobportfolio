import BaseElementInterface from "./BaseElementInterface";

export default interface TextareaInterface extends BaseElementInterface {
  cols?: number;
  rows?: number;
  maxlength?: number;
  minlength?: number;
}
