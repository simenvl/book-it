import { Clinics, Services } from "@prisma/client";
import classNames from "classnames";
import { useState } from "react";
import { ArrowDown, Check, X } from "react-feather";

type SingleSelectProps<T> = {
  multiple?: false;
  value?: T;
  onChange: (value: T | undefined) => void;
};

type MultiSelectDropdownProps<T> = {
  multiple: true;
  value: T[];
  onChange: (service: T[]) => void;
};

type SelectProps<T> = {
  options: T[];
} & (SingleSelectProps<T> | MultiSelectDropdownProps<T>);

const Select = <T extends Services | Clinics>({
  options,
  value,
  multiple,
  onChange,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const isOptionSelected = (option: T) => {
    return multiple ? value.includes(option) : option === value;
  };

  const selectOption = (option: T) => {
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
          "absolute -bottom-1 translate-y-full w-full border rounded-lg bg-white shadow-md max-h-52 min-h-fit overflow-auto"
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
