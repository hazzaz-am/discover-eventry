/**
 * replace _id to id in array
 * @param {Array} array
 * @returns {Array}
 */
export function replaceMongoIdInArray(array) {
	const mappedArray = array
		.map((item) => {
			return {
				id: item._id.toString(),
				...item,
			};
		})
		.map(({ _id, ...rest }) => rest);

	return mappedArray;
}

/**
 * change event _id to id
 * @param {Object} obj Event
 * @returns {Object}
 */
export function replaceMongoIdInObject(obj) {
	const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
	return updatedObj;
}
