# PrimeNG Button

**Module:** `ButtonModule`
**Import:** `import { ButtonModule } from 'primeng/button';`
**Selector:** `p-button`

## Usage

### Basic

```html
<p-button label="Submit"></p-button>
```

### With Icon

```html
<p-button label="Save" icon="pi pi-check"></p-button>
<p-button icon="pi pi-check"></p-button>
```

### Loading State

```html
<p-button label="Search" icon="pi pi-search" [loading]="isLoading()"></p-button>
```

### Severity

```html
<p-button label="Primary" severity="primary"></p-button>
<p-button label="Secondary" severity="secondary"></p-button>
<p-button label="Success" severity="success"></p-button>
<p-button label="Info" severity="info"></p-button>
<p-button label="Warning" severity="warning"></p-button>
<p-button label="Help" severity="help"></p-button>
<p-button label="Danger" severity="danger"></p-button>
```

### Raised/Rounded/Text/Outlined

```html
<p-button label="Raised" [raised]="true"></p-button>
<p-button label="Rounded" [rounded]="true"></p-button>
<p-button label="Text" [text]="true"></p-button>
<p-button label="Outlined" [outlined]="true"></p-button>
```
