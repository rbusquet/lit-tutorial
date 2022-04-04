import {css, html, LitElement} from "lit";
import {customElement, property, query} from "lit/decorators.js";

@customElement("step-one")
export class StepOne extends LitElement {
  @property()
  version = "STARTING";

  render() {
    return html`
      <p>Welcome to the Lit tutorial!</p>
      <p>This is the ${this.version} code.</p>
    `;
  }
}

@customElement("step-two")
export class StepTwo extends LitElement {
  render() {
    return html`<p>Hello World! From step-two.</p>`;
  }
}

@customElement("step-three")
export class StepThree extends LitElement {
  @property()
  message = "Hello again.";

  render() {
    return html`<p>${this.message}</p>`;
  }
}

@customElement("name-tag")
export class NameTag extends LitElement {
  @property()
  name: string = "Your name here";

  render() {
    return html`
      <p>Hello, ${this.name}</p>
      <input @input=${this.changeName} placeholder="Enter your name" />
    `;
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }
}

@customElement("more-expressions")
export class MoreExpressions extends LitElement {
  @property({type: Boolean})
  checked: boolean = false;

  render() {
    return html`
      <div>
        <input type="text" value="Hello there." ?disabled=${!this.checked} />
      </div>
      <label>
        <input type="checkbox" @change=${this.setChecked} />
        Enable editing
      </label>
    `;
  }

  setChecked(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
  }
}

@customElement("todo-list")
export class ToDoList extends LitElement {
  @property({type: Array})
  listItems = [
    {text: "Start Lit tutorial", completed: true},
    {text: "Make to-do list", completed: false},
  ];

  @query("#newitem")
  input!: HTMLInputElement;

  render() {
    return html`
      <h2>To Do</h2>
      <ul>
        ${this.listItems.map((item) => html`<li>${item.text}</li>`)}
      </ul>
      <input id="newitem" aria-label="New item" />
      <button @click=${this.addToDo}>Add</button>
    `;
  }

  addToDo() {
    this.listItems.push({
      text: this.input.value,
      completed: false,
    });
    this.input.value = "";
    this.requestUpdate();
  }
}

type ToDoItem = {
  text: string;
  completed: boolean;
};

@customElement("todo-list-two")
export class ToDoListTwo extends LitElement {
  static styles = css`
    .completed {
      text-decoration-line: line-through;
      color: #777;
    }
  `;

  @property({attribute: false})
  listItems = [
    {text: "Make to-do list", completed: true},
    {text: "Add some styles", completed: false},
  ];

  render() {
    return html`
      <h2>To Do</h2>
      <ul>
        ${this.listItems.map(
          (item) => html` <li
            class=${item.completed ? "completed" : ""}
            @click=${() => this.toggleCompleted(item)}
          >
            ${item.text}
          </li>`
        )}
      </ul>
      <input id="newitem" aria-label="New item" />
      <button @click=${this.addToDo}>Add</button>
    `;
  }

  toggleCompleted(item: ToDoItem) {
    item.completed = !item.completed;
    this.requestUpdate();
  }

  @query("#newitem")
  input!: HTMLInputElement;

  addToDo() {
    this.listItems.push({text: this.input.value, completed: false});
    this.input.value = "";
    this.requestUpdate();
  }
}

@customElement("todo-list-three")
export class ToDoListThree extends LitElement {
  static styles = css`
    .completed {
      text-decoration-line: line-through;
      color: #777;
    }
  `;

  @property({attribute: false})
  listItems = [
    {text: "Make to-do list", completed: true},
    {text: "Complete Lit tutorial", completed: false},
  ];

  @property({type: Boolean})
  hideCompleted = false;

  render() {
    // TODO: Replace items definition.
    const items = this.listItems.filter(
      (item) => !this.hideCompleted || !item.completed
    );
    const todos = html`
      <ul>
        ${items.map(
          (item) => html`<li
            class=${item.completed ? "completed" : ""}
            @click=${() => this.toggleCompleted(item)}
          >
            ${item.text}
          </li>`
        )}
      </ul>
    `;
    const caughtUpMessage = html`<p>You're all caught up!</p>`;

    const todosOrMessage = items.length > 0 ? todos : caughtUpMessage;
    return html`
      <h2>To Do</h2>
      <!-- TODO: Update expression. -->
      ${todosOrMessage}
      <input id="newitem" aria-label="New item" />
      <button @click=${this.addToDo}>Add</button>
      <br />
      <label>
        <input
          type="checkbox"
          @change=${this.setHideCompleted}
          ?checked=${this.hideCompleted}
        />
        Hide completed
      </label>
    `;
  }

  toggleCompleted(item: ToDoItem) {
    item.completed = !item.completed;
    this.requestUpdate();
  }

  setHideCompleted(e: Event) {
    this.hideCompleted = (e.target as HTMLInputElement).checked;
  }

  @query("#newitem")
  input!: HTMLInputElement;

  addToDo() {
    this.listItems.push({text: this.input.value, completed: false});
    this.input.value = "";
    this.requestUpdate();
  }
}
