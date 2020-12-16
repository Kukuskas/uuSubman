//@@viewOn:imports
import UU5, { Bricks } from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import "uu5g04-forms";
//@@viewOff:imports

const SubjectCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {}
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel }) {
    //@@viewOn:render
    return (
      <UU5.Bricks.Container>
      <UU5.Forms.ContextModal size="l" shown={true} >
        
          <UU5.Forms.ContextHeader
          content={<UU5.Bricks.Lsi lsi={{ en: "Create a new product" }} />}
          info={<UU5.Bricks.Lsi lsi={{ cs: <UU5.Bricks.Paragraph style="margin: 0" />, en: "More info..." }} />}
        />
        <UU5.Forms.Form
          onSave={onSave}
          onCancel={onCancel}
        >
          <UU5.Forms.Text name="name" label={<UU5.Bricks.Lsi lsi={{ en: "Name" }} />} required />
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Select name="productFlow" label="Product Flow Classification">
                <UU5.Forms.Select.Option value="1" />
                <UU5.Forms.Select.Option value="2" />
              </UU5.Forms.Select>
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.Select name="uuP" label="uuP Classification">
                <UU5.Forms.Select.Option value="1" />
                <UU5.Forms.Select.Option value="2" />
              </UU5.Forms.Select>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.RichText.EditorInput name="desc" label="Description" labelColWidth="xs-12" inputColWidth="xs-12"
                                    labelAlignment="xl-left" />

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="s-6">
              <UU5.Forms.TextButton name="icon" label="uuBml Icon" buttons={[{
                icon: "mdi-magnify",
                onClick: (opt) => console.log(opt),
              }]} />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Forms.ContextControls
          buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Create", cs: "Vytvořit" }} /> }}
          buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Cancel", cs: "Zrušit" }} /> }}
        />
          
           
             <UU5.Bricks.Text content = "Name:" />
            
             <UU5.Forms.Text  borderRadius="8px" label = "Czech" name = "nameCs" />
           <UU5.Forms.Text borderRadius="8px" label = "English" name = "nameEn" />
           
           <UU5.Forms.Number min={0} max={40} buttonHidden={true} borderRadius="8px" label = "Credits" name = "credits"/>
          <UU5.Forms.Text borderRadius="8px" label = "Description" name = "desc" />
          
          

          <UU5.Forms.ContextControls
          buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Create", cs: "Vytvořit" }} /> }}
          buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={{ en: "Cancel", cs: "Zrušit" }} /> }}
        />
        </UU5.Forms.Form>
        </UU5.Forms.ContextModal>
        </UU5.Bricks.Container>

      );
    //@@viewOff:render
  }
});

export default SubjectCreateForm;