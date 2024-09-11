const addbutton = document.getElementById("add");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addnewnote = (text = "") => {
  // console.log("addnewnot",text)
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `
<div class="operation tools">
<button class="edit"><i class="fas fa-edit"></i></button>
<button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>


<div class="main ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea>`;
  note.insertAdjacentHTML("afterbegin", htmlData);
  //   console.log(note);

  // getting the References
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  //deleting the node
  delButton.addEventListener("click", () => {
dellnote(note.textContent.trim())
    note.remove();
  });


  // toggle using edit button
  textarea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });
  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    // console.log(value);
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);
};

const dellnote = (text)=>{
    let notes = JSON.parse(localStorage.getItem("notes"));

    notes = notes.filter((n) => {
      return text != n;
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

addbutton.addEventListener("click", () => {
  addnewnote();
});

document.addEventListener("DOMContentLoaded", () => {
  const notes = JSON.parse(localStorage.getItem("notes"));

  if (notes) {
    notes.forEach((note) => {
      addnewnote(note);
    });
  }
});
