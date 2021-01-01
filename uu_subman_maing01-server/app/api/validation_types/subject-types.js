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


// const lang = oneOf(["cs", "en"]);
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
    language: 
        shape({
            cs: string(100)
        //         shape({
        //             formOfStudy:
        //                 shape({
        //                     fulltime:
        //                         shape({
        //                             id: id().isRequired,
        //                             studyMaterialList: array(
        //                                 shape({
        //                                     subjectId: mongoId().isRequired,
        //                                     baseUri: uri().isRequired(),
        //                                     type: uu5String(50).isRequired(),
        //                                     name: uu5String(50)
        //                                 })
        //                             ),
        //                             topics: array(
        //                                 shape({
        //                                     name: mongoId().isRequired,
        //                                     desc: uri().isRequired(),
        //                                     id: id(),
        //                                     studyMaterialList: array(
        //                                         shape({
        //                                             studyMateriaId: id(),
        //                                             url: uri(),
        //                                             name: uu5String(50)
        //                                         })
        //                                     )
        //                                 })
        //                             )
        //                         }),
        //                         parttime:
        //                         shape({
        //                             id: id().isRequired,
        //                             studyMaterialList: array(
        //                                 shape({
        //                                     subjectId: mongoId().isRequired,
        //                                     baseUri: uri().isRequired(),
        //                                     type: uu5String(50).isRequired(),
        //                                     name: uu5String(50)
        //                                 })
        //                             ),
        //                             topics: array(
        //                                 shape({
        //                                     name: mongoId().isRequired,
        //                                     desc: uri().isRequired(),
        //                                     id: id(),
        //                                     studyMaterialList: array(
        //                                         shape({
        //                                             studyMateriaId: id(),
        //                                             url: uri(),
        //                                             name: uu5String(50)
        //                                         })
        //                                     )
        //                                 })
        //                             )
        //                         })
        //                 })
        //         })

         }),
    /* edit it later */
    teachers: array(
        uuIdentity()),
    // students: array(
    //     shape({
    //         uuIdentity: uuIdentity(),
    //         formOfStudy: oneOf(["full-time", "part-time"])
    //     })
    // ),
    visibility: boolean()
})