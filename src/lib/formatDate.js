const formatDate = (dateString) => {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("in-ID", options);
}

export default formatDate