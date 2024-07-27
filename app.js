window.onload = () => {
    const form1 = document.querySelector("#addForm");

    let items = document.getElementById("items");
    let submit = document.getElementById("submit");

    let editItem = null;

    form1.addEventListener("submit", addItem);
    items.addEventListener("click", handleItemActions);
};

function addItem(e) {
    e.preventDefault();

    if (submit.value != "Submit") {
        editItem.target.parentNode.childNodes[0].data = document.getElementById("item").value;

        submit.value = "Submit";
        document.getElementById("item").value = "";

        showSuccessMessage("Text edited successfully");

        return false;
    }

    let newItem = document.getElementById("item").value;
    if (newItem.trim() == "" || newItem.trim() == null)
        return false;
    else
        document.getElementById("item").value = "";

    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.appendChild(document.createTextNode(newItem));

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm float-right delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    let editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm float-right edit";
    editButton.appendChild(document.createTextNode("Edit"));

    let completeButton = document.createElement("button");
    completeButton.className = "btn-info btn btn-sm float-right complete";
    completeButton.appendChild(document.createTextNode("Complete"));

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(completeButton);

    items.appendChild(li);
}

function handleItemActions(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you Sure?")) {
            let li = e.target.parentNode;
            items.removeChild(li);
            showSuccessMessage("Text deleted successfully");
        }
    }

    if (e.target.classList.contains("edit")) {
        document.getElementById("item").value = e.target.parentNode.childNodes[0].data;
        submit.value = "EDIT";
        editItem = e;
    }

    if (e.target.classList.contains("complete")) {
        let li = e.target.parentNode;
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
        e.target.remove();
    }
}

function toggleButton(ref, btnID) {
    document.getElementById(btnID).disabled = ref.value.trim() === "";
}

function showSuccessMessage(message) {
    const lblSuccess = document.getElementById("lblsuccess");
    lblSuccess.innerHTML = message;
    lblSuccess.style.display = "block";
    setTimeout(() => {
        lblSuccess.style.display = "none";
    }, 3000);
}
