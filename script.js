export async function fetchData() {
  const res = await fetch("http://localhost:3000/products");
  const inv = await res.json();
  return inv;
}

export function useTodaysDate() {
  const date = new Date().toISOString().split("T");
  const today = date[0];
  const lastUpdatedInput = document.querySelector("#prod-last-updated");
  lastUpdatedInput.setAttribute("min", today);
  lastUpdatedInput.setAttribute("max", today);
  lastUpdatedInput.value = today;
}

window.onload = async () => {
  useTodaysDate();
  const products = await fetchData();
  console.log("Products : ", JSON.stringify(products));
  let rows = "";
  let heading = "";
  heading = `<tr>
              <th class="heading-col">ProductId</th>
              <th class="heading-col">Name</th>
              <th class="heading-col">Brand</th>
              <th class="heading-col">Category</th>
              <th class="heading-col">SubCategory</th>
              <th class="heading-col">Price</th>
              <th class="heading-col">Total Stock</th>
              <th class="heading-col">Supplier</th>
              <th class="heading-col">Supplier Email</th>
              <th class="heading-col">Warranty</th>
              <th class="heading-col">Last Updated</th>
            </tr>`;
  document.querySelector(".products-table thead").innerHTML = heading;
  products.forEach((product) => {
    console.log(`id : ${product.id}`);
    rows += `<tr>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.brand}</td>
    <td>${product.category}</td>
    <td>${product.subCategory}</td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td>${product.supplier}</td>
    <td>${product.supplierEmail}</td>
    <td>${product.warranty}</td>
    <td>${product.lastUpdated}</td>
    <td><button class="table-button-class edit-button" data-id="${product.id}"><i id="edit-button" class="fa-solid fa-pen-to-square custom-icon-class"></i></button></td>
    <td><button class="table-button-class delete-button" data-id="${product.id}"><i class="fa-solid fa-trash custom-icon-class"></button></i></td>
    </tr>`;
  });
  document.querySelector(".table-body").innerHTML = rows;
  document.querySelector(".products-table").style.tableLayout = "fixed";

  const searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", (e) => {
    searchProduct();
  });

  const editButtons = document.querySelectorAll(".edit-button");
  console.log("Edit buttons are : ", editButtons);
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      editSelectedRecord(editButton.dataset.id);
      console.log(`dataset is : ${editButton.dataset.id}`);
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deletSelectedRecord(deleteButton.dataset.id);
    });
  });

  function searchProduct() {
    console.log("Inside searchProduct");
    console.log("Products are:", JSON.stringify(products));
    let searchValue = document.querySelector("#search-input").value;
    let lowerSearchValue = searchValue.toLowerCase();
    let filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(lowerSearchValue);
    });
    console.log("Filtered Prods :", JSON.stringify(filteredProducts));

    // Display the filtered products in table
    heading = `<tr>
    <th class="heading-col">ProductId</th>
    <th class="heading-col">Name</th>
    <th class="heading-col">Brand</th>
    <th class="heading-col">Category</th>
    <th class="heading-col">SubCategory</th>
    <th class="heading-col">Price</th>
    <th class="heading-col">Total Stock</th>
    <th class="heading-col">Supplier</th>
    <th class="heading-col">Supplier Email</th>
    <th class="heading-col">Warranty</th>
    <th class="heading-col">Last Updated</th>
  </tr>`;
    document.querySelector(".products-table thead").innerHTML = heading;
    rows = "";
    filteredProducts.forEach((product) => {
      console.log(`id : ${product.id}`);
      rows += `<tr>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.brand}</td>
    <td>${product.category}</td>
    <td>${product.subCategory}</td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td>${product.supplier}</td>
    <td>${product.supplierEmail}</td>
    <td>${product.warranty}</td>
    <td>${product.lastUpdated}</td>
    <td><button class="table-button-class edit-button" data-id="${product.id}"><i id="edit-button" class="fa-solid fa-pen-to-square custom-icon-class"></i></button></td>
    <td><button class="table-button-class delete-button" data-id="${product.id}"><i class="fa-solid fa-trash custom-icon-class"></button></i></td>
    </tr>`;
    });
    document.querySelector(".table-body").innerHTML = rows;
    document.querySelector(".products-table").style.tableLayout = "fixed";
    const editButtons = document.querySelectorAll(".edit-button");
    //Edit button
    editButtons.forEach((editButton) => {
      editButton.addEventListener("click", () => {
        editSelectedRecord(editButton.dataset.id);
        console.log(`dataset is : ${editButton.dataset.id}`);
      });
    });

    //Delete Button
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        deletSelectedRecord(deleteButton.dataset.id);
      });
    });
  }
};

