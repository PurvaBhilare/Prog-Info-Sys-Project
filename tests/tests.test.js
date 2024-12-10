import { fetchData } from "../script";

// Mocking fetch globally
global.fetch = jest.fn();

describe("DOM in javascript file", () => {
  let addNewRecordButton, addInvFormClass;

  beforeEach(() => {
    // Set up our mocked DOM
    document.body.innerHTML = `
      <div class="table-container"></div>
      <button id="add-new">Add New</button>
      <div class="add-inv-form-class" style="display: none;"></div>
      <form id="add-inv-form"></form>
      <input id="prod-name" />
      <input id="prod-brand" />
      <input id="prod-price" />
      <input id="prod-total-stock" />
      <input id="prod-supplier" />
      <input id="prod-supplier-email" />
      <button id="submit-button">Submit</button>
    `;

    // Mock commonly used elements
    addNewRecordButton = document.querySelector("#add-new");
    addInvFormClass = document.querySelector(".add-inv-form-class");
  });

  afterEach(() => {
    jest.clearAllMocks();
    //Clearing the DOM
    document.body.innerHTML = "";
  });
});
