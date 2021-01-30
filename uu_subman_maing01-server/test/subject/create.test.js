const { TestHelper } = require("uu_appg01_server-test");

beforeAll(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false});
});

afterAll(async () => {
    await TestHelper.teardown();
});

describe("uuSubman test", () => {
    test("test 01 - hds", async () => {
        const dtoIn = {
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


