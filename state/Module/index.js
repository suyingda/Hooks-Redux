
const getAllBy = require.context('./', true, /[^(index)]\.js$/);
const MergeModules = {};
getAllBy.keys().forEach((key) => {
    const defines = getAllBy(key).default;
    MergeModules[defines.name] = defines;
});
export default MergeModules;

