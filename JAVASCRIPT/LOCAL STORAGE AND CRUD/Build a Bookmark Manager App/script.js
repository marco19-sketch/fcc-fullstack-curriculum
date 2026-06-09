const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const categoryName = document.querySelector(".category-name");
const categoryDropdown = document.getElementById("category-dropdown");
const closeFormBtn = document.getElementById("close-form-button");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");
const newName = document.getElementById("name");
const url = document.getElementById("url");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const viewCategoryBtn = document.getElementById("view-category-button");
const categoryList = document.getElementById("category-list");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

const getBookmarks = () => {
  const data = localStorage.getItem("bookmarks");

  if (!data) return [];

  try {
    const parsed = JSON.parse(data);

    if (
      Array.isArray(parsed) &&
      (parsed.length === 0 ||
        parsed.every(
          (item) =>
            typeof item === "object" &&
            "name" in item &&
            "category" in item &&
            "url" in item &&
            item !== null &&
            !Array.isArray(item)
        ))
    ) {
      return parsed;
    }
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
  }
  return [];
};

const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

addBookmarkBtn.addEventListener("click", () => {
  categoryName.innerText = categoryDropdown.value;
  displayOrCloseForm();
});

closeFormBtn.addEventListener("click", () => displayOrCloseForm());

addBookmarkBtnForm.addEventListener("click", () => {
  const bookmarks = getBookmarks();
  bookmarks.push({
    name: newName.value,
    category: categoryDropdown.value,
    url: url.value,
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  newName.value = "";
  url.value = "";
  displayOrCloseForm();
});

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
};

function updateList(filtered, categoryList) {
  categoryList.innerHTML = "";
  let html = "";
  filtered.forEach((bookmark) => {
    html += `<label for='${bookmark.name}'>
      <a href='${bookmark.url}'>${bookmark.name}</a>
      </label>
      <input type='radio' id='${bookmark.name}' value='${bookmark.name}' name='bookmark'><br>`;
  });
  categoryList.innerHTML = html;
}

viewCategoryBtn.addEventListener("click", () => {
  const bookmarks = getBookmarks();
  categoryName.innerText = categoryDropdown.value;
  displayOrHideCategory();
  const filtered = bookmarks.filter(
    (bookmark) => bookmark.category === categoryDropdown.value
  );

  if (filtered.length > 0) {
    updateList(filtered, categoryList);
  } else {
    categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
  }
});

closeListBtn.addEventListener("click", () => {
  bookmarkListSection.classList.toggle("hidden");
  mainSection.classList.toggle("hidden");
});

deleteBookmarkBtn.addEventListener("click", () => {
  const bookmarks = getBookmarks();
  const checkedRadio = document.querySelector('input[name="bookmark"]:checked');

  if (!checkedRadio) {
    return (categoryList.innerHTML += `<p>No bookmark selected</p>`);
  }

  const deletedBookmark = bookmarks.filter(
    (bookmark) =>
      !(
        bookmark.name === checkedRadio.value &&
        bookmark.category === categoryDropdown.value
      )
  );
  localStorage.setItem("bookmarks", JSON.stringify(deletedBookmark));

  const filtered = deletedBookmark.filter(
    (bookmark) => bookmark.category === categoryDropdown.value
  );
  updateList(filtered, categoryList);
});
