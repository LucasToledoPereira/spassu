# DataGrid

It renders a responsive data grid (like a table). Must be used with UIColumn and UIRow components.
To build a responsive data grid we are using the **grid-template-area** css property, you can read more at the [official documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas).

<br />

## How to use

```javascript
const MyComponent = () => {
  return (
    <>
      <DataGrid
        template={{
          sm: "'column_one column_two' 'column_three column_three'",
          md: "'column_one column_two' 'column_three column_three'",
          lg: "'column_one column_two column_three'",
          xl: "'column_one column_two column_three'",
        }}
      >
        <Row>
          <Column name="column_one">{/** Column content goes here*/}</Column>
          <Column name="column_two">{/** Column content goes here*/}</Column>
          <Column name="column_three">{/** Column content goes here*/}</Column>
        </UIRow>
      </DataGrid>
    </>
  );
};
```

<br />

## Properties for UIDataGrid

| Property | Type               | Description                          | Required | Default |
| -------- | ------------------ | ------------------------------------ | -------- | ------- |
| template | UiDataGridTemplate | Use to define the grid-template-area | true     | none    |

<br />

## Properties for UIRow

| Property | Type     | Description                     | Required | Default |
| -------- | -------- | ------------------------------- | -------- | ------- |
| onClick  | Function | Allow to listen for a row click | false    | none    |

<br />

## Properties for UIColumn

| Property | Type   | Description                                                | Required | Default |
| -------- | ------ | ---------------------------------------------------------- | -------- | ------- |
| name     | string | Use to define the grid areas, must be unique inside a grid | true     | none    |
| label    | string | Label that the user will see                               | false    |         |

<br />

## Style Variables

| Variable                                | Description                | Default                          |
| --------------------------------------- | -------------------------- | -------------------------------- |
| --ui-data-grid-border-color             | Border color               | --ui-color-light                |
| --ui-data-grid-border-radius            | Border radius              | --ui-border-radius-lg           |
| --ui-data-grid-column-gap               | Gap between column         | 8px                              |
| --ui-data-grid-row-gap                  | Gap between rows           | 16px                             |
| --ui-data-grid-row-padding              | Row padding                | 8px 16px                         |
| --u-data-grid-row-margin-bottom         | Row margin bottom          | 2px                              |
| --ui-data-grid-row-height               | Row min-height             | 32px                             |
| --ui-data-grid-row-border-bottom        | Row border bottom          | 1px solid var(--ui-color-light) |
| --ui-data-grid-row-bg-hover             | Background color on hover  | --ui-color-secondary            |
