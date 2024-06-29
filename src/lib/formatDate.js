const formatDate = (dateString) => {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
}

export default formatDate