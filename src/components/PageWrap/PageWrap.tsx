import { ReactNode } from "react";
import AddNew from "../Forms/AddNew";
import { FormViewKeys } from "../Forms/AddNew/AddNew";

type PageWrapProps = {
  title: string;
  buttonTitle: string;
  formTitle: string;
  children?: ReactNode;
  form?: FormViewKeys;
};

const PageWrap = ({
  title,
  children,
  form,
  buttonTitle,
  formTitle,
}: PageWrapProps) => {
  return (
    <div className="flex gap-4 flex-col bg-white rounded-lg p-8 shadow-md divide-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        {form && (
          <AddNew form={form} buttonTitle={buttonTitle} formTitle={formTitle} />
        )}
      </div>
      {children}
    </div>
  );
};

export default PageWrap;
