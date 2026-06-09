const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const categoryDropdown = document.getElementById("category-dropdown");
const categoryName = document.querySelector(".category-name");
const closeFormBtn = document.getElementById("close-form-button");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const viewCategoryBtn = document.getElementById("view-category-button");
const categoryList = document.getElementById("category-list");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

const getBookmarks = () => {
  try {
    const bookmarksArr = localStorage.getItem("bookmarks");
    if (!bookmarksArr) return [];

    const parsed = JSON.parse(bookmarksArr);

    const isValidBookmarks =
      Array.isArray(parsed) &&
      parsed.every(
        el =>
          typeof el === "object" &&
          el !== null &&
          !Array.isArray(el) &&
          el.hasOwnProperty("name") &&
          el.hasOwnProperty("category") &&
          el.hasOwnProperty("url")
      );

    if (isValidBookmarks) {
      return parsed;
    } else {
      console.log('Not valid "bookmarks" strcture');
      return [];
    }
  } catch (err) {
    console.log('Not valid "bookmarks" JSON');
    return [];
  }
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
  const bookmark = {
    name: nameInput.value,
    category: categoryDropdown.value,
    url: urlInput.value,
  };

  const savedBookmarks = getBookmarks();
  savedBookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));

  nameInput.value = "";
  urlInput.value = "";
  displayOrCloseForm();
});

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
};

const updateList = array => {
  categoryList.innerHTML = "";
  let list = "";

  const filteredArr = array.filter(
    item => item.category === categoryDropdown.value
  );
  filteredArr.forEach(item => {
    list += `<input type='radio' id='${item.name}' value='${item.name}' name='radio-button'>
      <label for='${item.name}'><a href='${item.url}'>${item.name}</a></label>`;
  });
  return list;
};

viewCategoryBtn.addEventListener("click", () => {
  const bookmarksArr = getBookmarks();

  categoryList.innerHTML =
    updateList(bookmarksArr).length !== 0
      ? updateList(bookmarksArr)
      : `<p>No Bookmarks Found</p>`;

  displayOrHideCategory();
});

closeListBtn.addEventListener("click", () => displayOrHideCategory());

deleteBookmarkBtn.addEventListener("click", () => {
  const bookmarkArr = getBookmarks();
  const checked = document.querySelector('input[name="radio-button"]:checked');

  if (!checked) {
    categoryList.innerHTML += "<p>No bookmark selected</p>";
    return
  }

  const deletedBookmark = bookmarkArr.filter(
    item =>
      !(item.category === categoryDropdown.value && item.name === checked.value)
  );
  localStorage.setItem("bookmarks", JSON.stringify(deletedBookmark));

  const filtered = deletedBookmark.filter(
    item => item.category === categoryDropdown.value
  );

  const updated = updateList(filtered, categoryList);
  categoryList.innerHTML = updated;
});