export async function editSelectedRecord(prodId) {
  console.log("In Edit Selected Record prod id :", prodId);
  const allProds = await fetchData("http://localhost:3000/products");
  console.log("All prods : ", allProds);
  let selectedProd = allProds.find((prod) => {
    return prod.id === prodId;
  });
  console.log("Selected Prod :", selectedProd);
  if (selectedProd) {
    document.querySelector("#prod-name").value = selectedProd.name;
    document.querySelector("#prod-brand").value = selectedProd.brand;
    document.querySelector("#prod-category").value = selectedProd.category;
    document.querySelector("#prod-subcategory").value =
      selectedProd.subCategory;
    document.querySelector("#prod-price").value = selectedProd.price;
    document.querySelector("#prod-total-stock").value = selectedProd.stock;
    document.querySelector("#prod-supplier").value = selectedProd.supplier;
    document.querySelector("#prod-supplier-email").value =
      selectedProd.supplierEmail;
    document.querySelector("#prod-warranty").value = selectedProd.warranty;
    document.querySelector("#prod-last-updated").value =
      selectedProd.lastUpdated;

    document.querySelector(".table-container").style.display = "none";
    document.querySelector(".add-inv-form-class").style.display = "flex";
    document.querySelector("#submit-button").style.display = "none";
    const updateBtn = document.querySelector("#update-button");
    updateBtn.style.display = "block";
    updateBtn.disabled = true;
    updateBtn.style.backgroundColor = "rgb(227, 160, 160)";
    const invUpdatedForm = document.querySelector("#add-inv-form");
    invUpdatedForm.addEventListener("input", () => {
      const name = document.querySelector("#prod-name").value;
      const brand = document.querySelector("#prod-brand").value;
      const price = document.querySelector("#prod-price").value;
      const stock = document.querySelector("#prod-total-stock").value;
      const supplier = document.querySelector("#prod-supplier").value;
      const supplierEmail = document.querySelector(
        "#prod-supplier-email"
      ).value;
      if (name && brand && price && stock && supplier && supplierEmail) {
        updateBtn.disabled = false;
        updateBtn.style.backgroundColor = "red";
      }
    });
    updateBtn.addEventListener("click", (e) => updateChosenRecord(e, prodId));
  }
}

export async function deletSelectedRecord(prodId) {
  const confirmRes = confirm(`Are you sure you want to delete ${prodId}`);
  if (confirmRes === true) {
    try {
      const res = await fetch(`http://localhost:3000/products/${prodId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Record deleted successfully");
      }
    } catch (error) {
      console.log(`Error ${error} occurred when deleting the record`);
    }
  }
}

async function updateChosenRecord(e, prodId) {
  console.log("Inside update chosen record prodId is : ", prodId);
  e.preventDefault();
  const updatedInventory = {
    name: document.querySelector("#prod-name").value,
    brand: document.querySelector("#prod-brand").value,
    category: document.querySelector("#prod-category").value,
    subCategory: document.querySelector("#prod-subcategory").value,
    price: document.querySelector("#prod-price").value,
    stock: document.querySelector("#prod-total-stock").value,
    supplier: document.querySelector("#prod-supplier").value,
    supplierEmail: document.querySelector("#prod-supplier-email").value,
    warranty: document.querySelector("#prod-warranty").value,
    lastUpdated: document.querySelector("#prod-last-updated").value,
  };
  try {
    const response = await fetch(`http://localhost:3000/products/${prodId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInventory),
    });

    if (response.ok) {
      console.log("record updated");
    }
  } catch (error) {
    console.log(`Error occured when updating record: ${error}`);
  }
}

const addNewButton = document.querySelector("#add-new");
const addInvFormClass = document.querySelector(".add-inv-form-class");
console.log("form class:", addInvFormClass);
if (addNewButton) {
  addNewButton.addEventListener("click", popAddForm);
}

function popAddForm() {
  console.log("Inside popAddForm");
  console.log("form class: ", addInvFormClass);
  document.querySelector(".table-container").style.display = "none";
  document.querySelector("#update-button").style.display = "none";
  addInvFormClass.style.display = "flex";

  const submitButton = document.querySelector("#submit-button");
  submitButton.disabled = true;

  const invForm = document.querySelector("#add-inv-form");
  invForm.addEventListener("input", () => {
    const name = document.querySelector("#prod-name").value;
    const brand = document.querySelector("#prod-brand").value;
    const price = document.querySelector("#prod-price").value;
    const stock = document.querySelector("#prod-total-stock").value;
    const supplier = document.querySelector("#prod-supplier").value;
    const supplierEmail = document.querySelector("#prod-supplier-email").value;
    if (name && brand && price && stock && supplier && supplierEmail) {
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "red";
    }
  });

  submitButton.addEventListener("click", (e) => submitNewInv(e));
  window.onload();
}

async function submitNewInv(e) {
  e.preventDefault();
  console.log("Inside submitNewInv");
  const addInvForm = document.querySelector("#add-inv-form");
  const newID = await getNewID();
  const newInv = {
    id: newID,
    name: document.querySelector("#prod-name").value,
    brand: document.querySelector("#prod-brand").value,
    category: document.querySelector("#prod-category").value,
    subCategory: document.querySelector("#prod-subcategory").value,
    price: document.querySelector("#prod-price").value,
    stock: document.querySelector("#prod-total-stock").value,
    supplier: document.querySelector("#prod-supplier").value,
    supplierEmail: document.querySelector("#prod-supplier-email").value,
    warranty: document.querySelector("#prod-warranty").value,
    lastUpdated: document.querySelector("#prod-last-updated").value,
  };
  console.log(`New Inv is : ${newInv}`);

  try {
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-type": "aaplication/json" },
      body: JSON.stringify(newInv),
    });

    if (res.ok) {
      console.log("Data added succesfully");
    }
  } catch (error) {
    console.log("Error adding new inventory", error);
  }
}

async function getNewID() {
  const allProducts = await fetchData();
  let maximumId = 0;
  allProducts.forEach((prod) => {
    let id = prod.id;
    let numberPart = Number(id.substr(3));
    console.log(`Max id is  : ${numberPart}`);
    if (numberPart > maximumId) {
      maximumId = numberPart;
    }
  });

  const newNum = maximumId + 1;
  console.log(`New Num is : ${newNum}`);
  return `PRD00${newNum}`;
}
