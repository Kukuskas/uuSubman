/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: shape({
        cz: string(50).isRequired(),
        en: string(50).isRequired()
    }).isRequired(),
    credits: integer(10).isRequired(),
    supervisor: string(/([0-9]{3})[-]([0-9]{2})[-]([0-9]{3})/).isRequired(),
    degree: oneOf(["Bachalor", "Magister"]).isRequired(),
    desc: shape({
        cz: string(500).isRequired(),
        en: string(500).isRequired()
    }).isRequired(),
    language: string(30).isRequired(),

    teachers:
        string(/([0-9]{3})[-]([0-9]{2})[-]([0-9]{3})/),
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
