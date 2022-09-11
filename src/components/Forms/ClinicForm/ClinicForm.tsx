import { ChangeEvent, FormEvent, useState } from "react";
import { trpc } from "../../../utils/trpc";
import _isEmpty from "lodash/isEmpty";

type Input = {
  name: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
};

type ClinicFormProps =
  | {
      update: true;
      clinicId: string;
    }
  | { update?: false; clinicId?: never };

const ClinicForm = ({ update, clinicId }: ClinicFormProps) => {
  const ctx = trpc.useContext();
  const [inputValue, setInputValue] = useState<Input>();

  const getClinicInfo = clinicId
    ? trpc.useQuery(["clinics.getClinic", { id: clinicId }], {
        onSettled: (data) => {
          if (data) {
            setInputValue({
              name: data.name,
              city: data.city,
              country: data.country,
              postalCode: data.postalCode,
              streetName: data.streetName,
            });
          }
        },
      })
    : null;

  const postClinic = trpc.useMutation(["clinics.createClinic"], {
    onMutate: () => {
      ctx.cancelQuery(["clinics.getAllClinics"]);

      const optimisticUpdate = ctx.getQueryData(["clinics.getAllClinics"]);

      if (optimisticUpdate) {
        ctx.setQueryData(["clinics.getAllClinics"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["clinics.getAllClinics"]);
    },
  });

  const updateClinic = trpc.useMutation(["clinics.updateClinic"], {
    onMutate: () => {
      const optimisticUpdate = ctx.getQueryData(["clinics.getAllClinics"]);

      if (optimisticUpdate) {
        ctx.setQueryData(["clinics.getAllClinics"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["clinics.getAllClinics"]);
    },
  });

  const handleInpuChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    console.log({ input, inputValue });

    setInputValue({
      ...inputValue,
      [event.target.name]: input,
    } as Input);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (_isEmpty(inputValue)) {
      return alert("Felter kan ikke være tomme");
    }

    if (!_isEmpty(inputValue)) {
      if (!update) {
        postClinic.mutate({
          name: inputValue?.name,
          streetName: inputValue?.streetName,
          postalCode: inputValue?.postalCode,
          city: inputValue?.city,
          country: inputValue?.country,
        });

        setInputValue({
          name: "",
          streetName: "",
          postalCode: "",
          city: "",
          country: "",
        });
      } else {
        updateClinic.mutate({
          id: clinicId,
          name: inputValue.name,
          streetName: inputValue?.streetName,
          postalCode: inputValue?.postalCode,
          city: inputValue?.city,
          country: inputValue?.country,
        });
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="clinicName">Navn på klinikk</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="name"
          type="text"
          placeholder="Klinikk navn"
          value={inputValue?.name}
          onChange={handleInpuChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="clinicName">Adresse</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="streetName"
          type="text"
          placeholder="Adresse"
          value={inputValue?.streetName}
          onChange={handleInpuChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="clinicName">Postnummer</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="postalCode"
          type="text"
          placeholder="Postnummer"
          value={inputValue?.postalCode}
          onChange={handleInpuChange}
          maxLength={4}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="clinicName">By</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="city"
          type="text"
          placeholder="By"
          value={inputValue?.city}
          onChange={handleInpuChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="clinicName">Land</label>
        <input
          className="outline-none border rounded-md px-4 py-2"
          name="country"
          type="text"
          placeholder="Land"
          value={inputValue?.country}
          onChange={handleInpuChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-100 rounded-md py-2 px-4 hover:bg-blue-400 flex justify-center items-center gap-2 w-fit"
        >
          Lagre{" "}
          {postClinic.isLoading && (
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

export default ClinicForm;
