import { useState } from "react";
import { trpc } from "../../utils/trpc";
import MultiSelectDropdown from "../MultiSelectDropdown";

type ListOptionsProps = {
  clinicId: string;
  resourceId: string;
};

export type SelectedOption = {
  id: string;
  name: string;
};

type SelectedOptions = SelectedOption[];

const ListOptions = ({ clinicId, resourceId }: ListOptionsProps) => {
  const services = trpc.useQuery(["services.getAllServices"]);
  const ctx = trpc.useContext();
  const [selected, setSelected] = useState<string[]>([]);
  const updateResource = trpc.useMutation(["resources.updateResource"], {
    onMutate: () => {
      ctx.cancelQuery(["services.getServiceInResource"]);

      const optimisticUpdate = ctx.getQueryData([
        "services.getServiceInResource",
      ]);

      if (optimisticUpdate) {
        ctx.setQueryData(["services.getServiceInResource"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["services.getServiceInResource"]);
    },
  });

  const toggleOption = ({ id, name }: { id: string; name: string }) => {
    /* const servicesInResource = trpc.useQuery([
      "services.getServiceInResource",
      { id: id },
    ]);
    console.log(servicesInResource.data); */
    setSelected((prevSelected) => {
      const newArr = [...prevSelected];

      console.log(id, name);

      updateResource.mutate({
        resourceId: resourceId,
        serviceId: id,
        clinicId: clinicId,
      });

      if (newArr.includes(name)) {
        return newArr.filter((item) => item !== name);
      } else {
        newArr.push(name);
        return newArr;
      }
    });
  };

  return (
    <>
      <MultiSelectDropdown
        options={services.data}
        toggleOption={toggleOption}
        selected={selected}
      />
    </>
  );
};

export default ListOptions;
