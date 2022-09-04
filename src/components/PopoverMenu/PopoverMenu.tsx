import { Popover, Transition } from "@headlessui/react";
import { Clinics } from "@prisma/client";
import Link from "next/link";
import { Fragment } from "react";
import { ChevronDown } from "react-feather";

type PopoverMenuProps = {
  clinics?: Clinics[];
  onClick: (clinicId: string) => void;
};

const PopoverMenu = ({ clinics, onClick }: PopoverMenuProps) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span>Alle klinikker</span>
            <ChevronDown
              className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-3 w-max right-0 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  {clinics?.map((clinic) => (
                    <Link
                      key={clinic.name}
                      href={clinic.name.toLowerCase()}
                      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div
                        onClick={() => onClick(clinic.id)}
                        className="cursor-pointer"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {clinic.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {clinic.streetName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopoverMenu;
