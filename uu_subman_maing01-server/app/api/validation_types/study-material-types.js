/* eslint-disable */
const studyMaterialListDtoInType = shape({
    pageInfo: shape({
        pageIndex: integer(),
        pageSize: integer()
    })
})

const studyMaterialDeleteDtoInType = shape({
    id: string(50).isRequired()
});
