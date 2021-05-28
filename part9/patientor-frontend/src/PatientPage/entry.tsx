import React from "react";
import {Entry as EntryType} from "../types";
// import { assertNever } from "../helpers";

const Entry = ({ entry }: { entry : EntryType}) => {
    return (
        <div>
            <p>{entry.date} <em>{entry.description}</em></p>
            {entry.diagnosisCodes
                ?
                <ul>
                    {entry.diagnosisCodes.map(code =>
                        <li key={code}>{code}</li>
                    )}
                </ul>
                : null
            }
        </div>
    );
    // switch (entry.type) {
    //     case "HealthCheck":
    //         return (
    //             <div>
    //
    //             </div>
    //         );
    //     case "OccupationalHealthcare":
    //         return (
    //             <div>
    //
    //             </div>
    //         );
    //     case "Hospital":
    //         return (
    //             <div>
    //
    //             </div>
    //         );
    //     default:
    //         return assertNever(entry);
    // }
};

export default Entry;