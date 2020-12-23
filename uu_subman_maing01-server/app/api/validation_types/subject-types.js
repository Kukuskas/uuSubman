/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: shape({
        cs: string(50).isRequired(),
        en: string(50).isRequired()
    }).isRequired(),
    credits: integer(10).isRequired(),
    supervisor: string(/([0-9]{3})[-]([0-9]{2})[-]([0-9]{3})/).isRequired(),
    degree: oneOf(["bachelor", "master"]).isRequired(),
    desc: shape({
        cs: string(500).isRequired(),
        en: string(500).isRequired()
    }).isRequired(),
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


// const subjectUpdateDtoInType = shape({
//     id: mongoId().isRequired(),
//     name: shape({
//         cs: string(50).isRequired(),
//         en: string(50).isRequired()
//     }).isRequired(),
//     credits: integer(10).isRequired(),
//     supervisor: string(/([0-9]{1,3})[-]([0-9]{2,4})[-]([0-9]{1,3})/).isRequired(),
//     degree: oneOf(["bachelor", "master"]).isRequired(),
//     desc: shape({
//         cs: string(500).isRequired(),
//         en: string(500).isRequired()
//     }).isRequired(),
//     language: shape().isRequired(),
//     /* edit it later */
//     teachers:array( 
//         string (/([0-9]{1,3})[-]([0-9]{2,4})[-]([0-9]{1,3})/), 10),
//     students: array(
//             shape({
//                 uuIdentity: string(/([0-9]{1,3})[-]([0-9]{2,4})[-]([0-9]{1,3})/),
//                 formOfStudy: oneOf(["full-time", "part-time"])
//             })
//             ),
//     visibility: boolean()
// })


const subjectUpdateDtoInType = shape({
    id: mongoId().isRequired(),
    name: shape({
        cs: string(50).isRequired(),
        en: string(50).isRequired()
    }).isRequired(),
    credits: integer(10).isRequired(),
    supervisor: string(/([0-9]{1,3})[-]([0-9]{2,4})[-]([0-9]{1,3})/).isRequired(),
    degree: oneOf(["bachelor", "master"]).isRequired(),
    desc: shape({
        cs: string(500).isRequired(),
        en: string(500).isRequired()
    }).isRequired(),
    language:
        shape({
            cs:
                shape({
                    formOfStudy:
                        shape({
                            fulltime:
                                shape({
                                    id: id().isRequired,
                                    studyMaterialList: array(
                                        shape({
                                            subjectId: mongoId().isRequired,
                                            baseUri: uri().isRequired(),
                                            type: uu5String(50).isRequired(),
                                            name: uu5String(50)
                                        })
                                    ),
                                    topics: array(
                                        shape({
                                            name: mongoId().isRequired,
                                            desc: uri().isRequired(),
                                            id: id(),
                                            studyMaterialList: array(
                                                shape({
                                                    studyMateriaId: id(),
                                                    url: uri(),
                                                    name: uu5String(50)
                                                })
                                            )
                                        })
                                    )
                                }),
                                parttime:
                                shape({
                                    id: id().isRequired,
                                    studyMaterialList: array(
                                        shape({
                                            subjectId: mongoId().isRequired,
                                            baseUri: uri().isRequired(),
                                            type: uu5String(50).isRequired(),
                                            name: uu5String(50)
                                        })
                                    ),
                                    topics: array(
                                        shape({
                                            name: mongoId().isRequired,
                                            desc: uri().isRequired(),
                                            id: id(),
                                            studyMaterialList: array(
                                                shape({
                                                    studyMateriaId: id(),
                                                    url: uri(),
                                                    name: uu5String(50)
                                                })
                                            )
                                        })
                                    )
                                })
                        })
                })

        }),
    /* edit it later */
    teachers: array(
        string(/([0-9]{1,3})[-]([0-9]{2,4})[-]([0-9]{1,3})/), 10),
    students: array(
        shape({
            uuIdentity: string(/([0-9]{1,3})[-]([0-9]{2,4})[-]([0-9]{1,3})/),
            formOfStudy: oneOf(["full-time", "part-time"])
        })
    ),
    visibility: boolean()
})