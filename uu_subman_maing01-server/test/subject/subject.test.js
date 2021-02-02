const { TestHelper } = require("uu_appg01_server-test");

let id;
let awid;

beforeAll(async () => {

    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false});

});

afterAll(async () => {

    await TestHelper.teardown();

});

describe("uuSubman test subject create", () => {

    test("test 01 - hds", async () => {

        const dtoIn = {
            id: "1234567890",
            name: {
                cs: "Backendové systémy", 
                en: "Backends systems"
            }, 
            credits: 9, 
            supervisor: "24-9525-1", 
            degree: "bachelor", 
            desc: {
                cs: "Cílem předmětu je poskytnout studentům přehled v oblasti backendového vývoje.", 
                en: "The course aims at providing students with an insight into backend development."
            }, 
            languageOfStudy: "czech", 
            language: {}, 
            teachers: []
        };
        
        let result = await TestHelper.executePostCommand("subject/create", dtoIn);
        id = result.id;
        awid = result.awid; 

        expect(result.data.name.cs).toEqual(dtoIn.name.cs); 

        expect(result.data.name.en).toEqual(dtoIn.name.en); 

        expect(result.data.credits).toEqual(dtoIn.credits); 

        expect(result.data.supervisor).toEqual(dtoIn.supervisor);

        expect(result.data.degree).toEqual(dtoIn.degree);

        expect(result.data.desc.cs).toEqual(dtoIn.desc.cs);

        expect(result.data.desc.en).toEqual(dtoIn.desc.en);

        expect(result.data.languageOfStudy).toEqual(dtoIn.languageOfStudy);

        expect(result.data.uuAppErrorMap).toBeDefined();

    });

    test("test 02 - invalid dtoIn", async () => {

       expect.assertions(3); 

       try {

          await TestHelper.executePostCommand("subject/create", {});

       } catch (e) {

          expect(e.code).toEqual("uu-subman-main/subject/create/invalidDtoIn");

          expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(7);

          expect(e.status).toEqual(400);

       }
    })
});

describe("uuSubman test subject update", () => {

    test("test 01 - hds", async () => {

        const dtoIn = {
            id: id,
            name: {
                cs: "Backendové systémy", 
                en: "Backends systems"
            }, 
            credits: 9, 
            supervisor: "1-1", 
            degree: "bachelor", 
            desc: {
                cs: "Cílem předmětu je poskytnout studentům přehled v oblasti backendového vývoje.", 
                en: "The course aims at providing students with an insight into backend development."
            }, 
            languageOfStudy: "czech", 
            language: {}, 
            teachers: []
        };
        
        let result = await TestHelper.executePostCommand("subject/update", dtoIn);

        expect(result.data.name.cs).toEqual(dtoIn.name.cs); 

        expect(result.data.name.en).toEqual(dtoIn.name.en); 

        expect(result.data.credits).toEqual(dtoIn.credits); 

        expect(result.data.supervisor).toEqual(dtoIn.supervisor);

        expect(result.data.degree).toEqual(dtoIn.degree);

        expect(result.data.desc.cs).toEqual(dtoIn.desc.cs);

        expect(result.data.desc.en).toEqual(dtoIn.desc.en);

        expect(result.data.languageOfStudy).toEqual(dtoIn.languageOfStudy);

        expect(result.data.uuAppErrorMap).toBeDefined();

    });

    test("test 02 - invalid dtoIn", async () => {

       expect.assertions(3); 

       try {

          await TestHelper.executePostCommand("subject/update", {});

       } catch (e) {

          expect(e.code).toEqual("uu-subman-main/subject/update/invalidDtoIn");

          expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(7);

          expect(e.status).toEqual(400);

       }

    })

});


describe("uuSubman test subject list", () => {

    test("test 01 - hds", async () => {

        const dtoIn = {
            pageInfo: {
                pageIndex: 50,
                pageSize: 50
            }
        }; 

        let result = await TestHelper.executeGetCommand("subject/list", dtoIn);

        expect(result).not.toBeUndefined();

    });

});


describe("uuSubman test subject delete", () => {

    test("test 01 - hds", async () => {

        const dtoIn = {id}

        let result = await TestHelper.executePostCommand("subject/delete", dtoIn);

        expect(result).not.toBeUndefined();

    });

    test("test 02 - invalid dtoIn", async () => {

       expect.assertions(2);

       try {

          await TestHelper.executePostCommand("subject/delete", {});

       } catch (e) {

           expect(e.code).toEqual("uu-subman-main/subject/delete/invalidDtoIn");

           expect(e.status).toEqual(400);

       }

    })

});

/*
describe("uuSubman test subject addStudyMaterial", () => {

    test("test 01 - hds", async () => {

        const dtoIn = {
            id: id,
            data: {
                  baseUri: "https://uuos9.plus4u.net/uu-dockitg01-main/78462435-58d23c00b3b64ea99b2f7df3274e08ff/",
                  name: "Knowledge Base - Documentation",
                  type: "books",
                  productCode: " ",
            },
            language: "cs",
            formOfStudy: "fulltime"
        };
        
        let result = await TestHelper.executePostCommand("subject/addStudyMaterial", dtoIn);


        expect(result.data.id).toEqual(dtoIn.id); 

        expect(result.data.data.baseUri).toEqual(dtoIn.data.baseUri); 

        expect(result.data.data.name).toEqual(dtoIn.data.name); 

        expect(result.data.data.productCode).toEqual(dtoIn.data.productCode); 

        expect(result.data.language).toEqual(dtoIn.language);

        expect(result.data.formOfStudy).toEqual(dtoIn.formOfStudy);

    });

 
    test("test 02 - invalid dtoIn", async () => {

       expect.assertions(3);

       try {

          await TestHelper.executePostCommand("subject/addStudyMaterial", {});

       } catch (e) {

          expect(e.code).toEqual("uu-subman-main/subject/update/invalidDtoIn");

          expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(4);

          expect(e.status).toEqual(400);

       }     
    })

});
*/