import { NextPage } from "next";
import { useState } from "react";
import SideBarMenu from "../../components/SideBarMenu";
import {
  SettingsKeys,
  SettingsView,
} from "../../components/SideBarMenu/SideBarMenu";
import useHistoryStore from "../../hooks/useHistoryStore";
import useModal from "../../hooks/useModal/useModal";
import { trpc } from "../../utils/trpc";
import Resources from "./resources";
import ModalWithContent from "../../components/ModalWithContent/ModalWithContent";
import Link from "next/link";
import ClinicForm from "../../components/Forms/ClinicForm";
import Services from "./services";
import { Edit } from "react-feather";
import Settings from "./settings";

const getSettingsView = (view: SettingsKeys) => {
  const settingsView: SettingsView = {
    resources: <Resources />,
    services: <Services />,
    settings: <Settings />,
  };

  return settingsView[view];
};

const Clinic: NextPage = (props) => {
  const [settingsView, setSettingsView] = useState<SettingsKeys>("resources");
  const [modalOpen, setModalOpen] = useModal();

  const { clinicId, setClinicId } = useHistoryStore((state) => ({
    clinicId: state.clinicId,
    setClinicId: state.setClinicId,
  }));
  const clinic = trpc.useQuery(["clinics.getClinic", { id: clinicId }]);
  const clinics = trpc.useQuery(["clinics.getAllClinics"]);

  // const clinicLowerCase = clinic.data?.name.toLowerCase();

  const toggleSettingsView = (view: SettingsKeys) => {
    setSettingsView(view);
  };

  return (
    <>
      {!clinics.isLoading && (
        <div>
          <header>
            <nav className="flex p-4 shadow-md items-center z-10">
              <div className="flex items-center w-full justify-between">
                <h1>{clinic.data?.name}</h1>
                <div className="flex items-center gap-4">
                  <div>
                    <ModalWithContent
                      modalTitle="Lag ny klinikk"
                      buttonTitle="Legg til ny klinikk"
                      options={{ asButton: true }}
                    >
                      <ClinicForm />
                    </ModalWithContent>
                  </div>
                  <div>
                    <ModalWithContent
                      modalTitle="Alle klinikker"
                      buttonTitle="Alle klinikker"
                      options={{ asButton: true }}
                    >
                      {clinics.data?.map((clinic) => (
                        <div
                          key={clinic.id}
                          className="flex justify-between items-center"
                        >
                          <Link
                            href={{
                              pathname: `${clinic.name.toLowerCase()}`,
                            }}
                          >
                            <div
                              className="w-full p-4 flex flex-col gap-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                              onClick={(e) => {
                                console.log(e);
                                setClinicId(clinic.id);
                                setModalOpen(!modalOpen);
                              }}
                            >
                              <span className="font-bold">{clinic.name}</span>
                              <span className="text-sm">
                                {clinic.streetName}
                              </span>
                            </div>
                          </Link>
                          <Edit
                            className="cursor-pointer"
                            onClick={() => {
                              <ModalWithContent modalTitle="Rediger klinikk">
                                <ClinicForm />
                              </ModalWithContent>;
                              console.log("Rediger klinikk", clinic.name);
                            }}
                          />
                        </div>
                      ))}
                    </ModalWithContent>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div className="flex">
            <SideBarMenu
              toggleSettingsView={(view) => toggleSettingsView(view)}
            />

            <div className="bg-gray-100 w-full">
              <div className="p-12 w-full">{getSettingsView(settingsView)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return {
    props: {
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
}; */

export default Clinic;
