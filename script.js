const root = document.querySelector(".root");
const greateUser = document.querySelector(".greate-user");
const addInputs = document.querySelectorAll(".add-input");
const updateInputs = document.querySelectorAll(".update--input");
const btnUpdate = document.querySelectorAll(".update-cart");
const modalRoot = document.getElementById("root-modal");
const modalClose = document.querySelector(".modal-close");
console.log()

async function getUsers() {
    await axios.get('http://localhost:3001/users').then(function (response) {
        console.log(response.data);
        newHtml(response.data);
    })
}

async function getPatch(id, obj) {
    await axios.patch(`http://localhost:3001/users/${id}`, obj)
}

async function getDelete(id) {
    await axios.delete(`http://localhost:3001/users/${id}`)
};

function newHtml(data) {
    data.forEach((item) => {
            root.innerHTML += `
            <div class="container" >
                <h3 class="cart-title">${upperCase(item.name)}</h3>
                <p class="cart-text">${item.age}</p>
                <button class="btn update" data-id="${item.id}" >Update</button>
                <button class="btn del" data-id="${item.id}">Delete</button>
            </div>`;
    });
    const  deleteUser = document.getElementsByClassName("del");
    const updateUser = document.getElementsByClassName("update");
    [...deleteUser].forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            getDelete(e.target.dataset.id);
        });
    });
    [...updateUser].forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            modalRoot.style.display = "flex";
            const updateObj = {};
            [...btnUpdate].forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    [...updateInputs].forEach(item => {
                        updateObj[item.name] = item.value;
                    });
                    getPatch(item.dataset.id, updateObj)
                    // console.log(item.dataset.id, updateObj)
                });
            });
        });
    });
}

greateUser.addEventListener("click", async (event) => {
    event.preventDefault();
    let obj = {};
    [...addInputs].forEach(item => {
        obj[item.name] = item.value;
    });
    await axios.post("http://localhost:3001/users", obj)
});

modalClose.addEventListener("click", () => {
    modalRoot.style.display = "none";
});

getUsers();


function upperCase(str) {
    const splitted = str.split("");
    const first = splitted[0].toUpperCase();
    const rest = [...splitted];
    rest.splice(0, 1);
    const result = [first, ...rest].join("");
    return result;
}
