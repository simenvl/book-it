import ModalWithContent from "../../ModalWithContent";
import ClinicForm from "../ClinicForm";
import ResourceForm from "../ResourceForm";
import ServicesForm from "../ServicesForm";

type Forms = {
  clinicForm?: JSX.Element;
  resourcesForm?: JSX.Element;
  servicesForm?: JSX.Element;
};

type FormView = {
  [key in keyof Forms]?: string;
};

export type FormViewKeys = keyof FormView;

const getForms = (formView: FormViewKeys) => {
  const forms: Forms = {
    clinicForm: <ClinicForm />,
    resourcesForm: <ResourceForm />,
    servicesForm: <ServicesForm />,
  };

  return forms[formView];
};

type AddNewProps = {
  form: FormViewKeys;
  buttonTitle: string;
  formTitle: string;
};

const AddNew = ({ form, buttonTitle, formTitle }: AddNewProps) => {
  return (
    <ModalWithContent
      buttonTitle={buttonTitle}
      modalTitle={formTitle}
      options={{ asButton: true }}
    >
      <>{getForms(form)}</>
    </ModalWithContent>
  );
};

export default AddNew;
