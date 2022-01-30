function Pagination(prop) {
    const pages = [...Array(Number(prop.count)).keys()]

    function changePage(pageNumber) {
        pageNumber += 1;
        prop.paginate(pageNumber);
    }

    return (
        pages.map(el =><a key={el} onClick={(e) => {
            e.preventDefault();
            changePage(el);
        }}>{el + 1}</a>)
    );
}

export default Pagination;