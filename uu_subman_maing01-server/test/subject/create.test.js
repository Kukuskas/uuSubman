const { TestHelper } = require("uu_appg01_server-test");
const testHelper = require("uu_appg01_server-test/src/test-helper");

beforeAll(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false});
});

afterAll(async () => {
    await TestHelper.teardown();
});

describe("uuSubman test", () => {
    test("01 test - subject/create", async () => {
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

        const dtoOut = {
                "name": {
                  "cs": "Backendové systémy",
                  "en": "Backends systems"
                },
                "credits": 9,
                "supervisor": "24-9525-1",
                "degree": "bachelor",
                "desc": {
                  "cs": "Cílem předmětu je poskytnout studentům přehled v oblasti backendového vývoje.",
                  "en": "The course aims at providing students with an insight into backend development."
                },
                "languageOfStudy": "czech",
                "language": {
                  "cs": {
                    "formOfStudy": {
                      "fulltime": {
                        "id": "1",
                        "studyMaterialList": [],
                        "topics": [
                          {
                            "name": "Example fulltime",
                            "desc": "Lorem Ipsum",
                            "id": "00",
                            "studyMaterialList": []
                          }
                        ]
                      },
                      "parttime": {
                        "id": "2",
                        "studyMaterialList": [],
                        "topics": [
                          {
                            "name": "Example parttime",
                            "desc": "lorem Ipsum",
                            "id": "00",
                            "studyMaterialList": []
                          }
                        ]
                      }
                    }
                  },
                  "en": {
                    "formOfStudy": {
                      "fulltime": {
                        "id": "1",
                        "studyMaterialList": [],
                        "topics": [
                          {
                            "name": "Example fulltime",
                            "desc": "Lorem Ipsum",
                            "id": "00",
                            "studyMaterialList": []
                          }
                        ]
                      },
                      "parttime": {
                        "id": "2",
                        "studyMaterialList": [],
                        "topics": [
                          {
                            "name": "Example parttime",
                            "desc": "lorem Ipsum",
                            "id": "00",
                            "studyMaterialList": []
                          }
                        ]
                      }
                    }
                  }
                },
                "teachers": [],
                "uuIdentity": null,
                "students": [
                  {
                    "uuIdentity": "",
                    "formOfStudy": "fulltime"
                  }
                ],
                "id": " ",
                "sys": {},
                "awid": "22222222222222222222222222222222",
                "uuAppErrorMap": {}
        }

        let result = await TestHelper.executePostCommand("subject/create", dtoIn);
     
        result.data.id = " ";
        result.data.sys = {};

        expect(result.data).toEqual(dtoOut); 
        expect(result.data.uuAppErrorMap).toBeDefined();
        expect(result.data.uuAppErrorMap).toEqual({});
    });
});


