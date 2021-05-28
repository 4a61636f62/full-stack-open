import {
    BaseEntry,
    Diagnosis,
    Entry,
    entryTypes,
    Gender,
    HealthCheckRating, HospitalEntry,
    NewPatient,
    OccupationalHealthCareEntry
} from "./types";

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation}: PatientFields): NewPatient => {
    return {
        name: parseString(name, "patient name"),
        dateOfBirth: parseDate(dateOfBirth, "patient DOB"),
        ssn: parseString(ssn, "patient ssn"),
        gender: parseGender(gender, "patient gender"),
        occupation: parseString(occupation, "patient occupation"),
        entries: []
    };
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseString = (obj: unknown, fieldName: string) => {
    if (!obj || !isString(obj)) {
        throw new Error(`Incorrect or missing ${fieldName}: ${obj}`);
    }
    return obj;
};

const parseDate = (date: unknown, fieldName: string): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${fieldName}: ${date}`);
    }
    return date;
};

const parseGender = (gender: unknown, fieldName: string): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing ${fieldName}: ${gender}`);
    }
    return gender;
};

interface BaseEntryFields
    {
        id: unknown,
        description: unknown,
        date: unknown,
        specialist: unknown,
        diagnosisCodes?: unknown
    }

interface EntryFields extends BaseEntryFields
    {
        type: unknown,
        healthCheckRating: unknown,
        employerName: unknown,
        sickLeave: unknown,
        discharge: unknown
    }

export const toNewEntry = (fields: EntryFields): Entry => {
    const base: BaseEntry = toBaseEntry(fields);
    const type = parseEntryType(fields.type);

    switch (type) {
        case "HealthCheck":
            return {
                ...base,
                type,
                healthCheckRating: parseHealthcheckRating(fields.healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                ...base,
                type,
                employerName: parseString(fields.employerName, "entry employer name"),
                sickLeave: fields.sickLeave ? parseSickLeave(fields.sickLeave) : undefined
            };
        case "Hospital":
            return {
               ...base,
               type,
               discharge: parseDischarge(fields.discharge)
            };
        default:
           return assertNever(type);
    }
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toBaseEntry = ({ id, description, date, specialist, diagnosisCodes }: BaseEntryFields): BaseEntry => {
    const newBaseEntry: BaseEntry = {
        id: parseString(id, "entry id"),
        description: parseString(description, "entry description"),
        date: parseDate(date, "entry date"),
        specialist: parseString(specialist, "entry specialist"),
    };
   if (diagnosisCodes) {
       newBaseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes, "entry diagnosis codes");
   }
   return newBaseEntry;
};

const isEntryType = (type: string): type is Entry["type"] => {
    return entryTypes.includes(type);
};

const parseEntryType = (type: unknown): Entry["type"] => {
    if (!type || !isString(type) || !isEntryType(type)){
        throw new Error(`Incorrect or missing entry type: ${type}`);
    }
    return type;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown, fieldName: string): Array<Diagnosis["code"]> => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        throw new Error(`Incorrect or missing ${fieldName}: ${diagnosisCodes}`);
    }
    const result: Array<Diagnosis["code"]> = [];
    for (const diagnosisCode of diagnosisCodes) {
        result.push(parseString(diagnosisCode, "entry diagnosis code"));
    }
    return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthcheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.keys(HealthCheckRating).includes(`${rating}`);
};

const parseHealthcheckRating = (rating: unknown): HealthCheckRating => {
    if (Number.isNaN(rating) || !isHealthcheckRating(rating)) {
        throw new Error(`Incorrect or missing entry Healthcheck Rating: ${rating}`);
    }
    return rating;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is OccupationalHealthCareEntry["sickLeave"] => {
    return (!!sickLeave.startDate && !!sickLeave.endDate && isDate(sickLeave.startDate) && isDate(sickLeave.endDate));
};

const parseSickLeave = (sickLeave: unknown): OccupationalHealthCareEntry["sickLeave"] => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error (`Incorrect or missing entry sick leave: ${sickLeave}`);
    }
    return sickLeave;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is HospitalEntry["discharge"] => {
    return (!!discharge.date && !!discharge.criteria && isDate(discharge.date) && isString(discharge.criteria));
};

const parseDischarge = (discharge: unknown): HospitalEntry["discharge"] => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error (`Incorrect or missing entry hospital discharge: ${discharge}`);
    }
    return discharge;
};