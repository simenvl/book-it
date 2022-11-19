import { Services } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import ItemOptions from "../../components/ItemOptions";
import ListOptions from "../../components/ListOptions";
import ModalWithContent from "../../components/ModalWithContent/ModalWithContent";
import PageWrap from "../../components/PageWrap";
import useHistoryStore from "../../hooks/useHistoryStore";
import { trpc } from "../../utils/trpc";

const Resources: NextPage = (props) => {
  const [services, setServices] = useState<Services[]>();
  const clinicId = useHistoryStore((state) => state.clinicId);
  const resources = trpc.useQuery([
    "resources.getResourceInClinic",
    { id: clinicId },
  ]);

  const servicesQuery = trpc.useQuery(
    ["services.getServicesInClinic", { clinicId }],
    { onSettled: (data) => setServices(data) }
  );

  return (
    <PageWrap
      title="Ressurser"
      form="resourcesForm"
      buttonTitle="Legg til ressurs"
      formTitle="Legg til ressurs"
    >
      <div className="p-8">
        {resources.data?.map((resource) => (
          <div
            key={resource.id}
            className="px-2 py-4 flex w-full justify-between"
          >
            <ModalWithContent
              modalTitle="Endre ressurs"
              buttonTitle={resource.name}
              buttonClassName="font-bold"
            >
              <h2 className="text-lg ">{resource.name}</h2>
              {services && (
                <ListOptions
                  clinicId={clinicId}
                  services={services}
                  resourceId={resource.id}
                />
              )}
            </ModalWithContent>
            <ItemOptions id={resource.id} />
          </div>
        ))}
      </div>
    </PageWrap>
  );
};

export default Resources;
