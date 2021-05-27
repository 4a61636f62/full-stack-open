export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface DescribedCoursePart extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends DescribedCoursePart {
    type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends DescribedCoursePart {
    type: 'submission';
    exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
