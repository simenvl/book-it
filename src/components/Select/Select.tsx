import { Services } from "@prisma/client";
import classNames from "classnames";
import { useState } from "react";
import { ArrowDown, Check, X } from "react-feather";

type SingleSelectProps = {
  multiple?: false;
  value?: Services;
  onChange: (value: Services | undefined) => void;
};

type MultiSelectDropdownProps = {
  multiple: true;
  value: Services[];
  onChange: (service: Services[]) => void;
};

type SelectProps = {
  options: Services[];
} & (SingleSelectProps | MultiSelectDropdownProps);

const Select = ({ options, value, multiple, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isOptionSelected = (option: Services) => {
    return multiple ? value.includes(option) : option === value;
  };

  const selectOption = (option: Services) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  };

  console.log({ options, value });

  return (
    <div className="relative">
      <div
        className="flex items-center border px-4 py-2 flex-grow justify-between rounded-lg"
        onClick={() => setIsOpen((prev) => !prev)}
        // onBlur={() => setIsOpen(false)}
        tabIndex={0}
      >
        <div className="flex gap-2 flex-wrap">
          {multiple
            ? value?.map((v) => (
                <button
                  key={v.id}
                  className="bg-blue-100 px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                >
                  <span>{v.name}</span>
                  <X size="16" />
                </button>
              ))
            : value?.name}
        </div>
        <ArrowDown className="cursor-pointer" />
      </div>
      <ul
        className={classNames(
          { "flex flex-col": isOpen, hidden: !isOpen },
          "absolute -bottom-1 translate-y-full w-full border rounded-lg bg-white shadow-md"
        )}
      >
        {options?.map((option, index) => {
          return (
            <li
              key={option.id}
              className={classNames(
                { "bg-blue-100": isOptionSelected(option) },
                "hover:bg-blue-200 cursor-pointer w-full p-4 flex gap-2"
              )}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
            >
              <Check
                className={classNames(
                  {
                    "opacity-0": !isOptionSelected(option),
                    "opacity-1": isOptionSelected(option),
                  },
                  "stroke-blue-500 p-1"
                )}
                strokeWidth={3}
              />

              <span>{option.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
