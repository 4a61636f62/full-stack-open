type rating = 1 | 2 | 3

interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: rating,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hours: number[], target: number): result => {
    const periodLength = hours.length
    const trainingDays = hours.filter(hours => hours > 0).length
    const average = hours.reduce((total, hours) => total + hours, 0) / periodLength

    const ratio = average / target
    let success = false
    let rating: rating
    if (ratio >=1 ) {
        rating = 3
        success = true
    } else if (ratio >= 0.75) {
        rating = 2
    } else {
        rating = 1
    }

    let ratingDescription
    switch (rating) {
        case 3:
            ratingDescription = 'you met your target, well done!'
            break
        case 2:
            ratingDescription = 'not too bad but could be better'
            break
        case 1:
            ratingDescription = 'try harder next week'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

export const parseArguments = (args: Array<string>): { target: number, hours: number[]} => {
    if (args.length < 4) throw new Error('not enough arguments')
    if (isNaN(Number(args[2]))) {
        throw new Error('Provided target value must be a number')
    }
    const target = Number(args[2])
    const hours: number[] = []
    for (let item of args.slice(3)) {
        if (isNaN(Number(item))) {
            throw new Error('Provided hour values must all be numbers')
        }
        hours.push(Number(item))
    }

    return {
        target,
        hours
    }
}

const args = parseArguments(process.argv)
console.log(calculateExercises(args.hours, args.target))
