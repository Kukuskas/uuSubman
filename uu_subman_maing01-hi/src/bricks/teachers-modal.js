import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";

const Page = UU5.Common.VisualComponent.create({
  render() {
    return (
      <UU5.Bricks.Container>
        {/*@@viewOn:0*/}
        <UU5.Bricks.Modal ref_={(modal) => (Page.modal = modal)} />
        <UU5.Bricks.Button
          content="Default modal with content"
          onClick={() =>
            Page.modal.open({
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis urna vel ex interdum, nec auctor mauris sollicitudin. Vivamus ut erat massa. Aenean placerat orci in erat aliquet, in molestie sem sagittis. Quisque euismod est nulla, ut gravida lorem molestie non. Duis vitae augue id eros euismod condimentum vitae gravida lacus. Aliquam erat volutpat. Sed condimentum nisi ac erat consequat, quis lacinia eros mollis. Vivamus placerat magna sit amet tortor imperdiet lobortis. Maecenas imperdiet, justo in bibendum condimentum, lacus magna rutrum eros, vitae vehicula dolor augue non neque. Curabitur faucibus fermentum tellus ut maximus. Curabitur condimentum aliquam dui non condimentum. Fusce et purus vel lacus feugiat vulputate pharetra eu arcu. Cras iaculis ut justo eget viverra. Vivamus fermentum quam sem, in mollis massa aliquam eget.",
            })
          }
        />
        <br />
        <br />
        <UU5.Bricks.Button
          content="Modal with header, footer and content"
          onClick={() =>
            Page.modal.open({
              header: "Header",
              footer: "Footer",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis urna vel ex interdum, nec auctor mauris sollicitudin. Vivamus ut erat massa. Aenean placerat orci in erat aliquet, in molestie sem sagittis. Quisque euismod est nulla, ut gravida lorem molestie non. Duis vitae augue id eros euismod condimentum vitae gravida lacus. Aliquam erat volutpat.",
            })
          }
        />
        {/*@@viewOff:0*/}
      </UU5.Bricks.Container>
    );
  },
});

export default Page;
