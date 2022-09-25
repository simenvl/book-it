import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../../../utils/trpc";
import _isEmpty from "lodash/isEmpty";
import useHistoryStore from "../../../hooks/useHistoryStore";

type Input = {
  name: string;
  duration: string;
  price: string;
  resourceId: string;
  clinicId: string;
};

const ServicesForm = () => {
  const clinicId = useHistoryStore((state) => state.clinicId);
  const ctx = trpc.useContext();
  const [inputValue, setInputValue] = useState<Input>({
    name: "",
    duration: "",
    price: "",
    resourceId: "",
    clinicId: "",
  });

  const resources = trpc.useQuery([
    "resources.getResourceInClinic",
    { id: clinicId },
  ]);
  const clinics = trpc.useQuery(["clinics.getAllClinics"]);
  const postService = trpc.useMutation(["services.createService"], {
    onMutate: () => {
      ctx.cancelQuery(["services.getServicesInClinic"]);

      const optimisticUpdate = ctx.getQueryData([
        "services.getServicesInClinic",
        { clinicId: clinicId },
      ]);

      if (optimisticUpdate) {
        ctx.setQueryData(
          ["services.getServicesInClinic", { clinicId: clinicId }],
          optimisticUpdate
        );
      }
    },
    onSettled: () => {
      ctx.invalidateQueries([
        "services.getServicesInClinic",
        { clinicId: clinicId },
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
          postService.mutate({
            name: inputValue?.name,
            duration: parseInt(inputValue.duration),
            price: parseInt(inputValue.price),
            resourceId: inputValue.resourceId,
            clinicId: inputValue.clinicId,
          });
        }

        setInputValue({
          name: "",
          duration: "",
          price: "",
          resourceId: "",
          clinicId: "",
        });
      }}
    >
      <div className="flex flex-col">
        <label htmlFor="name">Navn på tjeneste</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="name"
          type="text"
          placeholder="Navn på tjeneste"
          value={inputValue?.name}
          onChange={handleInpuChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="duration">Lengde på tjeneste</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="duration"
          type="number"
          placeholder="Lengde på tjeneste"
          value={inputValue?.duration}
          onChange={handleInpuChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price">Pris</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="price"
          type="number"
          placeholder="Pris"
          value={inputValue?.price}
          onChange={handleInpuChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="clinicName">Velg behandler(e)</label>
        <select
          className="outline-none border rounded-md px-4 py-2"
          name="resourceId"
          onChange={handleInpuChange}
        >
          <option value="" selected>
            Velg en behandler
          </option>
          {resources.data?.map((resource) => {
            return (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="clinicName">Velg klinikk(er)</label>
        <select
          className="outline-none border rounded-md px-4 py-2"
          name="clinicId"
          onChange={handleInpuChange}
        >
          <option value="" selected>
            Velg en klinikk
          </option>
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
          className="bg-blue-100 rounded-md py-2 px-4 hover:bg-blue-400 flex justify-center items-center gap-2 w-fit"
        >
          Lagre{" "}
          {postService.isLoading && (
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

export default ServicesForm;
