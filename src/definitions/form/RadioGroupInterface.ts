import BaseElementInterface from "./BaseElementInterface";
import RadioInterface from "./RadioInterface";

export default interface RadioGroupInterface extends BaseElementInterface {
  radios: RadioInterface[];
}
