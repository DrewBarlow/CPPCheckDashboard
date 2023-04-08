
function dropdownFxn() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function infoDropdown1() {
  document.getElementById("info1").classList.toggle("show");
}

function infoDropdown2() {
  document.getElementById("info2").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }

  if (!event.target.matches(".infoBox1")) {
    let dropdowns = document.getElementsByClassName("info1-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }

  if (!event.target.matches(".infoBox2")) {
    let dropdowns = document.getElementsByClassName("info2-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}
