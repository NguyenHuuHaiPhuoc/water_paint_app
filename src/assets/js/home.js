console.log(document.getElementById('search_product'))
const initApp = () => {
  let timeout = null;

  document.getElementById('search_product').addEventListener('input', (e) => {
    console.log(e.target.value);
  })
}

document.addEventListener('DOMContentLoaded', initApp);