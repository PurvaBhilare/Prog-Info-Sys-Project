async function fetchData() {
  const res = await fetch("http://localhost:3000/products");
  const inv = await res.json();
  return inv;
}

window.onload = async () => {
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
    <td><button class="table-button-class edit-button data-id="${product.id}"><i id="edit-button" class="fa-solid fa-pen-to-square custom-icon-class"></i></button></td>
    <td><button class="table-button-class delete-button data-id="${product.id}"><i class="fa-solid fa-trash custom-icon-class"></button></i></td>
    </tr>`;
  });
  document.querySelector(".table-body").innerHTML = rows;
  document.querySelector(".products-table").style.tableLayout = "fixed";

  const editButtons = document.querySelectorAll(".edit-button");
  console.log("Edit buttons are : ", editButtons);
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () => {
      editSelectedRecord(editButton.dataset.id);
    });
  });
};

async function editSelectedRecord(prodId) {
  console.log("In Edit Selected Record");
  const allProds = await fetchData("http://localhost:3000/products");
  console.log("All prods : ", allProds);
  const selectedProd = allProds.find((prod) => {
    prod.id === prodId;
  });
}

const addNewButton = document.querySelector("#add-new");
addInvFormClass = document.querySelector(".add-inv-form-class");
console.log("form class:", addInvFormClass);
addNewButton.addEventListener("click", popAddForm);

function popAddForm() {
  console.log("Inside popAddForm");
  console.log("form class: ", addInvFormClass);
  document.querySelector(".table-container").style.display = "none";
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
