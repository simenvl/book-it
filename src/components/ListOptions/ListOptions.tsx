import { Services } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import MultiSelectDropdown from "../Select";

type ListOptionsProps = {
  services: Services[];
  resourceId: string;
  clinicId: string;
};

export type SelectedOption = {
  id: string;
  name: string;
};

const ListOptions = ({ clinicId, services, resourceId }: ListOptionsProps) => {
  const ctx = trpc.useContext();
  const [value, setValue] = useState<Services[]>([]);

  const servicesInResource = trpc.useQuery(
    ["resources.getServicesInResource", { resourceId }],
    {
      onSuccess: (data) => {
        const serviceIdsInResource = data?.flatMap((service) =>
          service.services.flatMap((id) => id.servicesId)
        );

        const resourceHasService = services?.filter((service) => {
          return serviceIdsInResource?.includes(service.id);
        });

        setValue(resourceHasService);
      },
    }
  );

  // const updateResource = trpc.useMutation(["resources.updateResource"], {
  //   onMutate: () => {
  //     ctx.cancelQuery(["services.getServiceInResource"]);

  //     const optimisticUpdate = ctx.getQueryData([
  //       "services.getServiceInResource",
  //     ]);

  //     if (optimisticUpdate) {
  //       ctx.setQueryData(["services.getServiceInResource"], optimisticUpdate);
  //     }
  //   },
  //   onSettled: () => {
  //     ctx.invalidateQueries(["services.getServiceInResource"]);
  //   },
  // });

  // const deleteServiceFromResource = trpc.useMutation(
  //   ["resources.deleteServiceFromResource"],
  //   {
  //     onMutate: () => {
  //       ctx.cancelQuery(["services.getServiceInResource"]);

  //       const optimisticUpdate = ctx.getQueryData([
  //         "services.getServiceInResource",
  //       ]);

  //       if (optimisticUpdate) {
  //         ctx.setQueryData(["services.getServiceInResource"], optimisticUpdate);
  //       }
  //     },
  //     onSettled: () => {
  //       ctx.invalidateQueries(["services.getServiceInResource"]);
  //     },
  //   }
  // );

  return (
    <>
      <MultiSelectDropdown
        multiple
        options={services}
        onChange={(o) => setValue(o)}
        value={value}
      />
    </>
  );
};

export default ListOptions;
