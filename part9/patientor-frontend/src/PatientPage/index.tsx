import React from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {updatePatient, useStateValue} from "../state";
import Entry from "./entry";

const isString = (text: unknown): text is string => {
   return typeof text === "string";
};

const parseID = (params: { id?: unknown }): string => {
  if (!params || !isString(params.id)) {
      throw new Error(`invalid or missing parameters`);
  }
  return params.id;
};

const PatientPage = () => {
   const [{ patients }, dispatch] = useStateValue();
   const id = parseID(useParams());

   const patient = patients[id];

   React.useEffect(() => {
       const fetchPatient = async (id: string) => {
           const { data: fetchedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
           dispatch(updatePatient(fetchedPatient));
       };
       void fetchPatient(id);
   }, [id]);

   return patient ? (
       <div>
           <h2>{patient.name}<i className={patient.gender === "male" ? "mars icon" : "venus icon"} /></h2>
           <p>ssn: {patient.ssn}</p>
           <p>occupation: {patient.occupation}</p>
           <h3>Entries</h3>
           {patient.entries
               ?
               patient.entries.map(entry => <Entry key={entry.id} entry={entry}/>)
               : null
           }
       </div>
   ): null;
};

export default PatientPage;