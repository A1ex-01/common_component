// formItem 属性
// prop label rules show-message change
import type { RuleItem } from "async-validator";
enum FormItemTriggerType {
  INPUT = "input",
  CHANGE = "change",
}
interface FormItemRule extends RuleItem {
  trigger?: FormItemTriggerType;
}

interface FormItem {
  prop: string;
  label: string;
  rules: FormItemRule[];
  showMessage?: boolean;
}
export { type FormItem, type FormItemRule, FormItemTriggerType };
