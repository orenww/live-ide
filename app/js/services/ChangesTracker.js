vStudio.services.service('ChangesTracker', function($http, $q) {
	var db = {};
	var nodesMapCopy = {};
	var api = {};

	var createCopy = function (map) {
		// if a copy of the map hasn't been created
		// it will create it only once
		if (jQuery.isEmptyObject(nodesMapCopy)){
			angular.copy(map, nodesMapCopy);
		}
	};
	
	var getValueOfNode = function(node, isAttr, attrKey) {
		if (isAttr) {
			return node.vqls[attrKey];
		} else {
			return node.vqls.dataSelection;
		}
	};

	api.init = function (map) {
		createCopy(map);
	};

	api.track = function (currentNode, newValue) {
		var nodeId = currentNode.node.id;
		var isAttr = currentNode.isAttr;

		// create a placeholder for the current node if it's not created
		if (!nodesMapCopy[currentNode.node.id]) {
			nodesMapCopy[currentNode.node.id] = {}
		}

		// if the vql has changed - mark as true
		var hasChanged = newValue !== getValueOfNode(nodesMapCopy[nodeId], isAttr, currentNode.attrKey)

		if (!db[nodeId]) {
			db[nodeId] = {};
		}
		db[nodeId].changed = hasChanged;
		db[nodeId].attr = isAttr;
	};
	
	api.add = function (data) {
		var id = new Date();
		db[id.getMilliseconds()] = data;
	};

	api.update = function(node) {
		db[node.node.id].changed = new Date();
	}

	api.all = function () {
		return db;
	};

	return api;
});