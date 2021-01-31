//@@viewOn:imports
import { createVisualComponent, useRef, useState } from "uu5g04-hooks";
import Config from "./config/config";
import SubjectProvider from "../bricks/subject-provider";
import Css from "./subject.css";
import SubjectDetail from "../bricks/subject-detail";
import UU5 from "uu5g04";
import Calls from '../calls.js';

//@@viewOff:imports

const SubjectRoute = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectRoute",
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
        function handleBack() {
      return UU5.Environment.getRouter().setRoute({
        url: "/subjects",
      });
    }
    /* eslint no-unused-vars: "off" */
    async function handleUpdate(subject) {
      try {
        await updateSubjectRef.current(subject);
        return handleHome();
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

    async function handleGet(id) {
      // console.log(id);
      // console.log("this is id ++++++++++++++++++++++++++++++");
      // try {
      //   await getSubjectRef.current(id);
      // } catch {
      //   showError(`Getting the subject failed!`);
      // }
      return Calls.getSubject(id);
      
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

    function renderReady(sub) {
      // let su = sub.filter(subj => subj.data.id == subject.subject.id)
      console.log(sub[0].data);
      return (
        <SubjectDetail
          subject={sub[0].data}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onUpdateTopic={handleUpdateTopic}
          onDeleteTopic={handleDeleteTopic}
          onAddTopic={handleAddTopic}
          onGet={handleGet}
          onChange={handleChange}
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

    async function handleDelete(subject) {
      try {
        await deleteSubjectRef.current({ id: subject.id });
        handleBack();
      } catch {
        showError(`Deletion of ${subject.name} failed!`);
      }
    }
    const [reRender, setReRender] = useState(subject.subject);
    function handleChange() {
      Promise.resolve(handleGet({id: subject.id})).then(function(value) {
        setReRender(value);
      })
      console.log("updating...");
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
              getSubjectRef.current = handlerMap.getSubject;
              updateSubjectRef.current = handlerMap.updateSubject;
              deleteSubjectRef.current = handlerMap.deleteSubject;
              updateTopicSubjectRef.current = handlerMap.updateTopicSubject;
              deleteTopicSubjectRef.current = handlerMap.deleteTopicSubject;
              addTopicSubjectRef.current = handlerMap.addTopicSubject;

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
                  return renderReady(data=data.filter(subj => subj.data.id == subject.subject.id));
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
