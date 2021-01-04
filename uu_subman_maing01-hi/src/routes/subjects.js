//@@viewOn:imports
import { createVisualComponent, useRef, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectList from "../bricks/subject-list";
import SubjectProvider from "../bricks/subject-provider";
import SubjectCreate from "../bricks/subject-create";
import SubjectsTitle from "../bricks/subject-title";
import Css from "./subject.css";
import UU5 from "uu5g04";
import Calls from "../calls"
import SubmanMainContext from "../bricks/subman-main-context";

//@@viewOff:imports

const Subjects = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subjects",
  //@@viewOff:statics

  //@@viewOn:render
  render() {
    //@@viewOn:render
    const { data: { authorizedProfileList }} = useContext(SubmanMainContext);
    const createSubjectRef = useRef();
    const updateSubjectRef = useRef();
    const deleteSubjectRef = useRef();
    //@viewOff:hooks

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "red",
      });
    }
    function handleBack() {
      return UU5.Environment.getRouter().setRoute({
        url:"/subjects"
        
      })
    }
    function handleHome() {
      return (UU5.Environment.getRouter().setRoute({
        url:"/"
        
      }), handleBack())
    }
    function isCreateAuthorized() {
      return authorizedProfileList.some(
        profile => profile === Config.Profiles.AUTHORITIES || profile === Config.Profiles.EXECUTIVES
      );
    }


    async function handleCreate(subject) {
      try{ await Calls.createSubject(subject);
        return handleHome()
       } catch {
        showError(`Create of ${subject.name.en} failed!`);
      }
      
    }

    /* eslint no-unused-vars: "off" */
    async function handleUpdate(subject, values) {
      try {
        await updateSubjectRef.current({ id: subject.id, ...values });
      } catch {
        showError(`Update of ${subject.name} failed!`);
      }
    }

    async function handleDelete(subject) {
      try {
        await deleteSubjectRef.current({ id: subject.id });
      } catch {
        showError(`Deletion of ${subject.name} failed!`);
      }
    }

    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }
    function renderReady(subjects) {
      return (
        <>
          <SubjectsTitle subjects={subjects} />
          {isCreateAuthorized() && <SubjectCreate onCreate={handleCreate} />}
          <SubjectList subjects={subjects} onDelete={handleDelete} />
        </>
      );
    }

    function renderError(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return <UU5.Bricks.Error content="Error happened!" error={errorData.error} errorData={errorData.data} />;
      }
    }

    return (
      <UU5.Bricks.Section className={Css.main()}>
        <SubjectProvider>
          {({ state, data, errorData, pendingData, handlerMap }) => {
            createSubjectRef.current = handlerMap.createSubject;
            updateSubjectRef.current = handlerMap.updateSubject;
            deleteSubjectRef.current = handlerMap.deleteSubject;

            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderError(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderReady(data);
            }
          }}
        </SubjectProvider>
      </UU5.Bricks.Section>
    );
    //@@viewOff:render
  },
  //@@viewOff:render
});

export default Subjects;
