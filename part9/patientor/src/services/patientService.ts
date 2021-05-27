import { v4 as uuid } from 'uuid';
import patients from "../../data/patients";
import {NewPatient, NonSensitivePatient, Patient} from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return patients.map(({ ssn, ...p}) => p);
};

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = ( patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};
export default {
    getNonSensitivePatients,
    getPatient,
    addPatient
};