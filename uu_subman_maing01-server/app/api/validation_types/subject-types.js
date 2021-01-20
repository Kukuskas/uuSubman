
/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: shape({
        cs: string(50).isRequired(),
        en: string(50).isRequired()
    }).isRequired(),
    credits: integer(10).isRequired(),
    supervisor: uuIdentity().isRequired(),
    degree: oneOf(["bachelor", "master"]).isRequired(),
    desc: shape({
        cs: string(500).isRequired(),
        en: string(500).isRequired()
    }).isRequired(),
    languageOfStudy:oneOf(["english", "czech", "czech/english"]).isRequired(),
    language: shape().isRequired(),
    /* edit it later */
    teachers: array(
    ),
    visibility: boolean()
})

const subjectGetDtoInType = shape({
    id: mongoId().isRequired()
})
const subjectListDtoInType = shape({
    pageInfo: shape({
        pageIndex: integer(),
        pageSize: integer()
    })
})

const subjectDeleteDtoInType = shape({
    id: id().isRequired()
});




const subjectUpdateDtoInType = shape({
    id: mongoId().isRequired(),
    name: shape({
        cs: string(50).isRequired(),
        en: string(50).isRequired()
    }).isRequired(),
    credits: integer(10).isRequired(),
    supervisor: uuIdentity().isRequired(),
    degree: oneOf(["bachelor", "master"]).isRequired(),
    desc: shape({
        cs: string(500).isRequired(),
        en: string(500).isRequired()
    }).isRequired(),
    languageOfStudy:oneOf(["english", "czech", "czech/english"]).isRequired(),
    language:
        map(oneOf(["cs", "en"]), 
            shape({
                formOfStudy:
                    map(oneOf(["fulltime", "parttime"]), any(
                        shape({
                            id: id().isRequired,
                            studyMaterialList: array(
                                mongoId()
                            ),
                            topics: array(
                                shape({
                                    name: uu5String(50),
                                    desc: uu5String(500),
                                    id: id().isRequired(),
                                    studyMaterialList: array(
                                        shape({
                                            studyMateriaId: id(),
                                            baseUri: uri(),
                                            name: string(50)
                                        })
                                    )
                                })
                            )

                        }))
                             )
            })
        ),
 
    teachers: array(
        uuIdentity()),
    students: array(
        shape({
          uuIdentity: oneOf([uuIdentity(), ""]),
          formOfStudy: oneOf(["fulltime", "parttime"])
        })
    ),
    visibility: boolean()
});

const subjectAddStudyMaterialDtoInType = shape({
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