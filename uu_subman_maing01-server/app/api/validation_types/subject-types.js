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
