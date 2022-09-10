import { Edit, Trash2 } from "react-feather";
import { trpc } from "../../utils/trpc";

type ItemOptionsProps = {
  id: string;
};

const ItemOptions = ({ id }: ItemOptionsProps) => {
  const ctx = trpc.useContext();
  const deleteResource = trpc.useMutation(["resources.deleteResource"], {
    onMutate: () => {
      ctx.cancelQuery(["resources.getResourceInClinic"]);

      const optimisticUpdate = ctx.getQueryData([
        "resources.getResourceInClinic",
      ]);

      if (optimisticUpdate) {
        ctx.setQueryData(["resources.getResourceInClinic"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["resources.getResourceInClinic"]);
    },
  });

  const handleDelete = (id: string) => {
    console.log("Delete: ", id);

    deleteResource.mutate({ resourceId: id });
  };
  return (
    <div className="flex gap-2">
      <Edit />
      <Trash2 className="cursor-pointer" onClick={() => handleDelete(id)} />
    </div>
  );
};

export default ItemOptions;
