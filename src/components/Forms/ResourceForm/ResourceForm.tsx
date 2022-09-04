import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../../../utils/trpc";
import _isEmpty from "lodash/isEmpty";
import useHistoryStore from "../../../hooks/useHistoryStore";

type Input = {
  name: string;
  clinicsId: string;
};

const ResourceForm = () => {
  const clinicId = useHistoryStore((state) => state.clinicId);
  const ctx = trpc.useContext();
  const [inputValue, setInputValue] = useState<Input>({
    name: "",
    clinicsId: "",
  });

  const clinics = trpc.useQuery(["clinics.getAllClinics"]);
  const postResource = trpc.useMutation(["resources.createResource"], {
    onMutate: () => {
      ctx.cancelQuery(["resources.getResourceInClinic"]);

      const optimisticUpdate = ctx.getQueryData([
        "resources.getResourceInClinic",
        { id: clinicId },
      ]);

      if (optimisticUpdate) {
        ctx.setQueryData(
          ["resources.getResourceInClinic", { id: clinicId }],
          optimisticUpdate
        );
      }
    },
    onSettled: () => {
      ctx.invalidateQueries([
        "resources.getResourceInClinic",
        { id: clinicId },
      ]);
    },
  });

  const handleInpuChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const input = event.target.value;

    console.log({ input, inputValue });

    setInputValue({
      ...inputValue,
      [event.target.name]: input,
    } as Input);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (_isEmpty(inputValue)) {
          return alert("Felter kan ikke være tomme");
        }

        if (!_isEmpty(inputValue)) {
          postResource.mutate({
            name: inputValue?.name,
            clinicsId: inputValue.clinicsId,
          });
        }

        setInputValue({
          name: "",
          clinicsId: "",
        });
      }}
    >
      <div className="flex flex-col">
        <label htmlFor="clinicName">Navn</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="name"
          type="text"
          placeholder="Navn på ressurs"
          value={inputValue?.name}
          onChange={handleInpuChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="clinicName">Velg klinikk(er)</label>
        <select
          className="outline-none border rounded-md px-4 py-2"
          name="clinicsId"
          onChange={handleInpuChange}
        >
          {clinics.data?.map((clinic) => {
            return (
              <option key={clinic.id} value={clinic.id}>
                {clinic.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-300 rounded-md py-2 px-4 hover:bg-blue-400 flex justify-center items-center gap-2 w-fit"
        >
          Lagre{" "}
          {postResource.isLoading && (
            <svg width={20} height={20} className="animate-spin">
              <circle
                cx={10}
                cy={10}
                r={8}
                fill="none"
                stroke="rgb(57 143 249)"
                strokeDashoffset={1}
                strokeDasharray="90%"
                strokeWidth={3}
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
