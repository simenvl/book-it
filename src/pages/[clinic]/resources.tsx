import { NextPage } from "next";
import ResourceForm from "../../components/Forms/ResourceForm";
import ModalWithContent from "../../components/ModalWithContent/ModalWithContent";
import useHistoryStore from "../../hooks/useHistoryStore";
import { trpc } from "../../utils/trpc";

const Resources: NextPage = (props) => {
  const clinicId = useHistoryStore((state) => state.clinicId);
  const resources = trpc.useQuery([
    "resources.getResourceInClinic",
    { id: clinicId },
  ]);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Ressurser</h1>
        <ModalWithContent
          buttonTitle="Legg til ressurs"
          modalTitle="Legg til ny ressurs"
        >
          <ResourceForm />
        </ModalWithContent>
      </div>
      <div>
        {resources.data?.map((resource) => (
          <div key={resource.id}>{resource.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
