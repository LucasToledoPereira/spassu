# UIAlert

This component is responsable for the renderization of alerts.

We can show **THREE** types of alerts: **info**, **warning** or **danger**.

<br />

## How to use

**Important**: The uialert function returns an Obsevable, so, it`s necessary to subscribe it to show the alert.

```javascript
import { uialert } from '@ui/alert';

//Remember that the uialert function returns an Obsevable, so, it`s necessary to subscribe it to show the alert.
//This is a boolean Observable, meaning that when resolved it will return TRUE if the Confirm buttons was clicked or FALSE if the cancel button is clicked.

alert({
  title: `Você deseja remover a conta #${acc.id}?`,
  message: 'Essa ação é irreversível',
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Remover',
  type: 'danger',
}).subscribe((confirm: boolean) => {
  if (confirm) {
    //Do something
  } else {
    //Do otherthing
  }
});
```

<br />

## Properties

You can configurate your alert by using any of the following properties (check the interface UIAlertConfig):

| Property          | Type                            | Description                               | Required | Default |
| ----------------- | ------------------------------- | ----------------------------------------- | -------- | ------- |
| title             | string                          | It is the main text                       | true     |         |
| message           | string                          | It is a secondary text                    | false    |         |
| cancelButtonText  | string                          | The label of cancel button                | false    | Cancel  |
| confirmButtonText | string                          | The label of confirm button               | false    | Confirm |
| type              | 'info' or 'warning' or 'danger' | The alert type changes it color and theme | false    | info    |

<br />

## Style Variables

| Variable                 | Description      | Default                |
| ------------------------ | ---------------- | ---------------------- |
| --ui-alert-background    | Background color | #fff      |
| --ui-alert-box-shadow    | Box Shadow       | 0px 3px 6px #00000029    |
| --ui-alert-border-radius | Border Radius    | 15px |
| --ui-alert-padding       | Padding          | 2rem                   |

<br />

## Interfaces

The component exports the **UIAlertConfig** type/interface:

```javascript
interface UIAlertConfig {
  title: string;
  message?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  type?: 'info' | 'warning' | 'danger';
}
```
