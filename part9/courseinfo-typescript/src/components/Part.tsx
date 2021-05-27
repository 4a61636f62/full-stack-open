import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../helpers"

const Part = ({ part }: { part: CoursePart}) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <p>
                        <strong>{ part.name } { part.exerciseCount }</strong>
                    </p>
                    <p>
                        <em>{ part.description }</em>
                    </p>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <p>
                        <strong>{ part.name } { part.exerciseCount }</strong>
                    </p>
                    <p>
                        project exercises { part.groupProjectCount }
                    </p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <p>
                        <strong>{ part.name } { part.exerciseCount }</strong>
                    </p>
                    <p>
                        <em>{ part.description }</em>
                    </p>
                    <p>
                        submit to { part.exerciseSubmissionLink }
                    </p>
                </div>
            )
        default:
            return assertNever(part)
    }
}

export default Part;