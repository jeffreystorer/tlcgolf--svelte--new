import { courses } from '$lib/components/common/data';
import { createTeeArrays } from '$lib/components/common/utils';

export default function getTeeLabelFromTeeValue(teeValue, course, courseData) {
	const courseIndex = courses.indexOf(course);
	const teeArrays = createTeeArrays(courseData);
	const courseTeeArray = teeArrays[courseIndex];
	let teeObj = courseTeeArray.find((obj) => obj.value === teeValue);
	let teeLabel = teeObj.label;
	return teeLabel;
}
