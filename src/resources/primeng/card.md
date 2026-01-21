# PrimeNG Card

**Module:** `CardModule`
**Import:** `import { CardModule } from 'primeng/card';`
**Selector:** `p-card`

## Usage

### Basic

```html
<p-card header="Simple Card">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
    consequuntur error repudiandae numquam deserunt quisquam repellat libero
    asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
    neque quas!
  </p>
</p-card>
```

### With Subheader & Content

```html
<p-card
  header="Advanced Card"
  subheader="Card Subheader"
  [style]="{ width: '360px' }"
>
  <ng-template pTemplate="header">
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primeng/images/usercard.png"
    />
  </ng-template>
  <p>Content goes here...</p>
  <ng-template pTemplate="footer">
    <p-button label="Save" icon="pi pi-check"></p-button>
    <p-button
      label="Cancel"
      icon="pi pi-times"
      styleClass="p-button-secondary"
      [style]="{ 'margin-left': '.5em' }"
    ></p-button>
  </ng-template>
</p-card>
```
