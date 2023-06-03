function SearchForm({ hashtags, profileName, queryWord, setQueryWord }) {
  return (
    <div className="input-group flex-nowrap">
    <form action="/search" method="GET" class="search-form">
      <span className="input-group-text" id="addon-wrapping">
        {hashtags && " # "}
        {" "}
        {profileName && " @ "}
      </span>
      <input
        type="text"
        name="queryWord"
        value={queryWord}
        onChange={(e) => setQueryWord(e.target.value)}
        className="form-control"
        placeholder="Type here..."
        aria-describedby="addon-wrapping"
      />
      </form>
    </div>
  );
}

export default SearchForm;
