import express from "express";
import diagnosisService from "../services/diagnosisService";
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
    res.json(diagnosisService.getDiagnoses());
});


export default diagnosesRouter;