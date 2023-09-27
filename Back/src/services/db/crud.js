const { getCollection } = require('./connection');

/**
 * Find one document in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @param {object} options - The options to find the document
 * @return {object} - The document found
 */
async  function  findOne(collectionName, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.findOne(query, options);
		return  result;
	} catch (e) {
		console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Find documents in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @param {object} options - The options to find the document
 * @return {object} - The document found
 */
async  function  find(collectionName, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.find(query, options);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Insert one document in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @return {object} - The document found
 */
async  function  insertOne(collectionName, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.insertOne(query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Insert many documents in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @return {object} - The document found
 */
async  function  insertMany(collectionName, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.insertMany(query, options);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction insertMany avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Update one document in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @return {object} - The document found
 */
async  function  updateOne(collectionName, filter, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.updateOne(filter, query, options);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Update many documents in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @return {object} - The document found
 */
async  function  updateMany(collectionName, filter, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.updateMany(filter, query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Replace one document in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @return {object} - The document found
 */
async  function  replace(collectionName, query, remplacement) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.replaceOne(query, remplacement);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Delete one document in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @return {object} - The document found
 */
async  function  deleteOne(collectionName, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.deleteOne(query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

/**
 * Delete many documents in a collection
 * @param {string} collectionName - The name of the collection
 * @param {object} query - The query to find the document
 * @return {object} - The document found
 */
async  function  deleteMany(collectionName, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.deleteMany(query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

module.exports = {
	findOne,
	find,
	insertOne,
	insertMany,
	updateOne,
	updateMany,
	replace,
	deleteOne,
	deleteMany
}