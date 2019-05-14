function loader(source) {

    return source;
}

loader.fetch = function (compilation) {
    console.log(compilation);
    return undefined;
};
module.exports = loader;