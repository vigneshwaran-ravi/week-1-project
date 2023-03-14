let books = [];
const bookTemplate = (book) => `
<div name=${book?.name} class="item w-[300px] h-[300px] border-[1px] border-teal-300 rounded-md overflow-hidden p-2">
  <div class="img-container h-[60%] rounded-md overflow-hidden">
    <img
      src=${book?.image}
      alt="world"
      class="w-full h-full "
    />
  </div>
  <div class="text-white mt-2">
    <div class="text-sm">
      <span>Title :</span>
        <span>${book?.name}</span>
    </div>
    <div class="text-sm">
      <span>Language :</span>
        <span>${book?.language}</span>
    </div>
    <div class="text-xs">
      <span>Author :</span>
        <span>${book?.author}</span>
    </div>
    <div class="justify-between mt-2">
      <div class="text-xs">
        <span>Price :</span>
          <span>${book?.price}</span>
      </div>
      <div class="text-xs">
        <span>Pages :</span>
          <span>${book?.pages}</span>
      </div>
    </div>
  </div>
</div>
`;

const booksElement = document.querySelector(".books");
async function getBooks() {
  try {
    const data = await fetch("http://localhost:3000/get-all-books");
    const jsonData = await data.json();
    books = jsonData.data;
    books.forEach(function (book) {
      const bookItem = document.createElement("div");
      bookItem.innerHTML = bookTemplate(book);
      booksElement.appendChild(bookItem);
    });
  } catch (error) {}
}

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const filteredItems = books.filter(function (item) {
    return item.name.toLowerCase().includes(query);
  });
  console.log(filteredItems, "itemitem");
  // Clear the current list of items
  booksElement.innerHTML = "";
  filteredItems.forEach(function (item) {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = bookTemplate(item);
    booksElement.appendChild(itemElement);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  getBooks();
});
