export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height/100)**2;
    if (bmi < 15) {
        return 'Very severely underweight';
    } else if (bmi < 16) {
        return 'Severely underweight';
    } else if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else if (bmi < 35) {
        return 'Obese Class I (Moderately obese)';
    } else if (bmi < 40) {
        return 'Obese Class II (Severely obese)';
    } else {
        return 'Obese Class III (Very severely obese)';
    }
};

// interface BmiValues {
//     weight: number,
//     height: number
// }

// export const parseArguments = (args: Array<string>): BmiValues => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');
//
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             weight: Number(args[2]),
//             height: Number(args[3])
//         };
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// };
//
// try {
//     const { weight, height } = parseArguments(process.argv);
//     console.log(calculateBmi(weight, height));
// } catch (e) {
//     if (e instanceof Error) {
//         console.log('Error, something bad happened, message: ', e.message);
//     }
// }