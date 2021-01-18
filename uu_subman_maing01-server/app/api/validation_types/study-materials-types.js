/* eslint-disable */
const subjectAddStudyMaterial = shape({
    id: mongoId().isRequired(),
    data: shape({
        baseUri: string(50).isRequired(),
        type: oneOf(["video", "uuBook", "uuCourse", "other"]).isRequired(),
        name: string(50).isRequired(),
        uuMallProductCode: string(50)
    }).isRequired(),
    language: oneOf(["cs", "en"]).isRequired(),
    formOfStudy: oneOf(["fulltime", "parttime"]).isRequired()
});