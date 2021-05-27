import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get('/:id', (req, res) => {
    const patient = patientService.getPatient(req.params.id);
    if (patient) {
        res.json(
            patientService.getPatient(req.params.id)
        );
    }
});

patientsRouter.get('/', (_req, res) => {
    res.json(
        patientService.getNonSensitivePatients()
    );
});

patientsRouter.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    res.json(newPatient);
});

export default patientsRouter;