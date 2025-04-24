import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../utils/site";

const Select = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
    triggerClass?: string;
    viewPortClass?: string;
  }
>(({ triggerClass, viewPortClass, children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger
        className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
        aria-label="Food"
      >
        <SelectPrimitive.Value placeholder="Select a fruit…" />
        <SelectPrimitive.Icon className="text-violet11">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <SelectPrimitive.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-[5px]">
            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Fruits
              </SelectPrimitive.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator className="m-[5px] h-px bg-violet6" />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Vegetables
              </SelectPrimitive.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator className="m-[5px] h-px bg-violet6" />

            <SelectPrimitive.Group>
              <SelectPrimitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Meat
              </SelectPrimitive.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item {...props} ref={forwardedRef}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        {/* <CheckIcon /> */}
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

Select.displayName = SelectPrimitive.Root.displayName;
SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectItem };
