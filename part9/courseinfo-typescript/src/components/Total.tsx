import React from "react";

interface TotalProps {
    total: number
}

const Total = ({ total }: TotalProps) => (
    <p>
        Number of exercises {' '}
        {total}
    </p>
)

export default Total