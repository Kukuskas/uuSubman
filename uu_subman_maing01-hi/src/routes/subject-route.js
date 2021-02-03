//@@viewOn:imports
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectDetailProvider from "../bricks/subject-detail-provider";
import Css from "./subject.css";
import SubjectDetail from "../bricks/subject-detail";
import UU5 from "uu5g04";

//@@viewOff:imports

const SubjectRoute = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectRoute",
  //@@viewOff:statics

  //@@viewOn:render
  render({subject}) {
    //@@viewOn:render
    const updateSubjectRef = useRef();
    const deleteSubjectRef = useRef();
    const updateTopicSubjectRef = useRef();
    const deleteTopicSubjectRef = useRef();
    const addTopicSubjectRef = useRef();
    //@viewOff:hooks

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "red",
      });
    }

    /* eslint no-unused-vars: "off" */
    async function handleUpdate(subject) {
      try {
        await updateSubjectRef.current(subject);
      } catch {
        showError(`Create of ${subject.name.en} failed!`);
      }
    }

    async function handleAddTopic(inputTopic) {
      try {
        await addTopicSubjectRef.current(inputTopic);
      } catch {
        showError(`Adding of the topic failed!`);
      }
    }

    async function handleDeleteTopic(inputTopic) {
      try {
        await deleteTopicSubjectRef.current(inputTopic);
      } catch {
        showError(`Deletion of the topic failed!`);
      }
    }

    async function handleUpdateTopic(inputTopic) {
      try {
        await updateTopicSubjectRef.current(inputTopic);
      } catch {
        showError(`Update of the topic failed!`);
      }
    }
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderReady(data) {
      // let su = sub.filter(subj => subj.data.id == subject.subject.id)
      return (
<>
        <SubjectDetail
          subject={data}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onUpdateTopic={handleUpdateTopic}
          onDeleteTopic={handleDeleteTopic}
          onAddTopic={handleAddTopic}
        />
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
        url: "/subjects",
      });
    }
    async function handleDelete(subjectId) {
      try {
        await deleteSubjectRef.current({ id: subjectId });
        handleBack()
      } catch {
        showError(`Deletion of subject failed!`);
      }
    }



    return (
      <UU5.Bricks.Section className={Css.main()}>
        <UU5.Bricks.Section className={Css.main()}>
          <SubjectDetailProvider subjectId={subject.id}>
            {({ state, data, errorData, pendingData, handlerMap }) => {
              updateSubjectRef.current = handlerMap.updateSubject;
              deleteSubjectRef.current = handlerMap.deleteSubject;
              updateTopicSubjectRef.current = handlerMap.updateTopicSubject;
              deleteTopicSubjectRef.current = handlerMap.deleteTopicSubject;
              addTopicSubjectRef.current = handlerMap.addTopicSubject;
              // deleteStudyMaterialSubjectRef.current = handlerMap.deleteStudyMaterialSubject;
              // addStudyMaterialSubjectRef.current = handlerMap.addStudyMaterialSubjectRef;

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
          </SubjectDetailProvider>
        </UU5.Bricks.Section>
      </UU5.Bricks.Section>
    );
    //@@viewOff:render
  },
  //@@viewOff:render
});

export default SubjectRoute;
