//Test code starts here

function mockFetchAPI(res) {
  globalThis.fetch = async (url, options) => {
    return {
      ok: true,
      json: async () => res,
    };
  };
}

function assertTest(conditionToTest, messageToDisplay) {
  if (conditionToTest) {
    console.log(`Test has passed : ${messageToDisplay}`);
  } else {
    console.log(`Test has failed : ${messageToDisplay}`);
  }
}

function setMockDOM() {
  document.body.innerHTML = `
    <table class="products-table">
    <thead></thead>
    <tbody></tbody>
    </table>
    <input id="prod-last-updated"/>
    <button id="add-new"></button>
    <div class="add-inv-form-class"></div>`;
}
