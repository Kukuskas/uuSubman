/* eslint-disable */
const subjectAddStudyMaterial = shape({
    baseUri: string(50).isRequired(),
    type: oneOf(["video", "uuBook", "uuCourse", "other"]),  
    name: string(50).isRequired(),
    uuMallProductCode: string(50)
});