
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Teacher filtering
const teacherCards = [
  ...document.querySelectorAll(".teacher-card")
];

const subjectSearch = document.getElementById("subjectSearch");
const levelSearch = document.getElementById("levelSearch");
const filterButtons = [
  ...document.querySelectorAll(".filter-btn")
];

const noResults = document.getElementById("noResults");

let activeFilter = "All";

function filterTeachers() {
  const selectedSubject =
    activeFilter !== "All"
      ? activeFilter
      : subjectSearch.value;

  const selectedLevel = levelSearch.value;
  let visibleCount = 0;

  teacherCards.forEach(card => {
    const subjects = card.dataset.subjects
      .toLowerCase()
      .split(" ");

    const levels = card.dataset.level
      .toLowerCase()
      .split(" ");

    let matchesSubject = !selectedSubject;

    if (selectedSubject) {
      const search = selectedSubject.toLowerCase();

      if (search === "science") {
        matchesSubject = [
          "biology",
          "chemistry",
          "physics"
        ].some(subject => subjects.includes(subject));
      } else {
        matchesSubject = subjects.includes(search);
      }
    }

    const matchesLevel =
      !selectedLevel ||
      levels.includes(selectedLevel.toLowerCase());

    const shouldShow = matchesSubject && matchesLevel;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount !== 0;
}

// Search form
document.getElementById("searchForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    activeFilter = "All";

    filterButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === "All"
      );
    });

    filterTeachers();

    document.getElementById("teachers")
      .scrollIntoView({ behavior: "smooth" });
  });

// Filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    filterTeachers();
  });
});

// Click a subject card to find its teachers
document.querySelectorAll(".subject-card")
  .forEach(button => {
    button.addEventListener("click", () => {
      subjectSearch.value = button.dataset.subject;
      activeFilter = "All";

      filterButtons.forEach(item => {
        item.classList.toggle(
          "active",
          item.dataset.filter === "All"
        );
      });

      filterTeachers();

      document.getElementById("teachers")
        .scrollIntoView({ behavior: "smooth" });
    });
  });

// Dialog elements
const dialog = document.getElementById("infoDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogContent = document.getElementById("dialogContent");

function showDialog(title, message) {
  dialogTitle.textContent = title;
  dialogContent.textContent = message;

  if (!dialog.open) {
    dialog.showModal();
  }
}

// Teacher profile buttons
document.querySelectorAll(".profile-btn")
  .forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const subjects = button.dataset.subjects;
      const level = button.dataset.level;
      const price = button.dataset.price;

      showDialog(
        name,
        `Subjects: ${subjects}\n` +
        `Education levels: ${level}\n` +
        `Tuition fee: ${price}\n\n` +
        "This is a sample teacher profile. " +
        "Booking and contact features can be added " +
        "when the backend is connected."
      );
    });
  });

// Student registration entry point
document.getElementById("studentBtn")
  .addEventListener("click", () => {
    showDialog(
      "Welcome, Student!",
      "Student registration will be connected " +
      "to the database in the next development stage."
    );
  });

// Teacher registration entry point
document.getElementById("teacherBtn")
  .addEventListener("click", () => {
    showDialog(
      "Welcome, Teacher!",
      "Teacher registration and subject management " +
      "will be added in the next development stage."
    );
  });

// Close dialog
document.getElementById("closeDialog")
  .addEventListener("click", () => {
    dialog.close();
  });

document.getElementById("dialogOk")
  .addEventListener("click", () => {
    dialog.close();
  });

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// Initial filtering
filterTeachers();
