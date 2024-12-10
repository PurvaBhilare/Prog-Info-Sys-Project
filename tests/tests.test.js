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
    addNewRecordButton = document.querySelector("#add-new");
    addInvFormClass = document.querySelector(".add-inv-form-class");
  });

  afterEach(() => {
    jest.clearAllMocks();
    //Clearing the DOM
    document.body.innerHTML = "";
  });

  test("On clicking Addnew button popAddFormMethod is called", () => {
    //First mock the function popAddForm()
    const popAddForm = jest.fn();

    addNewRecordButton.addEventListener("click", popAddForm);
    addNewRecordButton.click();
    expect(popAddForm).toHaveBeenCalled();
  });

  test("Inv form displayed when addNew button is clicked", () => {
    addNewRecordButton.addEventListener("click", () => {
      document.querySelector(".table-container").style.display = "none";
      addInvFormClass.style.display = "flex";
    });

    addNewRecordButton.click();
    expect(document.querySelector(".table-container").style.display).toBe(
      "none"
    );
    expect(addInvFormClass.style.display).toBe("flex");
  });
}); //Describe for DOM ends here

//fetch Data
describe("Fetch Data", () => {
  test("Fetch Inventory data", async () => {
    const mockProducts = [
      {
        name: "Dell XPS 15",
        brand: "Dell",
        category: "Laptops",
        subCategory: "Ultrabooks",
        price: "2499.99",
        stock: "25",
        supplier: "Dell Technologies",
        supplierEmail: "dell@gmail.com",
        warranty: "1 Year",
        lastUpdated: "2024-11-04",
        id: "PRD001",
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    const result = await fetchData();
    expect(result).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/products");
  }); // test for fetch ends here

  test("throw error if fetch api is not successful", async () => {
    fetch.mockRejectedValueOnce(new Error("Fetch has failed"));
    await expect(fetchData()).rejects.toThrow("Fetch has failed");
  });
}); //Describe for fetch ends here
