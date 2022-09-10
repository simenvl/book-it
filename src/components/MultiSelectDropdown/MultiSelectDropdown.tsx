import classNames from "classnames";
import { useState } from "react";
import { ArrowDown, Check } from "react-feather";

type MultiSelectDropdownProps<T> = {
  options: T;
  selected: string[];
  toggleOption: ({ id, name }: { id: string; name: string }) => void;
};

const MultiSelectDropdown = <T,>({
  options,
  selected,
  toggleOption,
}: MultiSelectDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center border px-4 py-1 h-14 justify-between rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-2">
          {selected?.map((select) => {
            return (
              <div
                key={select}
                className="bg-blue-100 px-4 py-2 rounded-lg text-sm"
              >
                {select}
              </div>
            );
          })}
        </div>
        <ArrowDown className="cursor-pointer" />
      </div>
      <ul
        className={classNames(
          { "flex flex-col": isOpen, hidden: !isOpen },
          "absolute -bottom-1 translate-y-full w-full border rounded-lg bg-white shadow-md"
        )}
      >
        {Array.isArray(options) &&
          options?.map((option, index) => {
            const isSelected = selected?.includes(option.name);
            return (
              <li
                key={option.id}
                className="hover:bg-gray-100 cursor-pointer w-full"
              >
                <label
                  htmlFor={`checkBoxOption${index}'`}
                  className="relative flex gap-2 p-4 items-center cursor-pointer"
                >
                  <input
                    name={`checkBoxOption${index}'`}
                    id={`checkBoxOption${index}'`}
                    type="checkbox"
                    className="appearance-none w-6 h-6 border-2 rounded-md cursor-pointer checked:bg-blue-100 checked:border-blue-100"
                    checked={isSelected}
                    onChange={() =>
                      toggleOption({ id: option.id, name: option.name })
                    }
                  />
                  <Check
                    className={classNames(
                      { hidden: !isSelected },
                      "absolute stroke-blue-500 p-1"
                    )}
                    strokeWidth={3}
                  />
                  {option.name}
                </label>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MultiSelectDropdown;
