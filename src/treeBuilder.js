import _ from 'lodash';

const treeBuilder = (parseData1, parseData2) => {
  const keys = _.sortBy(_.union(Object.keys(parseData1), Object.keys(parseData2)));
  return keys.map((key) => {
    if (!_.has(parseData1, key)) {
      return { key, value: parseData2[key], type: 'added' };
    }
    if (!_.has(parseData2, key)) {
      return { key, value: parseData1[key], type: 'deleted' };
    }
    if (_.isPlainObject(parseData1[key]) && _.isPlainObject(parseData2[key])) {
      return { key, children: treeBuilder(parseData1[key], parseData2[key]), type: 'nested' };
    }
    if (!_.isEqual(parseData1[key], parseData2[key])) {
      return {
        key, value1: parseData1[key], value2: parseData2[key], type: 'changed',
      };
    }
    return { key, value: parseData1[key], type: 'unchanged' };
  });
};

export default treeBuilder;
