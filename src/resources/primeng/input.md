# PrimeNG InputText

**Module:** `InputTextModule`
**Import:** `import { InputTextModule } from 'primeng/inputtext';`
**Selector:** `input[pInputText]`

## Usage

### Basic

```html
<input type="text" pInputText [(ngModel)]="value" />
```

### Floating Label

```html
<span class="p-float-label">
  <input pInputText id="username" [(ngModel)]="username" />
  <label for="username">Username</label>
</span>
```

### With Icons

```html
<span class="p-input-icon-left">
  <i class="pi pi-search"></i>
  <input type="text" pInputText placeholder="Search" />
</span>

<span class="p-input-icon-right">
  <i class="pi pi-spin pi-spinner"></i>
  <input type="text" pInputText />
</span>
```

### Disabled

```html
<input type="text" pInputText disabled />
```
