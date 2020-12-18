//@@viewOn:imports
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectList from "../bricks/subject-list";
import SubjectProvider from "../bricks/subject-provider";
import SubjectCreate from "../bricks/subject-create";
import SubjectsTitle from "../bricks/subject-title";
import Css from "./subject.css";
import SubjectDetail from "../bricks/subject-detail";
import UU5, { PropTypes } from "uu5g04";
import Subjects from "./subjects";

//@@viewOff:imports

const SubjectRoute = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Subjects",
  //@@viewOff:statics

  //@@viewOn:render
  render(subject) {
    //@@viewOn:render
    const getSubjectRef = useRef();
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

    async function handleGet(id) {
      try {
        await getSubjectRef.current(subject);
      } catch {
        showError(`Getting of ${subject.name} failed!`);
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

    function renderReady(subject) {
      return (
        <>
          <SubjectDetail subject={subject} onDelete={handleDelete} />
          
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
    function handleBack() {
      return UU5.Environment.getRouter().setRoute({
        component: <Subjects />,
      });
    }
        async function handleDelete(subject) {
      try {
        await deleteSubjectRef.current({ id: subject.id });
        handleBack()
      } catch {
        showError(`Deletion of ${subject.name} failed!`);
      }
    }


    return (
      <UU5.Bricks.Section className={Css.main()}>
        <UU5.Bricks.Button
          colorSchema="primary"
          content={<UU5.Bricks.Lsi lsi={{ en: "Back", cs: "Zpět" }} />}
          onClick={handleBack}
        />
        <UU5.Bricks.Section className={Css.main()}>
          <SubjectProvider>
            {({ state, data, errorData, pendingData, handlerMap }) => {
              getSubjectRef.current = handlerMap.getSubject;
              updateSubjectRef.current = handlerMap.updateSubject;
              deleteSubjectRef.current = handlerMap.deleteSubject;
              data=subject.subject

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
                  return (renderReady(data));
              }
            }}
          </SubjectProvider>
        </UU5.Bricks.Section>
      </UU5.Bricks.Section>
    );
    //@@viewOff:render
  },
  //@@viewOff:render
});

export default SubjectRoute;
