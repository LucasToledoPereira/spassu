# UIDialog

This component is responsable for the renderization of dialogs.

<br />

## How to use

**Important**: The uidialog function returns an Obsevable, so, it`s necessary to subscribe it to show the dialog.

```javascript
import { UIDialogRef, UIDialogContext } from '@ui/dialog';
import { useContext } from 'react';

const MyComponent = () => {
  const modalRef = useRef<UIDialogRef<null>>();
  return (
    <>
      <button
        onClick={() => modalRef.current?.open()}
      >
        Click Me
      </button>
      <MyDialogContent ref={modalRef} onClose={() => console.log('On Close')}/>
    </>

  );
};

const MyDialogContent = asDialog(({close = noop}: UIDialogProps) => {
  return (
    <div>
      Here goes any content Always remember to add some actions that will close the dialog, like a button or something like that.
      <button onClick={() => close('Closing the dialog with a message')}></button>
      <button onClick={() => close(true)}></button>
      <button onClick={() => close(false)}></button>
    </div>
  );
});
```

<br />

## Style Variables

| Variable                  | Description      | Default                |
| ------------------------- | ---------------- | ---------------------- |
| --ui-dialog-background    | Background color | #fff      |
| --ui-dialog-box-shadow    | Box Shadow       | 0px 3px 6px #00000029    |
| --ui-dialog-border-radius | Border Radius    | 15px |
| --ui-dialog-padding       | Padding          | 2rem                   |
