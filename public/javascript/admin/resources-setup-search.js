function renderSearchContainer() {
    const searchContainer = getId("searchContainer");

    const searchContainerHtml = `<div class="col-lg-12 col-md-12">
        <div class="mb-3">
            <form action="javascript:void(0);" accept-charset="utf-8">
            <label for="exampleFormControlTextarea" class="form-label">Search:</label>
            <input type="text" class="form-control" id="searchKeyword" placeholder="Keyword">
            </form>
        </div>
    </div>`

    searchContainer.insertAdjacentHTML("beforeend", searchContainerHtml);
}

