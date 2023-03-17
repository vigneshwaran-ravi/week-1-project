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

document.addEventListener("DOMContentLoaded", function () {
  const search = new Searchable();
  search.getAllSearchables();
});
class Searchable {
  constructor() {
    this.books = [];
    this.gridStore;
    this.index = 0;
  }
  getAllSearchables() {
    const searchable = document.querySelectorAll(".searchable");
    searchable.forEach((item, i) => {
      this.paintOneSearchable(item, i);
    });
  }

  paintOneSearchable(item, i) {
    this.main = document.createElement("div");
    this.input = document.createElement("input");
    this.grid = document.createElement("div");
    this.main.className = "border-b-2 border-white mb-5";
    this.grid.className = "flex flex-wrap gap-5 flex justify-center";
    this.input.type = "text";
    this.input.placeholder = "Search...";
    this.input.className =
      "w-[50%] mx-auto mt-4 h-[100px] flex h-full pl-3 search-input";
    this.main.appendChild(this.input);
    this.getBooks(this.grid, this.main);
    this.addSearch(this.grid, this.input);
    item.appendChild(this.main);
    this.index = i;
    console.log("jdfdf");
  }

  async getBooks(grid, main) {
    const errorElement = document.querySelector(".error");
    const loading = document.querySelector(".loading");
    errorElement.textContent = "";
    loading.textContent = "Loading...";
    try {
      console.log("121212");
      if (!this.books.length) {
        const data = await fetch("http://localhost:3000/get-all-books");
        const jsonData = await data.json();
        this.books = jsonData.data;
      }
      this.books.forEach(function (book) {
        const bookItem = document.createElement("div");
        bookItem.innerHTML += bookTemplate(book);
        grid.appendChild(bookItem);
      });
      console.log("index", this.index);
      main.appendChild(grid);
    } catch (error) {
      errorElement.textContent = error?.message;
    } finally {
      loading.textContent = "";
    }
  }

  addSearch(grid, input) {
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();
      const filteredItems = this.books.filter(function (item) {
        return item.name.toLowerCase().includes(query);
      });
      grid.innerHTML = "";
      filteredItems.forEach(function (item) {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = bookTemplate(item);
        grid.appendChild(itemElement);
      });
    });
  }
}
