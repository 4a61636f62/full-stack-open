import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).json({
            error: 'malformed parameters'
        });
        return;
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!(req.body.daily_exercises && req.body.target)) {
        res.status(400).json({
            error: 'parameters missing'
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);
    if (isNaN(target)) {
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    const daily_exercises: number[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (const item of req.body.daily_exercises) {
        const hours = Number(item);
        if (isNaN(hours)) {
            res.status(400).json({
                error: 'malformatted parameters'
            });
        }
        daily_exercises.push(hours);
    }

    const result = calculateExercises(daily_exercises, target);

    res.json({
        ...result
    });
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});