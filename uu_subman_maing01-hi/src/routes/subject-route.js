//@@viewOn:imports
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectProvider from "../bricks/subject-provider";
import SubjectUpdate from "../bricks/subject-update";
import SubjectsTitle from "../bricks/subject-title";
import Css from "./subject.css";
import SubjectDetail from "../bricks/subject-detail";
import UU5, { PropTypes } from "uu5g04";
import TopicList from "../bricks/topic-list";

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
    const updateTopicSubjectRef = useRef();
    const deleteTopicSubjectRef = useRef();
    const addTopicSubjectRef = useRef();
    const deleteStudyMaterialSubjectRef =  useRef();
    const addStudyMaterialSubjectRef = useRef();
    //@viewOff:hooks

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "red",
      });
    }

    function handleHome() {
      return (
        UU5.Environment.getRouter().setRoute({
          url: "/",
        }),
        handleBack()
      );
    }
    /* eslint no-unused-vars: "off" */
    async function handleUpdate(subject) {
      try {
        await updateSubjectRef.current(subject);
      } catch {
        showError(`Create of ${subject.name.en} failed!`);
      }
    }

    async function handleDelete(subject) {
      try {
        await deleteSubjectRef.current({ id: subject.id });
      } catch {
        showError(`Deletion of ${subject.name} failed!`);
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
    async function handleDeleteStudyMaterial(studyMaterial) {
      try {
        console.log("///////////////////passed to del////////////");
        await deleteStudyMaterialSubjectRef.current(studyMaterial);
      } catch {
        showError(`Deletion of the study material failed!`);
      }
    }

    async function handleAddStudyMaterial(studyMaterial) {
      try {
        await addStudyMaterialSubjectRef.current(studyMaterial);
      } catch {
        showError(`Adding of the study material failed!`);
      }
    }
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderReady(subject) {
      return (
        <SubjectDetail
          subject={subject}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onUpdateTopic={handleUpdateTopic}
          onDeleteTopic={handleDeleteTopic}
          onAddTopic={handleAddTopic}
          onDeleteStudyMaterial={handleDeleteStudyMaterial}
          onAddStudyMaterial = {handleAddStudyMaterial}
        />
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
    async function handleDelete(subject) {
      try {
        await deleteSubjectRef.current({ id: subject.id });
        handleBack();
      } catch {
        showError(`Deletion of ${subject.name} failed!`);
      }
    }

    return (
      <UU5.Bricks.Section className={Css.main()}>
        {/* <UU5.Bricks.Button
          colorSchema="primary"
          content={<UU5.Bricks.Lsi lsi={{ en: "Back", cs: "Zpět" }} />}
          onClick={handleBack}
        /> */}
        <UU5.Bricks.Section className={Css.main()}>
          <SubjectProvider>
            {({ state, data, errorData, pendingData, handlerMap }) => {
               data = subject.subject;
              getSubjectRef.current = handlerMap.getSubject;
              updateSubjectRef.current = handlerMap.updateSubject;
              deleteSubjectRef.current = handlerMap.deleteSubject;
              updateTopicSubjectRef.current = handlerMap.updateTopicSubject;
              deleteTopicSubjectRef.current = handlerMap.deleteTopicSubject;
              addTopicSubjectRef.current = handlerMap.addTopicSubject;
              deleteStudyMaterialSubjectRef.current = handlerMap.deleteStudyMaterialSubject;
              addStudyMaterialSubjectRef.current = handlerMap.addStudyMaterialSubjectRef;
             

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
      </UU5.Bricks.Section>
    );
    //@@viewOff:render
  },
  //@@viewOff:render
});

export default SubjectRoute;
